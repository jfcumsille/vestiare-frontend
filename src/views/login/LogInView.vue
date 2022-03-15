<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { REDIRECT_QUERY_KEY } from '@/constants';
import GenericInput from '@/components/GenericInput.vue';

const userStore = useUserStore();
const $t = useTranslation('forms.userData');

const route = useRoute();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref(false);
const loading = ref(false);

watch([email, password], () => { error.value = false; });

const logIn = async () => {
  loading.value = true;
  try {
    await userStore.logIn({ email: email.value, password: password.value });
    router.push({
      path: (route.query[REDIRECT_QUERY_KEY] as string) || '/',
    });
  } catch (err) {
    error.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="h-screen w-full flex justify-center">
    <div class="grow px-4 max-w-screen-md flex flex-col justify-center">
      <GenericInput
        v-model="email"
        :label="$t('labels.username')"
        :placeholder="$t('placeholders.username')"
        class="mb-4"
      />
      <GenericInput
        v-model="password"
        type="password"
        :label="$t('labels.password')"
        :placeholder="$t('placeholders.password')"
        class="mb-4"
      />
      <div>
        <button
          class="
            inline-flex items-center px-6 py-2 text-sm font-medium text-center
            rounded text-rose-100 bg-blue-500 hover:bg-blue-600
            disabled:opacity-75 disabled:cursor-default
          "
          :disabled="loading"
          @click="logIn"
        >
          {{ $t('logIn') }}
        </button>
        <span
          v-if="error"
          class="ml-4 font-black text-xl text-red-600"
        >
          !
        </span>
      </div>
    </div>
  </div>
</template>
