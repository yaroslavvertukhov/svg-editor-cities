<template>
  <div
    class="map-container"
    :class="{ 'map-container--setting-open': dialogVisible }"
  >
    <div ref="mapViewer" v-html="svgStr"></div>
    <g ref="points" class="points">
      <template v-if="svgEl">
        <map-point
          v-for="(point, index) in points"
          :key="index"
          :point="point"
          :svg-el="svgEl"
          :is-selected="index === selectedPointIndex"
          @select="openSettingPoint"
        />
      </template>
    </g>
    <el-button class="save-svg" type="success" @click="saveSVG"
      >Сохранить SVG
    </el-button>
    <modal name="result-modal" draggable height="auto">
      <el-row>
        <el-col>
          <el-link type="success" :href="svgResultUrl" download
            >Скачать SVG</el-link
          >
        </el-col>
      </el-row>
    </modal>
    <modal
      name="setting-modal"
      draggable
      height="auto"
      @opened="dialogVisible = true"
      @closed="dialogVisible = false"
    >
      <template v-if="selectedPoint">
        <el-row>
          <el-col>
            Текст
            <el-input v-model="selectedPoint.text" />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            Ссылка
            <el-input v-model="selectedPoint.link" />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            X
            <el-input-number v-model.number="selectedPoint.x" />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            Y
            <el-input-number v-model.number="selectedPoint.y" />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            text dX
            <el-input-number
              v-model.number="selectedPoint.elementsSetting.text.deltaX"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            text dY
            <el-input-number
              v-model.number="selectedPoint.elementsSetting.text.deltaY"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            Размер шрифта
            <el-input-number
              v-model.number="selectedPoint.elementsSetting.fontSize"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            Радиус точки
            <el-input-number
              v-model.number="selectedPoint.elementsSetting.point.r"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            Цвет
            <el-color-picker
              v-model="selectedPoint.elementsSetting.color"
            ></el-color-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="danger" @click="removePoint">Удалить</el-button>
          </el-col>
        </el-row>
      </template>
    </modal>
  </div>
</template>

<script>
import mapPoint from './mapPoint';

export default {
  name: 'map-viewer',
  components: { mapPoint },
  props: {
    svgStr: {
      type: String,
      default: '<svg></svg>',
    },
    points: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogVisible: false,
      svgEl: null,
      selectedPoint: null,
      timerSaveID: null,
      svgResultUrl: '',
    };
  },
  computed: {
    selectedPointIndex() {
      return this.points.findIndex((point) => point === this.selectedPoint);
    },
  },
  created() {
    this.startTimerSaveProgress();
  },
  destroyed() {
    clearInterval(this.timerSaveID);
  },
  mounted() {
    this.svgEl = this.$refs.mapViewer.querySelector('svg');
    this.svgEl.appendChild(this.$refs.points);
    this.addEventClickMap();
  },
  methods: {
    addEventClickMap() {
      this.svgEl.addEventListener('click', (e) => {
        if (!this.$refs.points.contains(e.target)) {
          this.addPoint(e.clientX, e.clientY);
        }
      });
    },
    addPoint(x, y) {
      const pointObj = {
        x: 0,
        y: 0,
        text: '',
        link: '',
        elementsSetting: {
          color: '#409EFF',
          fontSize: 30,
          text: {
            deltaX: 0,
            deltaY: 0,
          },
          point: {
            r: 20,
          },
        },
        move(objX, objY) {
          this.x = objX;
          this.y = objY;
        },
        setText(str) {
          this.text = str;
        },
        setLink(link) {
          this.link = link;
        },
        init(lX, lY) {
          this.move(lX, lY);
          this.setText('Новый текст');
          this.setLink('#');
        },
      };

      pointObj.init(x, y);

      this.$emit('add-point', pointObj);
    },
    openSettingPoint(point) {
      this.selectedPoint = point;
      this.showSettingModal();
    },
    startTimerSaveProgress() {
      this.timerSaveID = setInterval(() => {
        window.localStorage.setItem('svg-map', this.svgStr);
        window.localStorage.setItem(
          'svg-map-points',
          JSON.stringify(this.points)
        );
      }, 1000);
    },
    showSettingModal() {
      this.$modal.show('setting-modal');
    },
    hideSettingModal() {
      this.$modal.hide('setting-modal');
    },
    showResultModal() {
      this.$modal.show('result-modal');
    },
    removePoint() {
      const indexPoint = this.points.findIndex(
        (point) => point === this.selectedPoint
      );

      if (indexPoint !== -1) {
        this.$delete(this.points, indexPoint);
        this.hideSettingModal();
      }
    },
    saveSVG() {
      // const svgStr = JSON.stringify(this.svgEl);
      const div = document.createElement('div');
      div.appendChild(this.svgEl.cloneNode(true));

      const blob = new Blob([div.innerHTML], { type: 'image/svg+xml' });

      const reader = new FileReader();

      reader.onload = (e) => {
        this.svgResultUrl = e.target.result;
        this.showResultModal();
      };

      reader.readAsDataURL(blob);
    },
  },
};
</script>

<style lang="scss">
.map-container {
  width: 100%;

  &--setting-open {
    .point {
      opacity: 0.5;
    }
  }
}

.vm--modal {
  padding: 30px;

  .el-col {
    margin-bottom: 15px;
  }
}

.save-svg {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
