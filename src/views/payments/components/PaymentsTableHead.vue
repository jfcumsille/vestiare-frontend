<script setup lang="ts">
import { useTranslation } from '@/locales';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';

const $t = useTranslation('views.payments.table');

</script>

<template>
  <TableHead>
    <TableHeader><div> {{ $t('headers.fintocId') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.creationDate') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.sender') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.senderAccount') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.amount') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.status') }} </div></TableHeader>
  </TableHead>
</template>
