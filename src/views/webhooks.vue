<template>
<div class="bg-white">
    <confirmation-modal v-if="showDeleteModal"
      :title='"Eliminar Webhook Endpoint"'
      :text='`¿Estás seguro que quieres borrar este webhook endpoint?
      Esta acción no se puede deshacer.`'
      :leftButtonText="'Cancelar'"
      :rightButtonText="'Eliminar'"
      :onConfirm="confirmDeleteWebhookEndpoint"
      :onCancel="cancelDeleteWebhookEndpoint"
      :showSpinner="showSpinner"
      />
    <new-webhook-modal
      v-if="showCreationModal"
    />
  <main class="h-full min-h-screen">
    <div class="max-w-full mx-auto p-6 lg:p-8 relative h-full">
      <div class="grid place-items-center">
        <spinner
          v-if="loading"
          :widthClsName="'w-20'"
          :heightClsName="'h-20'" :borderClsName="'border-2 border-t-2'"></spinner>
      </div>
      <div v-if="!loading && !selectedWebhook" class="flex flex-col">
        <span class="text-xl tracking-wider font-semibold py-1"></span>
        <div class="flex justify-end mb-8 mr-1">
            <h1 class="text-gray-900 font-semibold text-xl leading-9 mr-2">Modo</h1>
            <toggle-button class="mt-1" :css-colors="false" :color="{checked: '#475FF1',
                                    unchecked: '#475FF1'}"
              :value="!testMode"
              :sync="true"
              :width="70"
              :height="26"
              :fontSize="16"
              :margin="6"
              :labels="{checked: 'Live', unchecked: 'Test'}"
              @change="updateWebhookEndpointsMode()" />
        </div>
        <div class="overflow-x-auto">
          <div class="align-middle inline-block min-w-full overflow-hidden
                      sm:rounded-md">
            <webhook-table class="border border-gray-300" />
            <div class="mt-4 text-right flex flex-row justify-end space-x-2">
            <button
              @click="openCreateWebhookModal"
              class="text-center justify-content flex flex-col items-center
                    font-medium rounded-md bg-main text-md
                    text-white hover:bg-sub w-64 h-10 py-2">
              {{ `Suscribir webhook ${testMode ? 'de prueba' : ''}` }}
            </button>
          </div>
          </div>
        </div>
      </div>
      <div v-if="!loading && selectedWebhook" class="flex flex-col">
        <webhook-details />
      </div>
    </div>
  </main>
</div>
</template>

<script>
import {
  mapGetters, mapState, mapActions, mapMutations,
} from 'vuex';
import Spinner from '../components/lib/spinner.vue';
import WebhookDetails from '../components/webhooks/webhook-details.vue';
import WebhookTable from '../components/webhooks/webhooks-table.vue';
import ConfirmationModal from '../components/lib/confirmation-modal.vue';
import NewWebhookModal from '../components/webhooks/new-webhook-modal.vue';


export default {
  data() {
    return {
      loading: true,
      showSpinner: false,
    };
  },
  async created() {
    this.loading = true;
    await this.fetchWebhookEndpoints();
    this.initComponent(this.$route.params.id);
    this.loading = false;
  },
  destroyed() {
    this.updateSelectedWebhook(null);
  },
  watch: {
    '$route.path': function changeSelected() {
      this.initComponent(this.$route.params.id);
    },
  },
  methods: {
    ...mapActions([
      'getWebhookEndpoints',
      'updateWebhookEndpointsMode',
      'destroyWebhookEndpoint',
      'updateWebhookEndpoint',
      'updateWebhookSelectedToDelete',
      'updateShowCreateModal',
    ]),
    ...mapMutations(['updateSelectedWebhook']),
    async fetchWebhookEndpoints() {
      return Promise.all([
        this.getWebhookEndpoints({ mode: 'live' }),
        this.getWebhookEndpoints({ mode: 'test' }),
      ]);
    },
    initComponent(selectedWebhookId) {
      this.updateSelectedWebhook(selectedWebhookId);
      if (!this.selectedWebhook && this.$route.params.id) this.$router.push('/webhooks');
    },
    async deleteWebhookEndpoint(webhookEndpointId, mode) {
      await this.destroyWebhookEndpoint({ webhookEndpointId, mode });
      if (this.$route.params.id) this.$router.push('/webhooks');
    },
    cancelDeleteWebhookEndpoint() {
      this.updateWebhookSelectedToDelete({ webhookEndpointId: null });
    },
    async confirmDeleteWebhookEndpoint() {
      if (this.webhookEndpointToDelete === null) {
        return;
      }
      this.showSpinner = true;
      await this.deleteWebhookEndpoint(this.webhookEndpointToDelete, this.mode);
      this.showSpinner = false;
      this.updateWebhookSelectedToDelete({ webhookEndpointId: null });
    },
    openCreateWebhookModal() {
      this.updateShowCreateModal();
    },
  },
  computed: {
    ...mapGetters(['webhookEndpoints']),
    ...mapState({
      mode: (state) => state.webhooks.mode,
      selectedWebhook: (state) => state.webhooks.selectedWebhook,
      webhookEndpointToDelete: (state) => state.webhooks.webhookSelectedToDelete,
      showCreationModal: (state) => state.webhooks.showCreateModal,
    }),
    testMode() {
      return this.mode === 'test';
    },
    showDeleteModal() {
      return !!this.webhookEndpointToDelete;
    },
  },
  components: {
    Spinner,
    WebhookTable,
    WebhookDetails,
    ConfirmationModal,
    NewWebhookModal,
  },
};
</script>
