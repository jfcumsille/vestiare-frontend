<script setup lang="ts">
import { useTranslation } from '@/locales';
import RightArrow from '@/assets/svg/RightArrow.vue';
import { WEBHOOK_EXAMPLE } from '@/exampleObjects/webhook';

const $t = useTranslation('views.webhookEndpoints');

</script>

<template>
  <div class="flex self-start pt-4 w-full">
    <div
      class="text-center w-4/5 min-w-min bg-white rounded-lg drop-shadow-md px-10"
    >
      <div class="m-6 text-body-color font-bold">
        {{ $t('emptyView.noWebhookEndpointsFound') }}
      </div>
      <div class="flex justify-center w-full gap-x-2 mb-12">
        <div class="max-w-xs">
          <p class="text-sm font-normal text-body-color">
            {{ $t('emptyView.externalFront') }}
          </p>
          <div
            class="
            bg-divider-color text-black rounded-lg shadow px-4 py-4
              text-xs font-normal h-20 w-32 flex items-center
          "
          >
            {{ $t('emptyView.customerChanges') }}
          </div>
        </div>
        <RightArrow class="mt-12" />
        <div class="max-w-xs">
          <p class="text-sm font-normal text-body-color">
            Fintoc
          </p>
          <div
            class="
            bg-primary-border text-white rounded-lg shadow px-6 py-4
              text-xs font-normal h-20 w-42 flex items-center
            "
          >
            link.credentials_changed
          </div>
        </div>
        <RightArrow class="mt-12" />
        <div class="max-w-xs">
          <p class="text-sm font-normal text-body-color">
            {{ $t('emptyView.yourBackend') }}
          </p>
          <div
            class="bg-disabled-color text-white rounded-lg shadow p-4 text-3xs font-thin text-left"
          >
            <pre>{{ JSON.stringify(WEBHOOK_EXAMPLE, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
