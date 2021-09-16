<template>
  <div ref="mapViewer" v-html="svgStr"></div>
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
  data() {
    return {
      svgEl: null,
    };
  },
  mounted() {
    this.svgEl = this.$refs.mapViewer.querySelector('svg');
    this.addEventClick();
  },
  methods: {
    addEventClick() {
      this.svgEl.addEventListener('click', (e) => {
        // const targetCoords = this.svgEl.getBoundingClientRect();
        const NS = this.svgEl.getAttribute('xmlns');
        const point = this.svgEl.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const svgP = point.matrixTransform(this.svgEl.getScreenCTM().inverse());

        const circle = document.createElementNS(NS, 'circle');
        circle.setAttribute('cx', svgP.x);
        circle.setAttribute('cy', svgP.y);
        circle.setAttribute('r', 10);

        this.svgEl.appendChild(circle);

        // console.log(e.clientX - targetCoords.left);
        // console.log(e.clientY - targetCoords.top);
      });
    },
  },
};
</script>
