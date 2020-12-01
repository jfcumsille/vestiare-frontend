<template>
<div class="h-screen overflow-hidden">
  <div class="grid-transform absolute flex w-full h-full
              items-center z-index overflow-hidden">
    <div class="absolute w-full overflow-hidden grid grid-cols-12 opacity-50">
      <div class="bg-fintoc-blue h-16 col-start-1 col-span-4" />
      <div class="bg-gray-500 h-16 col-start-9 col-end-13" />
      <div class="bg-fintoc-yellow h-16 col-start-11 col-end-13" />
      <div class="bg-fintoc-cyan h-16 col-start-1 col-end-3" />
      <div class="bg-gray-300 h-16 col-start-3 col-end-9" />
      <div class="bg-gray-500 h-16 col-start-1 col-end-6" />
      <div class="bg-fintoc-blue h-16 col-start-10 col-end-13" />
      <div class="bg-fintoc-cyan h-16 col-start-8 col-end-13" />
      <div class="bg-fintoc-yellow h-16 col-start-1 col-end-2" />
    </div>
  </div>
  <!-- Introduction -->
  <introduction v-if='isIntroduction' @next="nextOnboardingStep" />
  <!-- Create Link-->
  <create-link v-if='currentStep === 1' @next="nextOnboardingStep"/>
  <!-- Fetch Accounts -->
  <show-accounts v-if='currentStep === 2' @next="nextOnboardingStep" />
  <!-- Fetch Movements -->
  <show-movements v-if='currentStep === 3' @next="nextOnboardingStep" />
  <!-- Show Link & finish -->
  <show-link v-if='currentStep === 4' @next="goToDashboard"/>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Introduction from '../components/onboarding/introduction/Introduction.vue';
import CreateLink from '../components/onboarding/create-link/CreateLink.vue';
import ShowAccounts from '../components/onboarding/show-accounts/ShowAccounts.vue';
import ShowMovements from '../components/onboarding/show-api.vue';
import ShowLink from '../components/onboarding/show-link.vue';

export default {
  methods: {
    ...mapActions([
      'nextOnboardingStep',
    ]),
    goToDashboard() {
      this.$router.push('/links');
    },
  },
  computed: {
    ...mapState({
      currentStep: (state) => state.onboarding.currentStep,
    }),
    isIntroduction() {
      return this.currentStep === 0;
    },
    setWidth() {
      return 'w-10/12';
    },
  },
  components: {
    Introduction,
    CreateLink,
    ShowAccounts,
    ShowMovements,
    ShowLink,
  },
};
</script>

<style scoped>

.grid-transform {
  transform: skew(-12deg) rotate(-12deg);
  top:-2rem;
}

.z-index {
  z-index: -1;
}

</style>
