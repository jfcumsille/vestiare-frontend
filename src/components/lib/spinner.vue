<template>
  <div
    class="loader ease-linear rounded-full border-gray-200"
    :class="clsArg"
  />
</template>

<script>
export default {
  props: {
    widthClsName: String,
    heightClsName: String,
    borderClsName: String,
  },

  computed: {
    clsArg() {
      return `${this.widthClsName || 'w-64'} ${this.heightClsName || 'h-64'} ${this.borderClsName || 'border-8 border-t-8'}`;
    },
  },
};
</script>

<style scoped>
.loader {
  border-top-color: #475FF1;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
