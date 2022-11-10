<script setup lang="ts">
import { DOCS_PAYMENTS } from '@/constants/urls';
</script>

<template>
  <div
    data-test="payments-view"
    class="flex items-center p-10"
  >
    <div>
      <div class="font-medium text-2xl text-heading-color self-start">
        Payment Intents
      </div>
      <div class="flex flex-row justify-between items-center py-2 self-start">
        <a
          class="text-primary-main text-sm"
          :href="DOCS_PAYMENTS"
          target="_blank"
          rel="noopener noreferrer"
        >
          ¿What are Payment Intents?
        </a>
      </div>
    </div>
  </div>
</template>
