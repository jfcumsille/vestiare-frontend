<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTranslation } from '@/locales';
import { APIKey } from '@/interfaces/entities/apiKeys';
import ThreeDots from '@/components/images/ThreeDots.vue';
// import InfoIcon from '@/components/images/InfoIcon.vue';
import CopyIcon from '@/components/images/CopyIcon.vue';
import EyeIcon from '@/components/images/EyeIcon.vue';

const props = defineProps<{ apiKey: APIKey }>();
const emit = defineEmits<{
  (e: 'open-modal', key: APIKey, name: string): void,
  (e: 'activate-secret-key'): void,
}>();

const $t = useTranslation('views.apiKeys.table.element');

// const hoverInfoIcon = ref(false);
// const hoverInfoText = ref(false);
const isActivateLiveSecretKey = computed(() => (props.apiKey.id === 'liveSecretKeyToActivate'));
const isLiveSecretKey = computed(() => (!props.apiKey.isPublic && props.apiKey.mode === 'live'));
const name = computed(() => {
  if (props.apiKey.isPublic) {
    return $t('publicKey');
  }
  return $t('secretKey');
});

// const keyInfo = computed(() => {
//   if (props.apiKey.isPublic) {
//     return $t('publicKeyInfo');
//   }
//   return $t('secretKeyInfo');
// });

// const createdDate = ref('Dec 05 2022');
// const createdTime = ref('14:45');

const showKey = ref(false);
const toggleKey = () => {
  showKey.value = !showKey.value;
};

const copyKey = () => {
  navigator.clipboard.writeText(props.apiKey.token);
};

const showModalConfigKeys = ref(false);
const handleConfigKeys = () => {
  showModalConfigKeys.value = !showModalConfigKeys.value;
};

const handleDeleteKey = () => {
  emit('open-modal', props.apiKey, name.value);
  showModalConfigKeys.value = false;
};
const handleActivateKey = () => {
  emit('activate-secret-key');
};

// const handleEndHoverText = () => {
//   hoverInfoText.value = false;
//   hoverInfoIcon.value = false;
// };

// const handleEndHoverIcon = () => {
//   if (!hoverInfoText.value) {
//     hoverInfoIcon.value = false;
//   }
// };
</script>

<template>
  <tr
    class="px-5 border-b text-body-txt-color font-light
    whitespace-nowrap"
  >
    <td class="px-5 py-7 text-md h-full">
      <div class="flex flex-row items-center">
        {{ name }}
        <!-- <div
          @mouseover="hoverInfoIcon = true"
          @mouseleave="handleEndHoverIcon"
        >
          <InfoIcon class="ml-2" />
          <div
            v-show="hoverInfoIcon"
            class="
                absolute left-0 ml-32 mt-2 p-2 break-words w-40
                bg-red-200 rounded-md border border-bg-gray-200 drop-shadow-md pr-10 inline-block
              "
            @mouseover="hoverInfoText = true"
            @mouseleave="handleEndHoverText"
          >
            {{ keyInfo }}
          </div>
        </div> -->
      </div>
    </td>
    <td class="font-normal m-2">
      <div
        v-if="!isActivateLiveSecretKey"
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
          v-if="!showKey"
          class="text-md font-bold w-64"
        >
          ••••••••••••••••••••••••••••••••••
        </div>
        <EyeIcon
          class="cursor-pointer ml-2 w-6 h-6 hover:opacity-75"
          :crossed-out="showKey"
          @click="toggleKey"
        />
        <button
          class="ml-2 hover:opacity-75"
          @click="copyKey"
        >
          <CopyIcon class="w-5 h-5" />
        </button>
      </div>
      <button
        v-if="isActivateLiveSecretKey"
        class="bg-primary-main hover:bg-primary-main-hover w-full px-5 py-3 rounded-md text-white"
        @click="handleActivateKey"
      >
        {{ $t('activateSecretKey') }}
      </button>
    </td>
    <!-- <td class="px-5 py-4">
      <p class="text-md">
        {{ createdDate }}
      </p>
      <p class="text-sm">
        {{ createdTime }}
      </p>
    </td> -->
    <td
      v-if="!isActivateLiveSecretKey && isLiveSecretKey"
      class="pl-3"
      @click="handleConfigKeys"
    >
      <button>
        <ThreeDots />
      </button>
    </td>
  </tr>
  <div
    v-if="showModalConfigKeys"
    class="
      absolute right-0 -mt-6 -mr-16 px-4 py-3
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
