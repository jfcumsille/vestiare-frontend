<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import { computed, onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { useUserStore } from '@/stores/user';
import {
  useLocale,
  useLocaleChange,
  languageToLocale,
  localeToLanguage,
  SupportedLanguages,
} from '@/composables/locale';
import { SizeType } from '@/interfaces/utilities/enums';
import { page } from '@/services/analytics';
import { includes } from '@/utils/arrays';
import { DASHBOARD_ORIGIN, PROFILE_VIEWED } from '@/constants/analyticsEvents';
import GenericDropDown from '@/components/GenericDropDown.vue';

const $t = useTranslation('views.profile');
const userStore = useUserStore();

const locale = useLocale();
const changeLocale = useLocaleChange();

const changeLanguage = (newLanguage: string) => {
  if (includes(Object.values(SupportedLanguages), newLanguage)) {
    changeLocale(languageToLocale(newLanguage));
  }
};

const language = computed(() => localeToLanguage(locale.value));

onMounted(() => {
  page(PROFILE_VIEWED, {
    origin: DASHBOARD_ORIGIN,
  });
});
</script>

<template>
  <div
    data-test="profile-view"
    class="flex flex-col p-10 items-center max-w-screen-xl w-full"
  >
    <div class="flex flex-col w-full">
      <div class="font-bold text-3xl text-heading-color self-start mb-6">
        {{ $t('title') }}
      </div>
    </div>

    <div class="flex flex-row w-full text-body-color">
      <div class="p-6 w-158 min-w-lg bg-white rounded-lg drop-shadow border">
        <div class="grid grid-cols-2 gap-14 gap-x-0 mt-4 justify-center">
          <p class="my-auto font-medium">
            {{ $t('name') }}
          </p>
          <p class="text-sm">
            {{ userStore.user?.name }}
          </p>
          <p class="my-auto font-medium">
            {{ $t('lastname') }}
          </p>
          <p class="text-sm">
            {{ userStore.user?.lastName }}
          </p>

          <p class="my-auto font-medium">
            {{ $t('email') }}
          </p>
          <p class="text-sm">
            {{ userStore.user?.email }}
          </p>

          <p class="my-auto font-medium">
            {{ $t('password') }}
          </p>
          <p
            class="text-sm"
            v-html="$t('changePassword')"
          />

          <p class="my-auto font-medium">
            {{ $t('language') }}
          </p>
          <GenericDropDown
            :label="$t('language')"
            :size="SizeType.Medium"
            :selected="language"
            :options="Object.values(SupportedLanguages)"
            @select="changeLanguage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
