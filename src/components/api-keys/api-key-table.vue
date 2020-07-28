<template>
<div>
  <div v-for="mode in ['live', 'test']" v-bind:key='mode' class="mt-10">
    <table class="min-w-full">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                    font-medium text-gray-600 uppercase tracking-wider w-4/6">
            {{ mode }} Keys
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                    font-medium text-gray-600 uppercase tracking-wider w-1/6">
            Tipo
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 w-1/6"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for='apiKey in apiKeysByMode(mode)' v-bind:key='apiKey.id'>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-4/6">
            <div class="flex">
              <div class="api-key
                          bg-teal-200 py-3 px-4 rounded-md text-lg text-gray-900
                          rounded-r-none tracking-wider">
                {{ apiKey.key }}
              </div>
              <div class="flex-none bg-teal-200 hover:bg-teal-300 rounded-r-md h-full">
                <button v-clipboard:copy='apiKey.key'
                        class="text-lg py-3 px-3">
                  <font-awesome-icon icon="copy"/>
                </button>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6">
            <div
              class="text-lg font-regular text-gray-900 w-24
                    text-center bg-gray-200 py-3 px-4 rounded-md"
            >
              {{ mapApiKeyType(apiKey.isPublic) }}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b
                    border-gray-200 text-sm leading-5 font-medium w-1/6">
            <button v-if="mode !== 'test'" @click="destroyApiKey(apiKey.id)"
              class="px-6 py-3 inline-flex text-sm leading-5 font-medium rounded-md bg-red-200
                      text-red-900 hover:bg-red-300 align-middle">
              <font-awesome-icon icon="trash" class="mr-2 align-middle"/> Borrar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<style scoped>
.api-key {
  max-width: 800px;
  overflow: hidden;
}
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'userApiKeys',
    ]),
  },
  methods: {
    apiKeysByMode(mode) {
      return this.userApiKeys.filter((apiKey) => apiKey.mode === mode);
    },
    destroyApiKey(apiKeyId) {
      this.$store.dispatch('destroyUserApiKey', apiKeyId).then(() => {
        window.analytics.track('API Key Deleted', {
          api_key_id: apiKeyId,
        });
      });
    },
    mapApiKeyType(isPublic) {
      switch (isPublic) {
        case true:
          return 'Public';
        case false:
          return 'Secret';
        default:
          return '';
      }
    },
  },
};
</script>
