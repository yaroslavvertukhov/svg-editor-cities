<template>
  <div class="file-loader">
    <input type="file" @change="parseFileToStr" />
  </div>
</template>

<script>
export default {
  name: 'file-loader',
  methods: {
    parseFileToStr(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const svgStr = event.target.result;
        this.$emit('load-svg', svgStr);
      };

      reader.readAsText(file);
    },
  },
};
</script>
