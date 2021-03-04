<template>
<div class="relative h-screen overflow-hidden bg-white">
    <div
      v-if="!isIntroduction"
      class="z-50 absolute top-0 left-0 ml-10 mt-10 text-2xl
      text-white cursor-pointer font-semibold"
      @click="goToPreviousStep">
      Volver
    </div>

    <div
      v-if="!loading"
      class="z-50 absolute top-0 right-0 mr-10 mt-10 text-2xl
      text-white cursor-pointer font-semibold"
      @click="skip">
      Salir
    </div>

    <div class="relative h-screen overflow-hidden" v-if="!loading">
      <!-- Introduction -->
      <introduction v-if='isIntroduction' @next="goToNext" />
      <!-- Create Link-->
      <create-link v-if='isCreateLink' @next="goToNext"/>
      <!-- Widget-->
      <show-widget v-if='isShowWidget' @close-widget="goToPreviousStep" @next="goToNext"/>
      <!-- Fetch Accounts -->
      <show-accounts v-if='isShowAccounts' @next="goToNext" />
      <!-- Fetch Movements -->
      <show-movements v-if='isShowMovements' @next="goToNext" />
      <!-- Show Link & finish -->
      <show-link v-if='isEpilogue' @next="finish"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Introduction from '../components/onboarding/introduction/Introduction.vue';
import CreateLink from '../components/onboarding/create-link/CreateLink.vue';
import ShowWidget from '../components/onboarding/show-widget/ShowWidget.vue';
import ShowAccounts from '../components/onboarding/show-accounts/ShowAccounts.vue';
import ShowMovements from '../components/onboarding/show-movements/ShowMovements.vue';
import ShowLink from '../components/onboarding/show-link/ShowLink.vue';

const INTRODUCTION = 'INTRODUCTION';
const CREATE_LINK = 'CREATE_LINK';
const SHOW_WIDGET = 'SHOW_WIDGET';
const SHOW_ACCOUNTS = 'SHOW_ACCOUNTS';
const SHOW_MOVEMENTS = 'SHOW_MOVEMENTS';
const EPILOGUE = 'EPILOGUE';

const STEPS = [
  INTRODUCTION,
  CREATE_LINK,
  SHOW_WIDGET,
  SHOW_ACCOUNTS,
  SHOW_MOVEMENTS,
  EPILOGUE,
];
export default {
  methods: {
    ...mapActions([
      'nextOnboardingStep',
      'previousOnboardingStep',
      'showOnboarding',
      'skipOnboarding',
      'finishOnboarding',
      'removeLink',
    ]),
    goToLinks() {
      this.$router.push('/links');
    },
    goToPreviousStep() {
      if (this.isShowAccounts) {
        this.removeLink();
      }
      this.previousOnboardingStep();
    },
    goToNext() {
      this.nextOnboardingStep().then(() => {
        window.analytics.track('Viewed Onboarding', {
          step: this.currentStep,
        });
      });
    },
    finish() {
      this.finishOnboarding().then(() => {
        window.analytics.track('Finished Onboarding', {});
      });
    },
    skip() {
      this.skipOnboarding().then(() => {
        window.analytics.track('Skipped Onboarding', {
          step: this.currentStep,
        });
      });
    },
  },
  created() {
    if (this.show === null) {
      this.showOnboarding();
    }
  },
  computed: {
    ...mapState({
      show: (state) => state.onboarding.show,
      currentStep: (state) => STEPS[state.onboarding.currentStep],
      email: (state) => state.auth.email,
    }),
    loading() {
      return this.show === null;
    },
    isIntroduction() {
      return this.currentStep === INTRODUCTION;
    },
    isCreateLink() {
      return this.currentStep === CREATE_LINK;
    },
    isShowWidget() {
      return this.currentStep === SHOW_WIDGET;
    },
    isShowAccounts() {
      return this.currentStep === SHOW_ACCOUNTS;
    },
    isShowMovements() {
      return this.currentStep === SHOW_MOVEMENTS;
    },
    isEpilogue() {
      return this.currentStep === EPILOGUE;
    },
  },
  components: {
    Introduction,
    CreateLink,
    ShowWidget,
    ShowAccounts,
    ShowMovements,
    ShowLink,
  },
  watch: {
    show(newValue) {
      if (newValue === false) {
        this.goToLinks();
      }
    },
  },
};
</script>

<style scoped>

.grid-transform {
  transform: skew(-12deg) rotate(-12deg);
  top:-6rem;
}

.z-index {
  z-index: -1;
}

</style>
