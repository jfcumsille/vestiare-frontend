<template>
<table class="min-w-full">
  <thead class="bg-gray-100">
    <tr>
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                 font-medium text-gray-600 uppercase tracking-wider">
        ID
      </th>
      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                 font-medium text-gray-600 uppercase tracking-wider">
        Key
      </th>
    </tr>
  </thead>
  <tbody class="bg-white">
    <tr v-for='apiKey in this.$store.getters.userApiKeys' v-bind:key='apiKey.id'>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="text-sm leading-5 font-medium text-gray-900">{{ apiKey.id }}</div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div class="text-lg leading-5 text-gray-900">{{ apiKey.key }}</div>
      </td>
    </tr>
  </tbody>
</table>
</template>
