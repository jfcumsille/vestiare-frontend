<script setup lang="ts">
import { useTranslation } from '@/locales';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';

const $t = useTranslation('views.organization.table.headers');
const headers = [
  '',
  $t('name'),
  $t('email'),
  $t('role'),
  $t('memberSince'),
  $t('status'),
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
