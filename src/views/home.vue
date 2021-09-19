<template>
  <div class="flex">
    <file-loader v-if="!svgStr" @load-svg="setSvgStr" />
    <map-viewer
      v-else
      :svg-str="svgStr"
      :points="points"
      @add-point="addPoint"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import fileLoader from '@/components/file-loader';
import mapViewer from '@/components/map-viewer';

export default {
  name: 'home',
  components: {
    mapViewer,
    fileLoader,
  },
  data() {
    return {
      svgStr: null,
      points: [],
    };
  },
  mounted() {
    this.loadProgress();
  },
  methods: {
    setSvgStr(str) {
      this.svgStr = str;
    },
    loadProgress() {
      const svgMap = window.localStorage.getItem('svg-map');
      const svgMapPoints = window.localStorage.getItem('svg-map-points');

      if (svgMap && svgMapPoints) {
        this.$confirm('Продолжить предыдущий проект?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
          .then(() => {
            this.svgStr = svgMap;
            this.points = JSON.parse(svgMapPoints);
          })
          .catch(() => {});
      }
    },
    addPoint(point) {
      this.points.push(point);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
