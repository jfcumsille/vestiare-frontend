<template>
  <transition name="background-fade" mode="out-in" >
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
                  sm:p-0">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
        </span>
        <transition name="modal-fade" mode="out-in" >
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
                    shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg
                    sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline">
          <div class="bg-white px-4 pt-4 pb-4 sm:p-6 sm:pb-4 border-b">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Enviar webhook de prueba
            </h3>
          </div>
          <div class="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b mb-2">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full overflow-x-scroll">
                <div class="mt-2 flex flex-wrap gap-4 w-full tracking-wider">
                  <div class="leading-6 text-gray-700">
                      Tipo de evento
                  </div>
                  <select v-model="selectedType"
                          class="leading-6 text-gray-700 text-justify shadow-sm
                                 bg-white border border-gray-800 rounded-md
                                text-gray-700 text-justify py-2 px-2">
                    <option v-for="option in options" :key="option">
                      {{option}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div v-if="requestBody"
              class="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4
                     border-b text-gray-700 tracking-wider">
            <div>
              <h3 class="">Solicitud</h3>
              <div class="bg-white max-h-full overflow-y-scroll text-xs">
                <pre>{{JSON.stringify(requestBody, null, '  ')}}</pre>
              </div>
            </div>
          </div>
          <div class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
              <button
                v-if="!showSpinner"
                @click="sendWebhookEventType"
                type="button"
                class="justify-self-center w-40 rounded-md border border-transparent
                      px-4 py-2 bg-main text-base leading-6 font-medium text-white shadow-sm
                      hover:bg-sub focus:outline-none focus:border-blue-700
                      focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm
                      sm:leading-5 align-self-center">
                Enviar
              </button>
              <div v-if="showSpinner"
                  class="justify-self-center w-40 rounded-md border border-transparent
                      px-4 py-2 bg-gray-400 text-base leading-6 font-medium text-white shadow-sm
                      hover:bg-gray focus:outline-none focus:border-blue-700
                      focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm
                      sm:leading-5 align-self-center flex items-center justify-center cursor-wait">
                  <spinner :widthClsName="'w-6'" :heightClsName="'h-6'"
                           :borderClsName="'border-4 border-t-4'" />
                </div>
              <button
                @click="cancelSendWebhookEvent"
                type="button"
                class="justify-self-center w-40 rounded-md border border-gray-300 px-4
                      py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm
                      hover:text-gray-500 focus:outline-none focus:border-blue-300
                      focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm
                      sm:leading-5 align-middle h-12 align-self-center">
                Cancelar
              </button>
          </div>
        </div>
        </transition>
      </div>
    </div>
  </transition>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import Spinner from '../lib/spinner.vue';

export default {
  data() {
    return {
      selectedType: this.options[0],
      showSpinner: false,
    };
  },
  props: {
    options: Array,
  },
  components: {
    Spinner,
  },
  computed: {
    ...mapState({
      requestBody: (state) => state.webhooks.testRequestBody,
      selectedWebhook: (state) => state.webhooks.selectedWebhook,
    }),

  },
  methods: {
    ...mapActions(['updateShowSendTestWebhookModal', 'updateWebhookTestResponse', 'sendTestWebhookEvent']),
    async sendWebhookEventType() {
      this.showSpinner = true;
      const webhookEndpointId = this.selectedWebhook.id;
      const requestBody = { event: this.selectedType };
      await this.sendTestWebhookEvent({
        webhookEndpointId, requestBody,
      });
      this.showSpinner = false;
    },
    cancelSendWebhookEvent() {
      this.updateShowSendTestWebhookModal();
      this.updateWebhookTestResponse({ requestBody: null });
    },
  },
};
</script>
