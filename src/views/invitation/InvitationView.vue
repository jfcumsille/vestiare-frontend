<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const token = route.params.token;
// on mounted check if invitation token is valid
</script>
<template>
  <h1>You have been invited to this org with token {{ token }}</h1>
  <!-- <LoginView v-if="status==='login'" />
  <ExpiredView v-if="status==='expired'" />
  <ManualSignup v-if="status==='signup'" />
  <OrgRole v-if="status==='orgRole'" /> -->
</template>
