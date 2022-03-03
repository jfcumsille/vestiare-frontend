<script setup lang="ts">
import { useTranslation } from '@/locales';

const $t = useTranslation('views.webhookEndpoints.table.headers');

const headers = [
  $t('url'),
  $t('description'),
  $t('subscribedEventsAmount'),
  $t('active'),
  '',
];
</script>

<template>
  <thead class="bg-gray-100">
    <tr>
      <th
        v-for="header in headers"
        :key="header"
        scope="col"
        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
      >
        {{ header }}
      </th>
    </tr>
  </thead>
</template>
