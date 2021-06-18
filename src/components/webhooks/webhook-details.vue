<template>
<div class="flex flex-col items-center justify-between">
  <webhook-send-modal
    v-if="showSendWebhookModal"
    :showSpinner="showSpinner"
    :options="selectedWebhook.enabledEvents"
    @confirm-send-webhook="confirmSendTestWebhookEvent"
    @cancel-send-webhook="hideTestWebhookEventModal"
  />
  <div class="relative w-full overflow-x-scroll mb-8">
    <table class="w-full min-width table-fixed">
      <thead class="bg-gray-100 border">
        <tr>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4
                    font-medium text-gray-800 uppercase tracking-wider w-6/12">
            URL
          </th>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                    font-medium text-gray-600 uppercase tracking-wider w-2/12">
            Modo
          </th>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                    font-medium text-gray-600 uppercase tracking-wider w-1/12">
            Activo
          </th>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-50 w-2/12"
              v-if="selectedWebhook.mode === 'test'"></th>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-50 w-1/12"></th>
        </tr>
      </thead>
      <tbody class="bg-white border">
        <tr>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-6/12 truncate">
            {{selectedWebhook.url}}
          </td>
          <td class="px-4 py-2 whitespace-no-wrap border-b border-gray-200 w-2/12">
            <div
              class="text-md font-regular w-20 h-10 font-bold
                    py-2 px-2 rounded-md capitalize text-center"
              :class="[getBgColor(), getTextColor()]"
            >
              {{selectedWebhook.mode}}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/12 overflow-hidden">
            <div class="text-lg leading-5 text-gray-900">
              <toggle-button :color="{checked: 'rgba(52, 211, 153, 0.75)',
                                      unchecked: '#718096'}"
                :value="selectedWebhook.status === 'enabled'"
                :sync="true"
                :width="60"
                :height="28"
                :fontSize="12"
                :speed="250"
                :labels="{checked: 'Sí', unchecked: 'No'}"
                @change="updateEnabled"/>
            </div>
          </td>
          <td v-if="selectedWebhook.mode === 'test'"
              class="px-4 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm
                    leading-5 font-medium w-2/12">
            <button
              @click="showTestWebhookEventModal"
              class="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-orange-300
                     text-orange-900 hover:bg-orange-400">
                <font-awesome-icon icon="share" class="mt-1 mr-1"/>
                Enviar webhook de prueba
            </button>
          </td>
          <td class="px-4 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm
                    leading-5 font-medium w-1/12">
            <a href="#"
              @click.stop="askToDeleteWebhookEndpoint"
              class="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-red-200
                        text-red-900 hover:bg-red-300">
              <font-awesome-icon icon="trash" class="mt-1 mr-1"/> Borrar
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="relative w-full overflow-x-scroll">
    <div class="rounded">
      <table class="w-full min-width table-fixed">
        <thead class="bg-gray-100 border">
          <tr>
            <th class="px-6 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4
                    font-medium text-gray-800 uppercase tracking-wider w-1/4">Detalles</th>
            <th class="px-6 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4
                    font-medium text-gray-800 uppercase tracking-wider w-3/4"/>
          </tr>
        </thead>
        <tbody class="bg-white border">
          <tr>
            <td class="px-6 py-4 border-b border-gray-200 w-1/4
                       text-left leading-5 text-gray-600 align-text-top">
              URL
            </td>
            <td class="px-6 py-4 border-b border-gray-200 w-3/4
                       text-left leading-5 text-gray-900">
              {{selectedWebhook.url}}
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 border-b border-gray-200 w-1/4
                       text-left leading-5 text-gray-600 align-text-top">
              Descripción
            </td>
            <td class="px-6 py-4 border-b border-gray-200 w-3/4
                       text-s text-left leading-5 text-gray-900 break-all">
              {{selectedWebhook.description}}
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 border-b border-gray-200 w-1/4
                       text-left leading-5 text-gray-600 align-text-top">
              Tipos de evento
            </td>
            <td class="px-6 py-4 border-b border-gray-200 w-3/4
                       text-left leading-5 text-gray-900">
              <ul>
                <li v-for="event in selectedWebhook.enabledEvents" :key="event">
                  {{event}}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapActions, mapGetters, mapState, mapMutations,
} from 'vuex';
import webhookSendModal from './webhook-send-modal.vue';

export default {
  components: { webhookSendModal },
  data() {
    return {
      showSendWebhookModal: false,
      showSpinner: false,
    };
  },
  computed: {
    ...mapGetters([
      'userSecretKeys',
    ]),
    ...mapState({
      mode: (state) => state.webhooks.mode,
      selectedWebhook: (state) => state.webhooks.selectedWebhook,
    }),
  },
  methods: {
    ...mapActions(['sendTestWebhookEvent', 'updateWebhookSelectedToDelete']),
    ...mapMutations(['updateWebhookTestResponse']),
    showTestWebhookEventModal() {
      this.showSendWebhookModal = true;
    },
    async confirmSendTestWebhookEvent(selectedEvent) {
      this.showSpinner = true;
      const webhookEndpointId = this.selectedWebhook.id;
      const requestBody = { event: selectedEvent };
      const { testKey } = this.userSecretKeys;
      await this.sendTestWebhookEvent({
        webhookEndpointId, requestBody, apiKey: testKey,
      });
      this.showSpinner = false;
    },
    hideTestWebhookEventModal() {
      this.showSendWebhookModal = false;
      this.updateWebhookTestResponse({});
    },
    askToDeleteWebhookEndpoint() {
      this.updateWebhookSelectedToDelete({ webhookEndpointId: this.selectedWebhook.id });
    },
    updateEnabled() {
      this.$emit('update-webhook-status', this.selectedWebhook);
    },
    getBgColor() {
      return this.selectedWebhook.mode === 'test' ? 'bg-orange-300' : 'bg-fintoc-green';
    },
    getTextColor() {
      return this.selectedWebhook.mode === 'test' ? 'text-orange-900' : 'text-white';
    },
  },
};
</script>

<style>
.min-width {
  min-width: 1100px;
}
</style>
