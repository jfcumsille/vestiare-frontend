<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import { useTranslation } from '@/locales';
import { useUserStore } from '@/stores/user';

const $t = useTranslation('views.profile');
const userStore = useUserStore();
</script>
<template>
  <div
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
          <p class="font-medium">
            {{ $t('name') }}
          </p>
          <p class="text-sm">
            {{ userStore.user?.name }}
          </p>
          <p class="font-medium">
            {{ $t('lastname') }}
          </p>
          <p class="text-sm">
            {{ userStore.user?.lastName }}
          </p>

          <p class="font-medium">
            {{ $t('email') }}
          </p>
          <p class="text-sm">
            {{ userStore.user?.email }}
          </p>

          <p class="font-medium">
            {{ $t('password') }}
          </p>
          <p
            class="text-sm"
            v-html="$t('changePassword')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
