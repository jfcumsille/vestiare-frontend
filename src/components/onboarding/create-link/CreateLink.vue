<template>
<div v-bind:class="centerContent">
  <div v-if="!linkCreated"
      class="md:px-12 px-2 2xl:py-12 lg:py-4">
    <div class="2xl:text-5xl xl:text-3xl text-xl text-center font-bold">
      Prueba Fintoc en 3 minutos!
    </div>
    <div>
      <div class="2xl:px-8 2xl:py-8 2xl:py-4 pt-4 2xl:mb-8 mb-2">
        <div class="2xl:text-3xl xl:text-2xl lg:text-xl font-bold">
          Conectemos tu primera cuenta
        </div>
        <div class="2xl:text-2xl xl:text-xl lg:text-md font-semibold">
          Las cuentas en Fintoc se conectan con nuestro Widget.
          Puedes probar Fintoc con
          una cuenta real, o con una
            <span @click="toggleTestCredentials" class="underline cursor-pointer">
              cuenta de prueba.
            </span>
        </div>
      </div>
      <transition name="fade">
        <modal v-if="showTestCredentials"
            class="cursor-pointer"
            @click.native="toggleTestCredentials">
        <div class="bg-white px-4 py-4 flex items-center justify-center">
          <div class="flex items-center justify-center">
            <font-awesome-icon class="m-auto fa-2x text-tint-yellow w-1/6" icon="key"/>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-5/6">
              <h3 class="text-lg font-semibold text-gray-900">
                Credenciales de prueba
              </h3>
              <div>
                <p class="text-sm text-gray-600">
                  Usuario: 40427672-7
                </p>
                <p class="text-sm text-gray-600">
                  Contraseña: jonsnow
                </p>
              </div>
            </div>
          </div>
        </div>
      </modal>
      </transition>
      <link-form />
    </div>
  </div>
  <div
    v-if="linkCreated"
    class="w-5/6">
    <div class="bg-white px-12 py-12 rounded shadow">
      <div class="2xl:text-5xl xl:text-3xl text-xl text-center font-bold">
        Prueba Fintoc en 3 minutos!
      </div>
      <link-created v-if="linkCreated" />
      <div class="flex flex-row justify-center ">
        <div v-if="linkCreated"
          @click="nextPage"
          class="cursor-pointer shadow-outline-lg rounded w-1/2
          text-white bg-fintoc-blue rounde font-bold
          text-lg text-center p-2 mt-8 lg:mt-12 ring-0 focus:ring-0"
          v-bind:class="nextPageButtonCSS">
          Ver cuentas
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

import LinkForm from './CreateLinkForm.vue';
import LinkCreated from './CreateLinkCompleted.vue';
import Modal from './CreateLinkModal.vue';

export default {
  data() {
    return {
      showTestCredentials: false,
    };
  },
  computed: {
    ...mapState({
      holderType: (state) => state.onboarding.useCase,
      link: (state) => state.onboarding.link,
    }),
    linkCreated() {
      return this.link !== null;
    },
    centerContent() {
      if (this.linkCreated) {
        return 'flex h-full justify-center items-center';
      }
      return '';
    },
  },
  methods: {
    toggleTestCredentials() {
      this.showTestCredentials = !this.showTestCredentials;
    },
    nextPage() {
      this.$emit('next');
    },
  },
  components: {
    LinkCreated,
    LinkForm,
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
