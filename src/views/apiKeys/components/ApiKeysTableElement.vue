<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useTranslation } from '@/locales';
import { APIKey } from '@/interfaces/entities/apiKeys';
import { Mode, ButtonType } from '@/interfaces/utilities/enums';
import { formatDate, formatTime } from '@/utils/date';
import GenericButton from '@/components/GenericButton.vue';
import ThreeDots from '@/assets/svg/ThreeDots.vue';
import InfoIcon from '@/assets/svg/InfoIcon.vue';

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
const toggleShowConfigKeys = () => {
  showConfigKeysModal.value = !showConfigKeysModal.value;
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
    class="px-5 border-b text-body-color font-light
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
                bg-white rounded-lg border border-bg-gray-200 drop-shadow-md text-sm
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
      <GenericButton
        v-if="activationRequired"
        data-test="activate-key-button"
        :type="ButtonType.Primary"
        :is-width-full="true"
        :text="$t('activateSecretKey')"
        @click="handleActivateKey"
      />
      <div
        v-else
        data-test="api-key-token"
        class="
          flex flex-row items-center
          rounded-lg w-min-fit"
      >
        <div
          v-if="showKey"
          class="px-4 py-2 text-md rounded-lg truncate w-72 bg-primary-surface"
        >
          {{ props.apiKey.token }}
        </div>
        <div
          v-else
          class="px-4 py-2 text-md rounded-lg font-bold w-72 bg-primary-surface"
        >
          •••••••••••••••••••••••••••••••••••
        </div>
        <GenericButton
          data-test="eye-toggle"
          class="ml-2"
          :icon-name="showKey ? 'eye' : 'eye_closed'"
          :type="ButtonType.Secondary"
          @click="toggleKey"
        />
        <GenericButton
          class="ml-2"
          icon-name="copy"
          :type="ButtonType.Secondary"
          @click="copyKey"
        />
      </div>
    </td>
    <td class="p-5 text-sm text-body-color whitespace-nowrap flex-col">
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
      <div ref="configKeysModal">
        <ThreeDots
          data-test="more-options-button"
          class="cursor-pointer h-6 w-full pl-1 pr-3"
          :class="{'hidden': hideConfigKey}"
          @click="toggleShowConfigKeys"
        />
        <div
          v-if="showConfigKeysModal"
          class="
            absolute right-0 -mr-20 px-4 py-3
            bg-white rounded-lg border border-light-gray drop-shadow-md
          "
        >
          <button
            data-test="delete-key-button"
            class="text-primary-main hover:text-primary-hover"
            @click="handleDeleteKey"
          >
            {{ $t('delete') }} {{ name }}
          </button>
        </div>
      </div>
    </td>
  </tr>
</template>
