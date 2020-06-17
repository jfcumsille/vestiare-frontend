<template>
<table class="min-w-full">
  <thead class="bg-gray-100">
    <tr>
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                 font-medium text-gray-600 uppercase tracking-wider">
        Key
      </th>
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                 font-medium text-gray-600 uppercase tracking-wider">
        Tipo
      </th>
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
    </tr>
  </thead>
  <tbody class="bg-white">
    <tr v-for='apiKey in userApiKeys' v-bind:key='apiKey.id'>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="flex">
          <div class="api-key
                      bg-teal-200 py-3 px-4 rounded-md text-lg text-gray-900
                      rounded-r-none tracking-wider">
            {{ apiKey.key }}
          </div>
          <div class="flex-none bg-teal-200 rounded-r-md h-full">
            <button v-clipboard:copy='apiKey.key'
                    class="hover:bg-teal-300 text-lg py-3 px-3">
              <font-awesome-icon icon="copy"/>
            </button>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div
          class="text-lg font-regular text-gray-900 w-24
                 text-center bg-gray-200 py-3 px-4 rounded-md"
        >
          {{ mapApiKeyType(apiKey.isPublic) }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5
                 font-medium">
        <button @click="destroyApiKey(apiKey.id)"
           class="ml-6 px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-red-200
                  text-red-900 hover:bg-red-300">
          <font-awesome-icon icon="trash" class="mt-1 mr-1"/> Borrar
        </button>
      </td>
    </tr>
  </tbody>
</table>
</template>

<style scoped>
.api-key {
  width: 800px;
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
          return 'Pública';
        case false:
          return 'Privada';
        default:
          return '';
      }
    },
  },
};
</script>
