<template>
<div class="flex flex-col items-center justify-content">
  <div v-for="mode in ['live', 'test']" v-bind:key='mode'
  class="mt-6 rounded border-gray-300 w-96 min-width pb-6">
    <table class="rounded">
      <thead class="bg-gray-100 border">
        <tr>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4
                    font-medium text-gray-800 uppercase tracking-wider w-4/6">
            {{ mode }} Keys
          </th>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                    font-medium text-gray-600 uppercase tracking-wider w-1/6">
            Tipo
          </th>
          <th class="px-6 py-2 border-b border-gray-200 bg-gray-50 w-1/6"></th>
        </tr>
      </thead>
      <tbody class="bg-white border">
        <tr v-for='apiKey in apiKeysByMode(mode)' v-bind:key='apiKey.id'>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-4/6">
            <div class="flex w-4/5">
              <div class="api-key h-10 text-white
                          bg-main py-2 px-4 rounded-md text-md
                          rounded-r-none tracking-wider">
                {{ apiKey.key }}
              </div>
              <div class="flex-none bg-main focus:outline-none hover:opacity-75 rounded-r-md">
                <button v-clipboard:copy='apiKey.key'
                        class="text-lg py-2 px-3 focus:outline-none text-white h-10">
                  <font-awesome-icon icon="copy"/>
                </button>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6">
            <div
              class="text-md font-regular text-gray-900 w-20 h-10
                    text-center bg-gray-200 py-2 px-2 rounded-md"
            >
              {{ mapApiKeyType(apiKey.isPublic) }}
            </div>
          </td>
          <td class="h-10
                     border-gray-200 text-sm leading-5 font-medium w-1/6">
            <button v-if="mode !== 'test'" @click="destroyApiKey(apiKey.id)"
              class="px-4 py-2 inline-flex text-md leading-5 font-regular rounded-md bg-red-200
                     text-red-900 hover:bg-red-300 align-middle">
              <font-awesome-icon icon="trash" class="mt-1 mr-1 h-3 align-middle"/>Borrar
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
  max-width: 750px;
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

<style>
.min-width {
  min-width: 1100px;
}
</style>
