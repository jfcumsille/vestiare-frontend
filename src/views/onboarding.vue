<template>
<div class="relative h-screen overflow-hidden bg-white max-w-1000 mx-auto">
    <div
      v-if="!isShowWidget"
      class="z-50 absolute top-0 left-0 ml-10 mt-10 text-1xl
      text-gray-500 cursor-pointer font-semibold items-center"
      @click="goToPreviousStep">
      <font-awesome-icon icon="chevron-left"/>
      {{goBackTitle}}
    </div>

    <div
      v-if="!loading"
      class="flex z-50 absolute top-0 right-0 mr-10 mt-10 text-1xl
      text-gray-500 cursor-pointer font-semibold items-center"
      @click="skip">
      <font-awesome-icon icon="times" class="mr-2"/>
      {{exitTitle}}
    </div>

    <div class="relative h-screen overflow-hidden" v-if="!loading">
      <Demo v-if='isShowWidget' @close-widget="goToPreviousStep" @next="goToNext"/>
      <LinkCreated v-if='isLinkCreated' @next="goToNext" />
      <ShowAccounts v-if='isShowAccounts' @next="goToNext" />
      <ShowMovements v-if='isShowMovements' @next="goToNext" />
      <ShowLink v-if='isEpilogue' @next="finish"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Demo from './Demo.vue';
import LinkCreated from '../components/onboarding/show-widget/LinkCreated.vue';
import ShowAccounts from '../components/onboarding/show-accounts/ShowAccounts.vue';
import ShowMovements from '../components/onboarding/show-movements/ShowMovements.vue';
import ShowLink from '../components/onboarding/show-link/ShowLink.vue';

const SHOW_WIDGET = 'SHOW_WIDGET';
const LINK_CREATED = 'LINK_CREATED';
const SHOW_ACCOUNTS = 'SHOW_ACCOUNTS';
const SHOW_MOVEMENTS = 'SHOW_MOVEMENTS';
const EPILOGUE = 'EPILOGUE';

const STEPS = [
  SHOW_WIDGET,
  LINK_CREATED,
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
      if (this.isShowWidget) {
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
    isShowWidget() {
      return this.currentStep === SHOW_WIDGET;
    },
    isLinkCreated() {
      return this.currentStep === LINK_CREATED;
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
    goBackTitle() {
      return 'Volver';
    },
    exitTitle() {
      return 'Salir';
    },
  },
  components: {
    Demo,
    LinkCreated,
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

.max-w-1000 {
  max-width: 1000px;
}

</style>
