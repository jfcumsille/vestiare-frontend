<template>
<div class="mx-auto px-2 h-full w-full flex flex-col">
  <div>
    <!-- Introduction -->
    <introduction v-if='currentStep === 0' />
    <!-- Create Link-->
    <create-link v-if='currentStep === 1' />
    <!-- Show New Link (Fetch Accounts) -->
    <show-accounts v-if='currentStep === 2' />
    <!-- Show API Keys and Hello Word Fintoc -->
    <show-api v-if='currentStep === 3' />
    <!-- Show Private Link ID and finish -->
    <show-link v-if='currentStep === 4' />
  </div>

  <div>
    <button v-if='currentStep === 0' v-on:click='nextOnboardingStep'>
      Empezemos
    </button>
    <button v-if='currentStep > 0 && currentStep < 4 ' v-on:click='nextOnboardingStep'>
      Siguiente
    </button>
    <button v-if='currentStep === 4' v-on:click='goToDashboard'>
      Termine
    </button>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Introduction from '../components/onboarding/introduction.vue';
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
