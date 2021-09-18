<template>
  <div class="map-container">
    <div ref="mapViewer" v-html="svgStr"></div>
    <g ref="points" class="points">
      <template v-if="svgEl">
        <map-point
          v-for="(point, index) in points"
          :key="index"
          :point="point"
          :svg-el="svgEl"
          @select="openSettingPoint"
        />
      </template>
    </g>
    <el-drawer title="Настройки" :visible.sync="dialogVisible">
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
      </template>
    </el-drawer>
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
    };
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
        this.addPoint(e.clientX, e.clientY);
      });
    },
    addPoint(x, y) {
      // const NS = this.svgEl.getAttribute('xmlns');
      //
      // const linkEl = document.createElementNS(NS, 'a');
      // const circleEl = document.createElementNS(NS, 'circle');
      // const textEl = document.createElementNS(NS, 'text');
      //
      // linkEl.appendChild(circleEl);
      // linkEl.appendChild(textEl);
      // this.svgEl.appendChild(linkEl);

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
      this.dialogVisible = true;
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
    // movePoint(x, y, pointObj) {
    //   pointObj.move(x, y);
    // },
    // updateTextPoint(text, pointObj) {
    //   pointObj.setText(text);
    // },
    // updateLinkPoint(link, pointObj) {
    //   pointObj.setLink(link);
    // },
  },
};
</script>

<style lang="scss">
.map-container {
  width: 100%;
}

.el-drawer__body {
  padding: 20px;

  .el-col {
    margin-bottom: 15px;
  }
}
</style>
