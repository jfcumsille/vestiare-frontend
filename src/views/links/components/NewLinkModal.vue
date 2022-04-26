<script setup lang="ts">
import { useTranslation } from '@/locales';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import GenericModal from '@/components/GenericModal.vue';
import { ButtonType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
import { DOCS_LINK_TOKEN } from '@/constants/urls';
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
        <WarningIcon class="mt-1 ml-1 min-w-16px max-w-16px" />
        <div class="ml-2 text-body-color font-light">
          {{ $t('warning') }}
        </div>
      </div>
      <div class="ml-2 text-left text-body-color font-light">
        {{ $t('subtitle') }}
        <a
          class="text-primary-main font-medium cursor-pointer hover:text-primary-hover"
          :href="DOCS_LINK_TOKEN"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('learnMore') }}
        </a>
      </div>
      <div class="flex flex-row justify-center items-center relative">
        <div
          class="
            bg-primary-surface rounded-md p-4 truncate
            text-center text-body-color text-xs
          "
        >
          <code v-if="!loading">
            {{ props.linkToken }}
          </code>
          <code v-else>
            {{ $t('loading') }}
          </code>
        </div>
        <GenericButton
          class="ml-2"
          image-name="copy"
          :type="ButtonType.Secondary"
          @click="copyKey"
        />
      </div>
    </div>
  </GenericModal>
</template>
