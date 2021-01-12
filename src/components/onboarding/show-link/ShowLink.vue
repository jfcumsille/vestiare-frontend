<template>
<div class="flex h-full justify-center items-center">
  <div class="z-50 max-h-screen bg-white rounded-md w-4/5 sm:w-1/2 pt-4
              border-2 border-gray-100 shadow-md">
    <div class="flex flex-col items-center justify-center mx-8 py-12">
      <div>
        <img src="../../../assets/images/fintoc-isologo.png" class="h-16" />
      </div>

      <div class="py-2 text-center text-4xl pt-4 pb-8">
        ¡Así de simple es Fintoc!
      </div>

      <div class="text-sm text-justify mb-4">
        Ahora con tu link token puedes consultar tus cuentas bancarias cuando quieras. Incluso
        puedes hacerlo desde cualquiera de nuestras <a class="underline" target="_blank" href="https://docs.fintoc.com/docs/librerias"> librerías públicas </a>.
      </div>

      <div class="text-sm text-justify pb-4">
        También si quieres que tus usuarios se conecten de forma segura y automática
        a tus aplicaciones puedes incluir el <a class="underline" target="_blank" href="https://docs.fintoc.com/docs/usando-el-widget"> widget </a> de Fintoc en tu app o página web.
      </div>

      <step-button @click.native="nextPage">
        Terminar
      </step-button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import StepButton from '../StepButton.vue';

export default {
  computed: {
    ...mapState({
      name: (state) => state.auth.name,
      link: (state) => state.onboarding.link,
    }),
  },
  methods: {
    nextPage() {
      this.$emit('next');
    },
  },
  components: {
    StepButton,
  },
};
</script>
