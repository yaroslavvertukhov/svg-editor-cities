<template>
  <a
    ref="pointEl"
    class="point"
    :class="{ 'point-selected': isSelected }"
    :href="point.link"
    @click.prevent="select"
  >
    <circle
      :cx="coords.point.x"
      :cy="coords.point.y"
      :r="point.elementsSetting.point.r"
      :fill="point.elementsSetting.color"
    />
    <text
      :x="coords.text.x"
      :y="coords.text.y"
      :fill="point.elementsSetting.color"
      :style="`font-size:${point.elementsSetting.fontSize}px`"
    >
      {{ point.text }}
    </text>
  </a>
</template>

<script>
export default {
  name: 'point',
  props: {
    svgEl: {
      type: SVGSVGElement,
      default: null,
    },
    point: {
      type: Object,
      default: null,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$emit('select', this.point);
  },
  computed: {
    coords() {
      const pointCoords = this.svgEl.createSVGPoint();
      const textCoords = this.svgEl.createSVGPoint();

      pointCoords.x = this.point.x;
      pointCoords.y = this.point.y;

      textCoords.x = this.point.x + this.point.elementsSetting.text.deltaX;
      textCoords.y = this.point.y + this.point.elementsSetting.text.deltaY;

      const svgPointCoords = pointCoords.matrixTransform(
        this.svgEl.getScreenCTM().inverse()
      );

      const svgTextCoords = textCoords.matrixTransform(
        this.svgEl.getScreenCTM().inverse()
      );

      return {
        point: {
          x: svgPointCoords.x,
          y: svgPointCoords.y,
        },
        text: {
          x: svgTextCoords.x,
          y: svgTextCoords.y,
        },
      };
    },
  },
  methods: {
    select() {
      this.$emit('select', this.point);
    },
  },
};
</script>

<style lang="scss" scoped>
.point-selected {
  opacity: 1 !important;
}
</style>
