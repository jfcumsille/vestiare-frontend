<template>
<div class="flex h-full justify-center items-center">
  <div class="z-50 max-h-screen bg-white rounded-md w-4/5 pt-4
              border-2 border-gray-100 shadow-md">
    <div class="flex flex-col items-center justify-center mx-8 py-12">
      <div>
        <img src="../../../assets/images/isotipo.svg" class="h-12" />
      </div>

      <div class="py-2 text-center font-sz-24 font-300 color-txt-heading pt-4 pb-8">
        ¡Así de simple es Fintoc!
      </div>

      <div class="font-sz-16 font-300 text-justify mb-4">
        Ahora con tu link token puedes consultar tus cuentas bancarias cuando quieras. Incluso
        puedes hacerlo desde cualquiera de nuestras <a class="underline" target="_blank" href="https://docs.fintoc.com/docs/librerias">librerías públicas</a>.
      </div>

      <div class="font-sz-16 font-300 text-justify pb-4">
        Integra el <a class="underline" target="_blank" href="https://docs.fintoc.com/docs/usando-el-widget">widget</a> de Fintoc en tu app o página web
        para que tus usuarios se conecten de forma segura y automática a sus cuentas.
      </div>

      <button class="demo-button text-center mt-8 min-w-200" @click="nextPage">Continuar</button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

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
};
</script>
