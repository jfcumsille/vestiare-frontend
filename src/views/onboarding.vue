<template>
<div class='flex items-center justify-center h-screen'
    v-bind:class="{ 'bg-tint-cyan': isIntroduction }">
    <!-- Introduction -->
    <introduction v-if='isIntroduction' @next="nextOnboardingStep" />
    <!-- Create Link-->
    <create-link v-if='currentStep === 1' @next="nextOnboardingStep"/>
    <!-- Show New Link (Fetch Accounts) -->
    <show-accounts v-if='currentStep === 2' @next="nextOnboardingStep" />
    <!-- Show API Keys and Hello Word Fintoc -->
    <show-api v-if='currentStep === 3' @next="nextOnboardingStep" />
    <!-- Show Private Link ID and finish -->
    <show-link v-if='currentStep === 4' @next="goToDashboard"/>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Introduction from '../components/onboarding/introduction/Introduction.vue';
import CreateLink from '../components/onboarding/create-link.vue';
import ShowAccounts from '../components/onboarding/show-accounts.vue';
import ShowApi from '../components/onboarding/show-api.vue';
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
  },
  components: {
    Introduction,
    CreateLink,
    ShowAccounts,
    ShowApi,
    ShowLink,
  },
};
</script>

<style scoped>

</style>
