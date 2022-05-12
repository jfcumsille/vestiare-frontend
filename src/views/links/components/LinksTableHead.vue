<script setup lang="ts">
import { useTranslation } from '@/locales';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import TableFilter from '@/components/table/utils/TableFilter.vue';

const $t = useTranslation('views.links.table.headers');

const props = defineProps<{
  passwordOptions: Record<string, unknown>,
  activeOptions: Record<string, unknown>,
}>();
</script>

<template>
  <TableHead>
    <TableHeader><div> {{ $t('institution') }} </div></TableHeader>
    <TableHeader><div> {{ $t('user') }} </div></TableHeader>
    <TableHeader><div> {{ $t('business') }} </div></TableHeader>
    <TableHeader><div> {{ $t('lastRefreshed') }} </div></TableHeader>
    <TableHeader>
      <TableFilter
        :label="$t('password')"
        :options="props.passwordOptions"
      />
    </TableHeader>
    <TableHeader>
      <TableFilter
        :label="$t('active')"
        :options="props.activeOptions"
      />
    </TableHeader>
    <TableHeader><div /></TableHeader>
  </TableHead>
</template>
