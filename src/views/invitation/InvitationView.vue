<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { AxiosError } from 'axios';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { OrganizationUserInvitation } from '@/interfaces/entities/organizationUser';
import { HOME_ROUTE } from '@/constants/router';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import AcceptInviteView from './components/AcceptInviteView.vue';
import ExpiredView from './components/ExpiredView.vue';
import EmailSignup from './components/EmailSignup.vue';

const router = useRouter();
const route = useRoute();
const token = route.params.token;
const organizationUser = ref<Nullable<OrganizationUserInvitation>>(null);
const loading = ref(false);
const expiredTokenError = ref(false);

const handleTokenError = (error: AxiosError) => {
  if (error.response?.data.error.code === 'expired_token') {
    expiredTokenError.value = true;
  } else {
    router.push(HOME_ROUTE);
  }
};

const showEmailSignUp = ref(false);
const acceptInvitationWithEmail = () => {
  showEmailSignUp.value = true;
};

const isLoginView = computed(() => (
  !loading.value && !showEmailSignUp.value
));

const isEmailSignup = computed(() => (
  showEmailSignUp.value && !expiredTokenError.value
));

onMounted(async () => {
  loading.value = true;
  try {
    organizationUser.value = await api.invitations.get(token as string);
  } catch (err) {
    handleTokenError(err as AxiosError);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div
    v-if="loading"
    class="flex justify-center w-full h-96"
  >
    <LoadingSpinner class="mt-auto w-20 h-20" />
  </div>
  <AcceptInviteView
    v-if="isLoginView && organizationUser"
    :organization-user="organizationUser"
    @accept-invitation-with-email="acceptInvitationWithEmail"
  />
  <ExpiredView v-if="expiredTokenError" />
  <EmailSignup
    v-if="isEmailSignup && organizationUser"
    :organization-user="organizationUser"
  />
</template>
