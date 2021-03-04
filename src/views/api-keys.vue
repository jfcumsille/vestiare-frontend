<template>
<div>
  <main class="h-screen">
    <div class="max-w-full mx-auto p-6 lg:p-8 relative">
      <spinner v-if="shouldShowSpinner"></spinner>
      <div class="flex flex-col">
        <div class="overflow-x-auto">
          <div class="align-middle inline-block min-w-full overflow-hidden
                      sm:rounded-md border-gray-200">
            <api-key-table v-if="shouldShowTable"></api-key-table>
            <div v-if="!shouldShowTable" class="text-center">
              <h1 class="text-4xl mt-4">
                Necesitas una API Key para empezar con Fintoc 🔑
              </h1>
            </div>
          </div>
          <div class="flex flex-col items-center justify-content">
            <div class="mt-4 flex flex-row w-2/3 justify-between">
              <div>
                <p>
                  Public: La usarás en el
                  <a href="https://docs.fintoc.com/docs/integration" target="_blank" class="underline">
                    Widget
                  </a>
                </p>
                <p>Secret: La usarás para llamar la API</p>
              </div>
              <div>
                <button @click="createApiKey"
                  :class="{ 'text-xs': shouldShowTable }"
                  class="px-3 py-2 inline-flex text-sm font-medium rounded-md
                      hover:bg-sub focus:outline-none bg-main text-white">
                  <font-awesome-icon icon="plus" class="mt-1 mr-1"/> Agregar API Key
                </button>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ApiKeyTable from '../components/api-keys/api-key-table.vue';
import Spinner from '../components/spinner.vue';

export default {
  data() {
    return {
      retrievingUserApiKeys: false,
    };
  },
  created() {
    this.retrievingUserApiKeys = true;
    this.$store.dispatch('getUserApiKeys').then(() => {
      this.retrievingUserApiKeys = false;
    });
  },
  mounted() {
    window.analytics.page('API Keys');
  },
  components: {
    ApiKeyTable,
    Spinner,
  },
  computed: {
    ...mapGetters([
      'userApiKeys',
    ]),
    shouldShowTable() {
      return this.userApiKeys.length !== 0;
    },
    shouldShowSpinner() {
      return this.$store.getters.userApiKeys.length === 0 && this.retrievingUserApiKeys;
    },
  },
  methods: {
    createApiKey() {
      this.$store.dispatch('createUserApiKey').then((response) => {
        window.analytics.track('API Key Created', {
          api_key_id: response.data.id,
        });
      });
    },
  },
};
</script>
