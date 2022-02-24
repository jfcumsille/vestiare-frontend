<script setup lang="ts">
import { Link } from '@/api/interfaces/links';

const $props = defineProps<{ link: Link }>();
</script>

<template>
  <tr class="bg-white border-b ">
    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
      {{ $props.link.holderName }}
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      {{ $props.link.institution.name }}
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      {{ $props.link.lastTimeRefreshed || '' }}
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      {{ $props.link.active ? 'Activo!' : 'Inactivo' }}
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      {{ $props.link.mode }}
    </td>
    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
      <a
        href="#"
        class="text-blue-600 hover:underline"
      >Edit</a>
    </td>
  </tr>
</template>
