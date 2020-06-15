<template>
<table class="min-w-full">
  <thead class="bg-gray-100">
    <tr>
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                 font-medium text-gray-600 uppercase tracking-wider">
        Banco
      </th>
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                 font-medium text-gray-600 uppercase tracking-wider">
        Rut
      </th>
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                 font-medium text-gray-600 uppercase tracking-wider">
        Número de cuentas
      </th>
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                 font-medium text-gray-600 uppercase tracking-wider">
        Modo
      </th>
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
    </tr>
  </thead>
  <tbody class="bg-white">
    <tr v-for='link in userLinks' v-bind:key='link.linkId'>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10">
            <img class="h-10 w-10 rounded-full" :src="link.bank.smallLogo" />
          </div>
          <div class="ml-4">
            <div class="text-sm leading-5 font-medium text-gray-900">{{ link.bank.label }}</div>
            <div class="text-sm leading-5 text-gray-600">
              {{ translatedHolderType(link.holderType) }}
            </div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="text-lg leading-5 text-gray-900">{{ link.rut | rutFilter}}</div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="text-lg leading-5 text-gray-900">
          <p type="password">{{ link.numberOfAccounts }}</p></div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="text-lg leading-5 text-gray-900">
          <div
            class="py-2 px-4 rounded-md w-16"
            :class="{ 'bg-green-200': link.mode === 'test',
                      'bg-blue-200': link.mode === 'live' }"
          >
            {{ link.mode }}
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5
                 font-medium">
        <a href="#" @click="destroyLink(link.linkId)"
           class="ml-6 px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-red-200
                     text-red-900 hover:bg-red-300">
          <font-awesome-icon icon="trash" class="mt-1 mr-1"/> Borrar
        </a>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'userLinks',
    ]),
  },
  methods: {
    destroyLink(linkId) {
      this.$store.dispatch('destroyUserLink', linkId).then(() => {
        window.analytics.track('Link Deleted', {
          link_id: linkId,
        });
      });
    },
    translatedHolderType(holderType) {
      return holderType === 'business' ? 'Empresas' : 'Personas';
    },
  },
};
</script>
