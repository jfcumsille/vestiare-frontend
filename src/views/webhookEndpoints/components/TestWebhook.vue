<script setup lang="ts">
import { ref } from 'vue';
import type { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import GenericDropDown from '@/components/GenericDropDown.vue';

const props = defineProps<{ webhookEndpoint: WebhookEndpoint }>();

const selectedEvent = ref<string>(props.webhookEndpoint.enabledEvents[0]);

const selectEvent = (event: string) => {
  selectedEvent.value = event;
};
</script>

<template>
  <h2 class="text-2xl">
    Test Webhook
  </h2>
  <GenericDropDown
    :options="props.webhookEndpoint.enabledEvents"
    :selected="selectedEvent"
    @select="selectEvent"
  />
</template>
