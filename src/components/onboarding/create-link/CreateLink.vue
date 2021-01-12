<template>
  <div class="flex h-screen justify-center items-center">
    <div class="box-border bg-white px-8 py-12 rounded shadow sm:w-1/2 w-11/12">
      <div class="flex flex-col items-center justify-center relative">
        <div class="text-4xl text-center mb-10">
          Conectemos tu primera cuenta
        </div>
        <div class="text-sm text-justify text-gray-800">
          Las cuentas en Fintoc se conectan con nuestro Widget. Puedes usar este Widget en tu
          página o aplicación para conectar las cuentas bancarias de tus usuarios.
          <br>
          <br>
          Puedes probar Fintoc con una cuenta real, o con una
          <a class="underline cursor-pointer" target="_blank" href="https://docs.fintoc.com/docs/ambiente-de-test"> cuenta de prueba</a>.
        </div>
        <div v-if="!linkOptionSelected"
            class="flex flex-row pt-8 text-center justify-center space-x-12">
          <div @click="selectModeOption(MODE_OPTIONS.test)"
                class="py-2 bg-white text-sm cursor-pointer rounded
                px-2 border
                w-2/5 text-center flex items-center content-center
                hover:border-secondary-blue hover:text-secondary-blue">
                Conectar cuenta de prueba
          </div>
          <div @click="selectModeOption(MODE_OPTIONS.live)"
                class="py-2 bg-secondary-blue text-sm cursor-pointer
                      rounded px-2 text-white text-bold
                      w-2/5 text-center flex items-center content-center
                      hover:bg-secondary-lighterBlue">
            Conectar mi cuenta real
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const MODE_OPTIONS = { test: 'test', live: 'live' };
export default {
  data() {
    return {
      mode: null,
      MODE_OPTIONS,
    };
  },
  computed: {
    ...mapState({
      holderType: (state) => state.onboarding.useCase,
      link: (state) => state.onboarding.link,
      useCase: (state) => state.onboarding.useCase,
    }),
    linkCreated() {
      return this.link !== null;
    },
    linkOptionSelected() {
      return Object.keys(MODE_OPTIONS).includes(this.mode);
    },
  },
  methods: {
    ...mapActions([
      'setOnboardingLink',
      'setEnvironmentMode',
    ]),
    selectModeOption(mode) {
      this.setEnvironmentMode({ mode });
      this.nextPage();
    },
    nextPage() {
      this.$emit('next');
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
