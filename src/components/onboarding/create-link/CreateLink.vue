<template>
<div>
  <transition name="fade">
    <modal v-if="showTestCredentials" @close-modal="toggleTestCredentials"/>
  </transition>

  <div v-if="showLinkIntroduction" class="flex h-screen justify-center items-center">
    <div class="box-border bg-white px-8 py-12 rounded shadow sm:w-1/2 w-11/12">
      <div class="flex flex-col items-center justify-center relative">
        <div class="text-lg text-center mb-12">
          Prueba Fintoc en 3 minutos!
        </div>
        <div class="text-sm font-semibold mb-2 text-left w-full">
          Conectemos tu primera cuenta
        </div>
        <div class="text-sm text-justify">
          Las cuentas en Fintoc se conectan con nuestro Widget. Este Widget lo puedes embeber en tu
          página o aplicación para conectar las cuentas bancarias de tus usuarios, a tu app.
          Puedes probar Fintoc con
          una cuenta real, o con una
          <span @click="toggleTestCredentials" class="underline cursor-pointer">
            cuenta de prueba.
          </span>
        </div>
        <div v-if="!linkOptionSelected"
            class="flex flex-row pt-8 text-center justify-center space-x-12">
          <div @click="selectModeOption(MODE_OPTIONS.test)"
                class="py-2 bg-white text-sm cursor-pointer rounded
                px-2 text-fintoc-blue
                shadow-lg w-2/5 text-center flex items-center content-center">
                Conectar cuenta de prueba
          </div>
          <div @click="selectModeOption(MODE_OPTIONS.live)"
                class="py-2 bg-fintoc-blue text-sm cursor-pointer
                      rounded px-2 text-white text-bold
                      shadow-lg w-2/5 text-center flex items-center content-center">
            Conectar mi cuenta real
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex h-screen items-center justify-center" v-if="linkCreated">
    <div class="bg-white px-8 py-8 rounded shadow w-4/5 sm:w-1/2">
      <div class="text-lg text-center mb-12">
        Prueba Fintoc en 3 minutos!
      </div>
      <div class="text-sm font-semibold mb-2 text-left w-full">
        Tu primer Link
      </div>
      <div class="text-sm text-justify">
        Conectaste exitosamente tu primera cuenta y
        acabas de crear tu primer <span class="font-semibold"> Link </span>
        de Fintoc.
      </div>
      <link-created />
      <div class="flex flex-row justify-center ">
        <div v-if="linkCreated"
          @click="nextPage"
          class="cursor-pointer shadow-outline-lg rounded
          text-white bg-fintoc-blue round
          text-md text-center p-2 mt-8  ring-0 focus:ring-0">
          Ver cuentas
        </div>
      </div>
    </div>

  </div>

  <div v-if="showWidget" class="flex h-screen items-center justify-center">
    <widget
        @linkCreated='onLinkCreated'
        @onboarding-back='unselectLinkOption'
        :createdThrough="'onboarding'"
        :product="'movements'"
        :headers="formHeaders"
        :holderTypeOnboarding="useCase"
        :mode="mode"
        :closeOnboarding="true"
      />
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import LinkCreated from './CreateLinkCompleted.vue';
import Modal from './CreateLinkModal.vue';
import Widget from '../../links/link-wizard.vue';

const MODE_OPTIONS = { test: 'test', live: 'live' };

export default {
  data() {
    return {
      showLinkIntroduction: true,
      showTestCredentials: false,
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
      console.log(this.link);
      return this.link !== null;
    },
    linkOptionSelected() {
      return Object.keys(MODE_OPTIONS).includes(this.mode);
    },
    formHeaders() {
      return this.$store.getters.authHeaders;
    },
    showWidget() {
      return !this.linkCreated && !this.showLinkIntroduction;
    },
  },
  methods: {
    ...mapActions([
      'setOnboardingLink',
      'setEnvironmentMode',
    ]),
    selectModeOption(mode) {
      this.setEnvironmentMode({ mode });
      this.mode = mode;
      this.showLinkIntroduction = false;
    },
    unselectLinkOption() {
      this.setEnvironmentMode({ mode: null });
      this.mode = null;
      this.showLinkIntroduction = true;
    },
    onLinkCreated(link) {
      this.setOnboardingLink({ link, mode: this.mode });
    },
    toggleTestCredentials() {
      this.showTestCredentials = !this.showTestCredentials;
    },
    nextPage() {
      this.$emit('next');
    },
  },
  components: {
    LinkCreated,
    Widget,
    Modal,
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
