<script setup lang="ts">
import { formatDate, formatTime } from '@/utils/date';
import { Nullable } from '@/interfaces/common';
import { useTranslation } from '@/locales';

const props = defineProps<{
  dateString: Nullable<string>,
}>();

const $t = useTranslation('date');
</script>

<template>
  <div class="font-normal whitespace-nowrap">
    <template v-if="props.dateString">
      <div class="text-sm text-body-color">
        {{ formatDate(props.dateString) }}
      </div>
      <div class="text-xs text-secondary-color">
        {{ formatTime(props.dateString) }}
      </div>
    </template>
    <div
      v-else
      class="flex flex-col text-disabled-color"
    >
      <p class="text-sm">
        {{ $t('day') }} {{ $t('month') }}
      </p>
      <p class="text-xs">
        {{ $t('time') }}
      </p>
    </div>
  </div>
</template>
