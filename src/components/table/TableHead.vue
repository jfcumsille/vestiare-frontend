<script setup lang="ts">
import TableRow from '@/components/table/TableRow.vue';
</script>

<template>
  <thead class="bg-light-gray">
    <TableRow>
      <slot />
    </TableRow>
  </thead>
</template>
