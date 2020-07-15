<template>
  <div class="spinner-wrapper" :class="fullScreen && 'full-screen'">
    <div class="wrapper">
      <img src="../assets/images/fintoc-isologo-chevron-white.png" class="chevron-animated">
      <img src="../assets/images/fintoc-isologo-dot-white.png" class="dot-animated">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fullScreen: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.full-screen {
  position: fixed !important;
  top: 0;
  left: 0;
  background-color: #FFFFFFAA;
}
.spinner-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 7rem;
  width: 7rem;
  background-color: #0A0C57;
  border-radius: 50%;
}
.wrapper img {
  position: absolute;
  left: 10%;
  right: 0;
  top: 20%;
  bottom: 20%;
  height: 60%;
}
@-webkit-keyframes dot-animated {
  from {
    left: 20%;
  }
  to {
    left: 30%;
  }
}
@keyframes dot-animated {
  from {
    left: 20%;
  }
  to {
    left: 30%;
  }
}
.dot-animated {
  -webkit-animation: dot-animated 1s linear 0s infinite alternate;
  -moz-animation: dot-animated 1s linear 0s infinite alternate;
  -ms-animation: dot-animated 1s linear 0s infinite alternate;
  animation: dot-animated 1s linear 0s infinite alternate;
}
@-webkit-keyframes chevron-animated {
  from {
    left: 30%;
  }
  to {
    left: 20%;
  }
}
@keyframes chevron-animated {
  from {
    left: 30%;
  }
  to {
    left: 20%;
  }
}
.chevron-animated {
  -webkit-animation: chevron-animated 1s linear 0s infinite alternate;
  -moz-animation: chevron-animated 1s linear 0s infinite alternate;
  -ms-animation: chevron-animated 1s linear 0s infinite alternate;
  animation: chevron-animated 1s linear 0s infinite alternate;
}
</style>
