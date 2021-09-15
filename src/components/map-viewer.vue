<template>
  <div v-html="svgStr"></div>
</template>

<script>
export default {
  name: 'map-viewer',
  props: {
    svgStr: {
      type: String,
      default: '<svg></svg>',
    },
  },
};
</script>
