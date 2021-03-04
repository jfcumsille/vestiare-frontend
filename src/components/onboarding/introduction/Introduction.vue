<template>
<div class="flex h-full justify-center items-center">
  <div class="z-50 max-h-screen bg-white rounded-md w-4/5 md:w-1/2 py-8
              border-2 border-gray-100 shadow-md">
    <div class="flex flex-col items-center justify-center">
      <div>
        <img src="../../../assets/images/fintoc-isologo.svg" class="h-16" />
      </div>

      <div class="py-2 text-center text-md mt-3">
        <p class="text-xl"> Bienvenido a Fintoc, {{ name }}! </p>
        <p class="text-gray-900 mt-2">  Necesitamos conocerte un poco más antes de partir </p>
      </div>

      <div class="flex flex-col justify-center md:justify-start
      my-auto">
        <form class="flex flex-col" onsubmit="event.preventDefault();">
            <div class="flex flex-col py-4">
                <label class="text-sm text-center pb-3 text-gray-900">¿Sabes programar?</label>
                <div class="flex flex-row gap-x-8">
                  <introduction-button
                  @click.native="updateProgrammerOption(true)"
                  :isActive="isProgrammer(true)"> Si </introduction-button>
                  <introduction-button
                  @click.native="updateProgrammerOption(false)"
                  :isActive="isProgrammer(false)"> No </introduction-button>
                </div>
            </div>

            <div class="flex flex-col pt-4">
                <label class="text-sm text-center pb-3 text-gray-900">
                ¿Esta cuenta será para uso personal o de
                empresa?</label>
                <div class="flex flex-row gap-x-8">
                  <introduction-button
                    :isActive="useCaseOption('business')"
                    @click.native="updateUseCaseOption('business')"
                  > Empresa </introduction-button>
                  <introduction-button
                    :isActive="useCaseOption('individual')"
                    @click.native="updateUseCaseOption('individual')"
                  > Personal </introduction-button>              </div>
            </div>

            <step-button @click.native="nextPage" v-bind:loading="!isCompleted">
              Continuar
            </step-button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import IntroductionButton from './IntroductionButton.vue';
import StepButton from '../StepButton.vue';

export default {
  computed: {
    ...mapState({
      name: (state) => state.auth.name,
      isProgrammerSelected: (state) => state.onboarding.isProgrammer,
      useCaseSelected: (state) => state.onboarding.useCase,
      userId: (state) => state.auth.userId,
    }),
    isCompleted() {
      return this.isProgrammerSelected !== null && this.useCaseSelected !== null;
    },
  },
  methods: {
    ...mapActions([
      'updateProgrammerOption',
      'updateUseCaseOption',
    ]),
    nextPage() {
      if (this.isCompleted) {
        window.analytics.identify(this.userId, {
          purpose: this.useCaseSelected,
          background: this.isProgrammerSelected ? 'programmer' : 'non-programmer',
        });
        this.$emit('next');
      }
    },
    isProgrammer(selected) {
      return selected === this.isProgrammerSelected;
    },
    useCaseOption(selected) {
      return selected === this.useCaseSelected;
    },
  },
  components: {
    IntroductionButton,
    StepButton,
  },
};
</script>

<style scoped>
</style>
