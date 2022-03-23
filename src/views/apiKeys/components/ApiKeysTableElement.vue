<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { APIKey } from '@/interfaces/entities/apiKeys';
// import ThreeDots from '@/components/images/ThreeDots.vue';
import InfoIcon from '@/components/images/InfoIcon.vue';
// import CopyIcon from '@/components/images/CopyIcon.vue';
// import EyeIcon from '@/components/images/EyeIcon.vue';

const props = defineProps<{ apiKey: APIKey }>();

const $t = useTranslation('views.apiKeys.table.element');

const name = computed(() => {
  if (props.apiKey.isPublic) {
    return $t('publicKey');
  }
  return $t('secretKey');
});

// const createdDate = ref('Dec 05 2022');
// const createdTime = ref('14:45');
// const lastUpdatedDate = ref('Dec 11 2022');
// const lastUpdatedTime = ref('09:23');
</script>

<template>
  <tr
    class="px-5 border-b text-body-txt-color font-light
    whitespace-nowrap"
  >
    <td class="px-5 py-7 text-md h-full">
      <div class="flex flex-row items-center">
        {{ name }}
        <InfoIcon class="ml-2" />
      </div>
    </td>
    <td class="font-normal m-2">
      <div
        class="
          flex flex-row items-center bg-primary-surface
          px-5 py-4 rounded-md w-min-fit mr-4"
      >
        <!-- <div class="text-md truncate w-64"> -->
        <div class="text-md">
          {{ props.apiKey.token }}
        </div>
        <!-- <EyeIcon class="ml-2" />
        <button
          :click="copyDivToClipboard"
          class="ml-2"
        >
          <CopyIcon class="ml-2" />
        </button> -->
      </div>
    </td>
    <!-- <td class="px-5 py-4">
      <p class="text-md">
        {{ createdDate }}
      </p>
      <p class="text-sm">
        {{ createdTime }}
      </p>
    </td>
    <td class="px-5 py-4">
      <p class="text-md">
        {{ lastUpdatedDate }}
      </p>
      <p class="text-sm">
        {{ lastUpdatedTime }}
      </p>
    </td>
    <td>
      <ThreeDots />
    </td> -->
  </tr>
</template>
