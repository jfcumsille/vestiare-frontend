<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';
import { AxiosError } from 'axios';
import { HOME_ROUTE } from '@/constants/router';
import LoginView from './components/LoginView.vue';
import ExpiredView from './components/ExpiredView.vue';

const router = useRouter();

const route = useRoute();
const token = route.params.token;
const organizationUser = ref<Nullable<OrganizationUser>>(null);
const loading = ref(false);
const expiredTokenError = ref(false);

const handleTokenError = (error: AxiosError) => {
  if (error.response?.data.error.code === 'expired_token') {
    expiredTokenError.value = true;
  } else {
    router.push(HOME_ROUTE);
  }
};

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
  <h1 v-if="loading">
    You have been invited to this org with token {{ token }}
  </h1>
  <LoginView
    v-if="!loading && organizationUser"
    :organization-user="organizationUser"
  />
  <ExpiredView v-if="expiredTokenError" />
  <!-- <ManualSignup v-if="status==='signup'" />
  <OrgRole v-if="status==='orgRole'" /> -->
</template>
