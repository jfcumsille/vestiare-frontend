<script setup lang="ts">
import { useTranslation } from '@/locales';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';

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
  <TableHead>
    <TableHeader
      v-for="header in headers"
      :key="header"
      :header="header"
    >
      <div> {{ header }} </div>
    </TableHeader>
  </TableHead>
</template>
