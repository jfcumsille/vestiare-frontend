<template>
  <div class="demo">
    <div class="flex flex-col bg-white px-8 py-8 rounded shadow justify-center items-center">
      <div class="demo-title w-full">
        Creaste tu primer Link 🥳
      </div>
      <div class="demo-subtitle">
        Conectaste exitosamente tu primera cuenta bancaria y
        acabas de crear tu primer <span class="font-semibold"> Link </span>
        de Fintoc.
      </div>

      <div class="w-full">
        <div v-if="!loading"
        class="flex flex-row items-center justify-center relative my-4">
          <div class="link-container bg-gray-200 ring-2 text-center
                    color-txt-heading rounded-md text-xs px-4 py-2">
            <span class="cursor-pointer" @click="copyToClipboard">
            <code>
              {{ this.linkToken }}
            </code>
              </span>
            <input type="hidden" id="copy" class="bg-red-200" :value="this.linkToken">
            <button v-clipboard:copy='this.linkToken'
              class="text-lg px-3 focus:outline-none text-white h-10 fintoc-blue">
              <font-awesome-icon icon="copy"/>
            </button>
          </div>
        </div>
        <div v-if="loading"
          class="bg-gray-200 animate-pulse rounded-md shadow h-12 mt-2 mx-40"/>

        <div class="demo-subtitle mt-6">
          Guarda el link token porque después te servirá para consultar la API.
        </div>
      </div>
      <button class="demo-button text-center mt-8 min-w-200" @click="nextPage">Ver cuentas</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      linkToken: (state) => state.onboarding.linkToken,
    }),
    loading() {
      return this.linkToken === null;
    },
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
};
</script>

<style>

.min-w-200 {
  min-width: 200px;
}

.link-container {
  filter: drop-shadow(0px 2px 9px rgba(0, 0, 0, 0.07)) drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05));
}

</style>
