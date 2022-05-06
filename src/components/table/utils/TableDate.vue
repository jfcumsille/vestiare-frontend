<script setup lang="ts">
import { formatDate, formatTime } from '@/utils/date';

const props = defineProps<{
  dateString?: string,
}>();
</script>

<template>
  <div class="font-normal whitespace-nowrap">
    <div v-if="props.dateString">
      <div class="text-sm text-body-color">
        {{ formatDate(props.dateString) }}
      </div>
      <div class="text-xs text-secondary-color">
        {{ formatTime(props.dateString) }}
      </div>
    </div>
    <div v-else>
      –
    </div>
  </div>
</template>
