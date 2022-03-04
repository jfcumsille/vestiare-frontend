<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from '@/locales';
import { useUserStore } from '@/stores/user';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import type { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import GenericBadge from '@/components/GenericBadge.vue';

const $t = useTranslation('views.webhookEndpoints.table');

const $props = defineProps<{ webhookEndpoint: WebhookEndpoint }>();

const $userStore = useUserStore();
const $webhookEndpointsStore = useWebhookEndpointsStore();

const secret = ref<string | null>(null);
const loading = ref(false);

const revealWebhookEndpointSecret = async () => {
  if (!loading.value) {
    loading.value = true;
    secret.value = await $webhookEndpointsStore.getWebhookEndpointSecret(
      $userStore.defaultOrganizationId,
      $props.webhookEndpoint,
    );
    loading.value = false;
  }
};
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <p class="text-gray-900">
        {{ $t('headers.url') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-normal text-gray-600">
        {{ $props.webhookEndpoint.url }}
      </p>
    </td>
  </tr>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <p class="text-gray-900">
        {{ $t('headers.mode') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <GenericBadge
        :text="$props.webhookEndpoint.mode"
        class="capitalize"
        :color="$props.webhookEndpoint.mode === 'live' ? 'green' : 'yellow'"
      />
    </td>
  </tr>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <p class="text-gray-900">
        {{ $t('headers.active') }}?
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <GenericBadge
        :text="$props.webhookEndpoint.status === 'enabled' ? 'active' : 'inactive'"
        class="capitalize"
        :color="$props.webhookEndpoint.status === 'enabled' ? 'green' : 'red'"
      />
    </td>
  </tr>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <p class="text-gray-900">
        {{ $t('headers.webhookEndpointSecret') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p v-if="secret">
        {{ secret }}
      </p>
      <a
        v-else
        class="
          px-4 py-2 rounded-md cursor-pointer
          text-blue-600 bg-blue-700/20 hover:bg-blue-700/10
        "
        @click="revealWebhookEndpointSecret"
      >{{ $t('buttons.revealWebhookEndpointSecret') }}</a>
    </td>
  </tr>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <p class="text-gray-900">
        {{ $t('headers.description') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-normal text-gray-600">
        {{ $props.webhookEndpoint.description }}
      </p>
    </td>
  </tr>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <p class="text-gray-900">
        {{ $t('headers.types') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p
        v-for="event in $props.webhookEndpoint.enabledEvents"
        :key="event"
        class="font-normal text-gray-600"
      >
        {{ event }}
      </p>
    </td>
  </tr>
</template>
