<template>
<div class="bg-white">
  <main class="h-full min-h-screen">
    <div class="max-w-full mx-auto p-6 lg:p-8 relative">
      <div class="grid place-items-center">
        <spinner
          v-if="loading"
          :widthClsName="'w-20'"
          :heightClsName="'h-20'" :borderClsName="'border-2 border-t-2'"></spinner>
      </div>
      <div v-if="!loading" class="flex flex-col">
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
            <webhook-table class="border border-gray-300"/>
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
    </div>
  </main>
</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Spinner from '../components/lib/spinner.vue';
import WebhookTable from '../components/webhooks/webhooks-table.vue';


export default {
  data() {
    return {
      retrievingUserApiKeys: false,
    };
  },
  async created() {
    this.retrievingUserApiKeys = true;
    await this.$store.dispatch('getUserApiKeys');
    this.retrievingUserApiKeys = false;
  },
  mounted() {
    // window.analytics.page('Webhooks');
    let unsubscribe = null;
    unsubscribe = this.$store.subscribe(({ type }) => {
      if (type === 'updateUserApiKeys') {
        const { liveKey, testKey } = this.userSecretKeys;
        Promise.all([
          this.$store.dispatch('getWebhookEndpoints', { mode: 'live', apiKey: liveKey }),
          this.$store.dispatch('getWebhookEndpoints', { mode: 'test', apiKey: testKey }),
        ]);
        unsubscribe();
      }
    });
  },
  methods: {
    ...mapActions([
      'getWebhookEndpoints',
      'updateWebhookEndpointsMode',
    ]),
  },
  computed: {
    ...mapGetters(['userApiKeys', 'userSecretKeys', 'webhookEndpoints', 'errors']),
    ...mapState({
      mode: (state) => state.webhooks.mode,
      loading: (state) => state.webhooks.loading,
    }),
    shouldShowTable() {
      return !this.loading && this.webhookEndpoints.length !== 0;
    },
    testMode() {
      return this.mode === 'test';
    },
  },
  components: {
    Spinner,
    WebhookTable,
  },
};
</script>
