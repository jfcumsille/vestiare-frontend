<script setup lang="ts">
import { useTranslation } from '@/locales';
import CopyIcon from '@/assets/svg/CopyIcon.vue';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import GenericModal from '@/components/GenericModal.vue';
import { DOCS_LINK_TOKEN } from '@/constants/texts';
import { Nullable } from '@/interfaces/common';

const $t = useTranslation('views.links.newLinkModal');

const props = defineProps<{
  loading: boolean,
  linkToken: Nullable<string>,
}>();

const emit = defineEmits<{(e: 'close'): void}>();

const close = () => {
  emit('close');
};

const copyKey = () => {
  if (props.linkToken) {
    navigator.clipboard.writeText(props.linkToken);
  }
};
</script>

<template>
  <GenericModal
    :title="$t('title')"
    @close="close"
  >
    <div class="space-y-5">
      <div class="flex flex-row bg-warning-surface p-2 rounded-md">
        <WarningIcon class="mt-1 ml-1" />
        <div class="ml-2 text-body-txt-color font-light">
          {{ $t('warning') }}
        </div>
      </div>
      <div class="ml-2 text-left text-body-txt-color font-light">
        {{ $t('subtitle') }}
        <a
          class="text-primary-main font-medium cursor-pointer"
          :href="DOCS_LINK_TOKEN"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('learnMore') }}
        </a>
      </div>
      <div class="flex flex-row justify-center relative">
        <div
          class="
            bg-gray-100 rounded-md px-4 py-2 min-w-sm
            text-center text-body-txt-color text-xs
          "
        >
          <code v-if="!loading">
            {{ props.linkToken }}
          </code>
          <code v-else>
            {{ $t('loading') }}
          </code>
          <button
            class="ml-2 hover:opacity-75"
            @click="copyKey"
          >
            <CopyIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </GenericModal>
</template>
