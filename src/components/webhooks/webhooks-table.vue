<template>
<div class="relative w-full h-full overflow-x-scroll">
  <table class="w-full min-width table-fixed">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-1/3">
          URL
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-1/4">
          Descripción
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-1/4">
          Nº de Eventos suscritos
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-8p">
          Activo
        </th>

        <th class="border-b border-gray-200 bg-gray-50 w-06p"/>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 w-8p"></th>
      </tr>
    </thead>
    <tbody class="bg-white" name="list">
      <tr v-show="showNoEndpointsMessage">
        <td colspan="8" class="bg-white border-b border-gray-200">
          <div class="px-6 py-4 w-full text-center">
            <h1 class="text-4xl mt-4">
                {{`Todavía no suscribes ningún webhook ${this.mode === 'test' ? 'de test ' : ''}👀`}}
            </h1>
          </div>
        </td>
      </tr>
      <tr v-for='webhookEndpoint in webhookEndpoints' v-bind:key='webhookEndpoint.id'
        @click="selectWebhookEndpoint(webhookEndpoint, $event)"
        class="cursor-pointer hover:bg-gray-200">
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6
                  overflow-hidden">
          <div class="text-sm text-left leading-5 text-gray-900">
            <span>{{ webhookEndpoint.url }}</span>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6
                  overflow-hidden">
          <div class="text-sm text-left leading-5 text-gray-900">
            <span>{{ webhookEndpoint.description }}</span>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6
                  overflow-hidden">
          <div class="text-sm text-left leading-5 text-gray-900">
            <span>{{ webhookEndpoint.enabledEvents.length }}</span>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6 overflow-hidden">
          <div class="text-lg leading-5 text-gray-900">
            <toggle-button :color="{checked: 'rgba(52, 211, 153, 0.75)',
                                    unchecked: '#718096'}"
              :value="webhookEndpoint.status === 'enabled'"
              :sync="true"
              :width="60"
              :height="28"
              :fontSize="12"
              :speed="250"
              :labels="{checked: 'Sí', unchecked: 'No'}"
              @change="updateEnabled(webhookEndpoint)"/>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6  w-06p"/>
        <td class="px-4 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm
                  leading-5 font-medium">
          <a href="#"
            @click.stop="askToDeleteWebhookEndpoint(webhookEndpoint.id)"
            class="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-red-200
                      text-red-900 hover:bg-red-300">
            <font-awesome-icon icon="trash" class="mt-1 mr-1"/> Borrar
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['webhookEndpoints']),
    ...mapState({
      mode: (state) => state.webhooks.mode,
    }),
    showNoEndpointsMessage() {
      return this.webhookEndpoints.length === 0;
    },
  },
  methods: {
    ...mapActions(['updateWebhookSelectedToDelete', 'updateWebhookEndpoint']),
    selectWebhookEndpoint(webhookEndpoint, event) {
      if (event.target.className.includes('switch')) return;
      this.$router.push(`/webhooks/${webhookEndpoint.id}`);
    },
    askToDeleteWebhookEndpoint(webhookEndpointId) {
      this.updateWebhookSelectedToDelete({ webhookEndpointId });
    },
    updateEnabled(webhookEndpoint) {
      const data = { disabled: webhookEndpoint.status === 'enabled' };
      this.updateWebhookEndpoint({
        webhookEndpointId: webhookEndpoint.id, requestBody: data, mode: this.mode,
      });
    },
  },
};
</script>

<style scoped>

.w-8p {
  width: 8%
}
.w-06p {
  width: 0.666667%
}

.list-enter-active, .list-leave-active {
  transition: all .3s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-15px);
}

.modal-fade-enter,
.modal-fade-leave-to {
  scale: 95;
  transform: translateY(10px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all .3s ease;
}

.background-fade-enter,
.background-fade-leave-to {
  opacity: 0;
}

.background-fade-enter-active,
.background-fade-leave-active {
  transition: opacity .2s ease-out;
}

.min-width {
  min-width: 1100px;
}
</style>
