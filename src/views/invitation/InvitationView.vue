<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';
import LoginView from './components/LoginView.vue';

const route = useRoute();
const token = route.params.token;
const organizationUser = ref<Nullable<OrganizationUser>>(null);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    organizationUser.value = await api.invitations.get(token as string);
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
  <!-- <ExpiredView v-if="status==='expired'" />
  <ManualSignup v-if="status==='signup'" />
  <OrgRole v-if="status==='orgRole'" /> -->
</template>
