<script setup lang="ts">
import { useTranslation } from '@/locales';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import TableFilter from '@/components/table/utils/TableFilter.vue';

const $t = useTranslation('views.links.table');

const emit = defineEmits<{(e: 'open'): void }>();

const openFilter = (value: string) => {
  emit('open', value);
};
</script>

<template>
  <TableHead>
    <TableHeader><div> {{ $t('headers.institution') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.user') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.business') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.lastRefreshed') }} </div></TableHeader>
    <TableHeader>
      <TableFilter
        :label="$t('headers.password')"
        @toggle="openFilter('password')"
      />
    </TableHeader>
    <TableHeader>
      <TableFilter
        :label="$t('headers.active')"
        @toggle="openFilter('active')"
      />
    </TableHeader>
    <TableHeader><div /></TableHeader>
  </TableHead>
</template>
