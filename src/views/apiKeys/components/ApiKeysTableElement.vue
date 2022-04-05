<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useTranslation } from '@/locales';
import { APIKey } from '@/interfaces/entities/apiKeys';
import { Mode } from '@/interfaces/utilities/enums';
import { formatDate, formatTime } from '@/utils/date';
import ThreeDots from '@/assets/svg/ThreeDots.vue';
import InfoIcon from '@/assets/svg/InfoIcon.vue';
import CopyIcon from '@/assets/svg/CopyIcon.vue';
import EyeIcon from '@/assets/svg/EyeIcon.vue';

const props = defineProps<{ apiKey: APIKey }>();
const emit = defineEmits<{
  (e: 'destroy-api-key'): void,
  (e: 'activate-secret-key'): void,
}>();

const $t = useTranslation('views.apiKeys.table.element');

const name = computed(() => {
  if (props.apiKey.isPublic) {
    return $t('publicKey');
  }
  return $t('secretKey');
});

const showKey = ref(false);
const toggleKey = () => {
  showKey.value = !showKey.value;
};

const copyKey = () => {
  navigator.clipboard.writeText(props.apiKey.token);
};

const activationRequired = computed(() => (props.apiKey.id === 'liveSecretKeyToActivate'));
const isLiveSecretKey = computed(() => (!props.apiKey.isPublic && props.apiKey.mode === Mode.Live));
const hideConfigKey = computed(() => (!isLiveSecretKey.value && activationRequired));

const showConfigKeysModal = ref(false);
const showConfigKeys = () => {
  showConfigKeysModal.value = true;
};
const configKeysModal = ref(null);
onClickOutside(configKeysModal, () => {
  showConfigKeysModal.value = false;
});

const handleDeleteKey = () => {
  emit('destroy-api-key');
  showConfigKeysModal.value = false;
};
const handleActivateKey = () => {
  emit('activate-secret-key');
};

const hoverInfoIcon = ref(false);
const hoverInfoText = ref(false);
const keyInfo = computed(() => (props.apiKey.isPublic ? $t('publicKeyInfo') : $t('secretKeyInfo')));
const handleEndHoverText = () => {
  hoverInfoText.value = false;
  hoverInfoIcon.value = false;
};

const handleStartHoverIcon = () => {
  hoverInfoIcon.value = true;
};

const handleEndHoverIcon = () => {
  if (!hoverInfoText.value) {
    hoverInfoIcon.value = false;
  }
};
</script>

<template>
  <tr
    class="px-5 border-b text-body-txt-color font-light
    whitespace-nowrap"
  >
    <td class="px-5 py-7 text-md h-full">
      <div class="flex flex-row items-center">
        {{ name }}
        <div
          @mouseover="handleStartHoverIcon"
          @mouseleave="handleEndHoverIcon"
        >
          <InfoIcon class="h-10 ml-2" />
          <div
            v-show="hoverInfoIcon"
            class="
                absolute left-0 ml-36 -mt-2 px-3 py-2 break-words max-w-xxs whitespace-normal
                bg-white rounded-md border border-bg-gray-200 drop-shadow-md text-sm
              "
            @mouseover="hoverInfoText = true"
            @mouseleave="handleEndHoverText"
          >
            {{ keyInfo }}
          </div>
        </div>
      </div>
    </td>
    <td class="font-normal m-2">
      <button
        v-if="activationRequired"
        class="bg-primary-main hover:bg-primary-main-hover w-full px-5 py-3 rounded-md text-white"
        @click="handleActivateKey"
      >
        {{ $t('activateSecretKey') }}
      </button>
      <div
        v-else
        data-test="api-key-token"
        class="
          flex flex-row items-center bg-primary-surface
          px-5 py-4 rounded-md w-min-fit"
      >
        <div
          v-if="showKey"
          class="text-md truncate w-64"
        >
          {{ props.apiKey.token }}
        </div>
        <div
          v-else
          class="text-md font-bold w-64"
        >
          ••••••••••••••••••••••••••••••••••
        </div>
        <button
          data-test="eye-toggle"
          class="cursor-pointer ml-2 w-6 h-6 hover:opacity-75"
          @click="toggleKey"
        >
          <EyeIcon
            :crossed-out="showKey"
          />
        </button>
        <button
          class="ml-2 hover:opacity-75"
          @click="copyKey"
        >
          <CopyIcon class="w-5 h-5" />
        </button>
      </div>
    </td>
    <td class="p-5 text-sm text-body-txt-color whitespace-nowrap flex-col">
      <div v-if="props.apiKey && !activationRequired">
        <div>
          {{ formatDate(props.apiKey.createdAt) }}
        </div>
        <div class="text-xs">
          {{ formatTime(props.apiKey.createdAt) }}
        </div>
      </div>
      <div v-else>
        -
      </div>
    </td>
    <td class="justify-center w-10">
      <ThreeDots
        class="cursor-pointer h-6 w-full pl-1 pr-3"
        :class="{'hidden': hideConfigKey}"
        @click="showConfigKeys"
      />
    </td>
  </tr>
  <div
    v-if="showConfigKeysModal"
    ref="configKeysModal"
    class="
      absolute right-0 -mt-10 -mr-20 px-4 py-3
      bg-white rounded-md border border-bg-gray-200 drop-shadow-md
    "
  >
    <button
      class="text-primary-main hover:text-primary-main-hover"
      @click="handleDeleteKey"
    >
      {{ $t('delete') }} {{ name }}
    </button>
  </div>
</template>
