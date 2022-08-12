<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import { ref } from 'vue';
import { useTranslation } from '@/locales';
import { ButtonType } from '@/interfaces/utilities/enums';
import { Nullable } from '@/interfaces/common';
import { DOCS_LINK_TOKEN } from '@/constants/urls';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import GenericButton from '@/components/GenericButton.vue';
import GenericModal from '@/components/GenericModal.vue';

const $t = useTranslation('views.links.newLinkModal');
const $tButtons = useTranslation('buttons');

const props = defineProps<{
  loading: boolean,
  linkToken: Nullable<string>,
}>();

const emit = defineEmits<{(e: 'close'): void}>();

const BUTTON_CHANGE_TIMEOUT_SECONDS = 3;

const buttonText = ref($tButtons('copy'));
const buttonType = ref(ButtonType.Primary);
let buttonTimeoutId = null as Nullable<ReturnType<typeof setTimeout>>;

const close = () => {
  emit('close');
};

const setButtonStateToCopy = () => {
  buttonText.value = $tButtons('copy');
  buttonType.value = ButtonType.Primary;
  if (buttonTimeoutId) {
    clearTimeout(buttonTimeoutId);
  }
};

const setButtonStateToCopied = () => {
  buttonText.value = $tButtons('copied');
  buttonType.value = ButtonType.Secondary;
  if (buttonTimeoutId) {
    clearTimeout(buttonTimeoutId);
  }
  buttonTimeoutId = setTimeout(setButtonStateToCopy, BUTTON_CHANGE_TIMEOUT_SECONDS * 1000);
};

const copyKey = () => {
  if (props.linkToken) {
    navigator.clipboard.writeText(props.linkToken);
    setButtonStateToCopied();
  }
};
</script>

<template>
  <GenericModal
    :title="$t('title')"
    @close="close"
  >
    <div class="space-y-3">
      <div class="text-left">
        <p class="inline-block pr-4 font-light text-body-color">
          {{ $t('subtitle') }}
        </p>
        <a
          class="text-primary-main hover:text-primary-hover font-normal cursor-pointer"
          :href="DOCS_LINK_TOKEN"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('learnMore') }}
        </a>
      </div>
      <div class="flex flex-row bg-warning-surface p-2 rounded-lg">
        <WarningIcon class="mt-1 ml-1 min-w-16px max-w-16px" />
        <div
          class="ml-2 text-body-color font-normal text-sm"
          v-html="$t('warning')"
        />
      </div>
      <div class="flex flex-row bg-primary-surface rounded-lg px-4 py-2">
        <div class="font-light text-body-color">
          <code v-if="!props.loading">
            {{ props.linkToken }}
          </code>
          <code v-else>
            {{ $t('loading') }}
          </code>
        </div>
      </div>
      <div class="flex flex-row justify-end">
        <GenericButton
          class="ml-2"
          icon-name="copy"
          :disabled="props.loading"
          :text="buttonText"
          :type="buttonType"
          @click="copyKey"
        />
      </div>
    </div>
  </GenericModal>
</template>
