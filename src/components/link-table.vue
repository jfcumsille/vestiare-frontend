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
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
    </tr>
  </thead>
  <tbody class="bg-white">
    <tr v-for='link in this.$store.getters.userLinks' v-bind:key='link.linkId'>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10">
            <img v-if='link.bankName === "Banco Santander"'
                 class="h-10 w-10 rounded-full"
                 src="../assets/images/santander.png" />
            <img v-if='link.bankName === "Banco de Chile"'
                 class="h-10 w-10 rounded-full"
                 src="../assets/images/banco-chile.png" />
          </div>
          <div class="ml-4">
            <div class="text-sm leading-5 font-medium text-gray-900">{{ link.bankName }}</div>
            <div class="text-sm leading-5 text-gray-600">{{ link.holderType }}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="text-lg leading-5 text-gray-900">{{ link.rut }}</div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="text-lg leading-5 text-gray-900">
          <p type="password">{{ link.numberOfAccounts }}</p></div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5
                 font-medium">
        <a href="#" @click="destroyLink(link.linkId)"
           class="ml-6 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-red-200
                     text-red-900 hover:bg-red-300">
          <font-awesome-icon icon="trash" class="mt-1 mr-1"/> Borrar
        </a>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  methods: {
    destroyLink(linkId) {
      this.$store.dispatch('destroyUserLink', linkId);
    },
  },
};
</script>
