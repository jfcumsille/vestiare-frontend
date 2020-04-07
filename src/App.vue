<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
@import './assets/css/tailwind.css';
</style>
