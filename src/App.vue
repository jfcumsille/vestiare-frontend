<template>
  <div id="app" class="font-sans">
    <Navbar v-if="showNavbar"></Navbar>
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
    showNavbar() {
      return this.loggedIn && !this.isExternalCall && !this.errorPage;
    },
    loggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    isExternalCall() {
      return this.$route.path === '/widget' || this.$route.path === '/widget-iframe';
    },
    errorPage() {
      return this.$route.path === '/error';
    },
  },
  beforeMount() {
    if (this.loggedIn) {
      this.$store.dispatch('identifyUserEvent');
    }
  },
};
</script>

<style>
@import './assets/css/tailwind.css';
@import './assets/css/general.css';

html {
  font-family: 'DMMono', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
