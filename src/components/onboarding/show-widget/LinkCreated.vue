<template>
  <div class="flex h-screen items-center justify-center">
    <div class="bg-white px-8 py-8 rounded shadow w-4/5 sm:w-1/2">
      <div class="text-4xl text-center mb-10">
        ¡Creaste tu primer Link!
      </div>
      <div class="text-sm text-justify text-gray-800">
        Conectaste exitosamente tu primera cuenta y
        acabas de crear tu primer <span class="font-semibold"> Link </span>
        de Fintoc.
      </div>

      <div>
        <div class="flex flex-row items-center justify-center relative my-4">
          <div class="bg-gray-200 ring-2 border-2 text-center overflow-x-scroll
                    text-black border-gray-200 rounded-sm text-xs px-4 py-2">
            <span class="cursor-pointer" @click="copyToClipboard">
            <code>
              {{ this.linkToken }}
            </code>
              </span>
            <input type="hidden" id="copy" :value="this.linkToken">
          </div>
        </div>

      <div class="text-sm text-justify text-gray-800">
        Guarda el identificador porque te servirá para consultar la API después.
      </div>

  </div>
      <div class="flex flex-row justify-center ">
        <step-button  @click.native="nextPage">
          Ver cuentas
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
      linkToken: (state) => state.onboarding.linkToken,
    }),
  },
  methods: {
    copyToClipboard() {
      const linkTextInput = document.querySelector('#copy');
      linkTextInput.setAttribute('type', 'text');
      linkTextInput.select();
      document.execCommand('copy');
      linkTextInput.setAttribute('type', 'hidden');
    },
    nextPage() {
      this.$emit('next');
    },
  },
  components: {
    StepButton,
  },
};
</script>
