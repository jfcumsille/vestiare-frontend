<template>
<div class="flex flex-col items-center justify-between">
  <div class="relative w-full overflow-x-scroll mb-8">
    <table class="w-full min-width table-fixed">
      <thead class="bg-gray-100 border">
        <tr>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4
                    font-medium text-gray-800 uppercase tracking-wider w-3/6">
            URL
          </th>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                    font-medium text-gray-600 uppercase tracking-wider w-1/6">
            Modo
          </th>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                    font-medium text-gray-600 uppercase tracking-wider w-1/6">
            Activo
          </th>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-50 w-1/6"></th>
        </tr>
      </thead>
      <tbody class="bg-white border">
        <tr>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-3/6 truncate">
            {{selectedWebhook.url}}
          </td>
          <td class="px-4 py-2 whitespace-no-wrap border-b border-gray-200 w-1/6">
            <div
              class="text-md font-regular w-20 h-10 font-bold
                    py-2 px-2 rounded-md capitalize text-center"
              :class="[getBgColor(), getTextColor()]"
            >
              {{selectedWebhook.mode}}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6 overflow-hidden">
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
                  @change="updateEnabled(selectedWebhook)"/>
            </div>
          </td>
          <td class="px-4 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm
                    leading-5 font-medium w-1/6">
            <a href="#"
              @click.stop="askToDeleteWebhookEndpoint(selectedWebhook.id)"
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
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'userApiKeys',
    ]),
    ...mapState({
      mode: (state) => state.webhooks.mode,
      selectedWebhook: (state) => state.webhooks.selectedWebhook,
    }),
  },
  methods: {
    askToDeleteWebhookEndpoint(webhookEndpointId) {
      this.$emit('ask-to-delete-webhook', webhookEndpointId);
    },
    updateEnabled(webhookEndpoint) {
      this.$emit('update-webhook-status', webhookEndpoint);
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
