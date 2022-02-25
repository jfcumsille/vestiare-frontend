<script setup lang="ts">
import { rutFormat } from 'rut-helpers';
import { useUserStore } from '@/stores/user';
import { useLinksStore } from '@/stores/links';
import { Link } from '@/api/interfaces/links';
import GenericToggle from '@/components/GenericToggle.vue';

const $props = defineProps<{ link: Link }>();

const $userStore = useUserStore();
const $linksStore = useLinksStore();

const removeLink = () => {
  $linksStore.removeLink($userStore.defaultOrganizationId, $props.link);
};
</script>

<template>
  <tr class="bg-white border-b">
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-gray-900">
        {{ $props.link.holderName }}
      </p>
      <p class="font-normal text-gray-600">
        {{ rutFormat($props.link.holderId) }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-medium">
        {{ $props.link.institution.name }}
      </p>
      <p class="font-normal">
        {{ $props.link.holderType }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      {{ $props.link.lastTimeRefreshed || '-' }}
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      {{ $props.link.mode }}
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <GenericToggle
        :active="$props.link.active"
      />
    </td>
    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
      <a
        class="text-red-600 cursor-pointer hover:underline"
        @click="removeLink"
      >Remove</a>
    </td>
  </tr>
</template>
