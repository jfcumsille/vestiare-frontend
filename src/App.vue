<template>
  <div id="app" class="font-sans">
    <Navbar v-if="showNavbar"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from './components/navbar.vue';

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState({
      viewOnboarding: (state) => state.onboarding.show,
    }),
    showNavbar() {
      return this.loggedIn && !this.showOnboarding && !this.isExternalCall && !this.errorPage;
    },
    showOnboarding() {
      return this.viewOnboarding || this.$route.path === '/onboarding';
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
      this.$store.dispatch('getCurrentUser');
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
