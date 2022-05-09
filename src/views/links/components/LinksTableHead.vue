<script setup lang="ts">
import { useTranslation } from '@/locales';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';

const $t = useTranslation('views.links.table.headers');
const headers = [
  $t('institution'),
  $t('user'),
  $t('business'),
  $t('lastRefreshed'),
  $t('password'),
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
