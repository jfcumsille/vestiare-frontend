<template>
  <div id="app">
    <Navbar v-if="loggedIn"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';

export default {
  components: {
    Navbar,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
};
</script>

<style>
@import './assets/css/tailwind.css';
</style>
