<template>
  <div class="absolute z-50 inset-0 overflow-y-auto
            bg-gray-700 bg-opacity-75">
    <div class="flex h-screen items-center justify-center py-4 px-4 text-center">
      <div
        class="bg-white px-4 py-4 inline-block align-bottom rounded-sm  overflow-hidden
                  shadow-xl w-full sm:w-3/5 cursor-auto">
          <div class="font-semibold text-left">
            Ver Cuentas por API
          </div>
          <div class="sm:text-sm text-xs text-justify pb-8">
            Copia el snippet de Fintoc y pégalo en tú consola. Podrás ver como es el
            JSON de respuesta de las cuentas de Fintoc. Para más información te
            recomendamos ver nuestra <a class="underline" target="_blank" href="https://docs.fintoc.com/reference#objeto-account"> documentación</a>.
          </div>
          <terminal>
            <div class="pb-24 pt-2 text-left px-4 break-all">
              {{ apiQuery }}
            </div>
          </terminal>
          <div class="flex justify-center items-center mt-4">
            <div @click="closeModal"
                  class="bg-tint-blue text-sm py-2 px-8 rounded-sm
                      text-white cursor-pointer">
                        Listo
            </div>
          </div>
      </div>
    </div>
  <input type="hidden" id="copy" :value="apiQuery">
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Terminal from '../TerminalContainer.vue';

export default {
  computed: {
    ...mapState({
      linkToken: (state) => state.onboarding.linkToken,
      apiKey: (state) => state.onboarding.apiKey,
    }),
    token() {
      if (this.apiKey) {
        return this.apiKey.token;
      }
      return null;
    },
    apiQuery() {
      return `curl "api.fintoc.com/v1/accounts?link_token=${this.linkToken}" -H "Authorization: ${this.token}"`;
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
  components: {
    Terminal,
  },
};
</script>
