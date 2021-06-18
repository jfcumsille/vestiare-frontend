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
            <webhook-table class="border border-gray-300"
              @update-webhook-status="updateEnabled"/>
            <div class="mt-4 text-right flex flex-row justify-end space-x-2">
            <button to="/webhooks"
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
        <webhook-details
          @update-webhook-status="updateEnabled" />
      </div>
    </div>
  </main>
</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Spinner from '../components/lib/spinner.vue';
import WebhookDetails from '../components/webhooks/webhook-details.vue';
import WebhookTable from '../components/webhooks/webhooks-table.vue';
import ConfirmationModal from '../components/lib/confirmation-modal.vue';


export default {
  data() {
    return {
      retrievingUserApiKeys: false,
      showSpinner: false,
      webhookListsUpdated: 0,
    };
  },
  async created() {
    this.retrievingUserApiKeys = true;
    await this.$store.dispatch('getUserApiKeys');
    const unsubscribe = this.$store.subscribe(async ({ type }) => {
      if (type === 'updateUserApiKeys') {
        const { liveKey, testKey } = this.userSecretKeys;
        this.fetchWebhookEndpoints({ liveKey, testKey });
        unsubscribe();
      }
    });
    const unsubscribe2 = this.$store.subscribe(async ({ type }) => {
      if (type === 'updateWebhookEndpoints') {
        if (this.webhookListsUpdated === 1) {
          this.initComponent(this.$route.params.id);
          unsubscribe2();
        } else { this.webhookListsUpdated += 1; }
      }
    });
    this.retrievingUserApiKeys = false;
  },
  destroyed() {
    this.$store.commit('updateSelectedWebhook', null);
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
    ]),
    async fetchWebhookEndpoints({ liveKey, testKey }) {
      Promise.all([
        this.$store.dispatch('getWebhookEndpoints', { mode: 'live', apiKey: liveKey }),
        this.$store.dispatch('getWebhookEndpoints', { mode: 'test', apiKey: testKey }),
      ]);
    },
    initComponent(selectedWebhookId) {
      this.$store.commit('updateSelectedWebhook', selectedWebhookId);
      if (!this.selectedWebhook && this.$route.params.id) this.$router.push('/webhooks');
    },
    async deleteWebhookEndpoint(webhookEndpointId, mode) {
      const { liveKey, testKey } = this.userSecretKeys;
      await this.destroyWebhookEndpoint({ webhookEndpointId, mode, apiKey: mode === 'live' ? liveKey : testKey });
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
    async updateEnabled(webhookEndpoint) {
      const data = { disabled: webhookEndpoint.status === 'enabled' };
      const { liveKey, testKey } = this.userSecretKeys;
      this.updateWebhookEndpoint({
        webhookEndpointId: webhookEndpoint.id, requestBody: data, mode: this.mode, apiKey: this.mode === 'live' ? liveKey : testKey,
      });
    },
  },
  computed: {
    ...mapGetters(['userApiKeys', 'userSecretKeys', 'webhookEndpoints', 'errors']),
    ...mapState({
      mode: (state) => state.webhooks.mode,
      loading: (state) => state.webhooks.loading,
      selectedWebhook: (state) => state.webhooks.selectedWebhook,
      webhookEndpointToDelete: (state) => state.webhooks.webhookSelectedToDelete,
    }),
    shouldShowTable() {
      return !this.loading && this.webhookEndpoints.length !== 0;
    },
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
  },
};
</script>
