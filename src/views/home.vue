<template>
  <div class="flex">
    <file-loader v-if="!svgStr" @load-svg="setSvgStr" />
    <map-viewer v-else :svg-str="svgStr" />
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
    };
  },
  methods: {
    setSvgStr(str) {
      this.svgStr = str;
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
