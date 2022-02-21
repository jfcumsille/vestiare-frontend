<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue';
import Counter from '@/components/Counter.vue';
import { useTranslation } from '@/locales';

const $t = useTranslation('views.home');
</script>

<template>
  <img
    alt="Vue logo"
    src="@/assets/images/logo.png"
    class="mx-auto"
  >
  <HelloWorld :msg="$t('title')" />
  <Counter />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
