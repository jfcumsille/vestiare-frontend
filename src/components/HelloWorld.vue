<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from '@/locales';

const $t = useTranslation('views.home');
const $tCounter = useTranslation('counter');

const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
});

const count = ref(0);
</script>

<template>
  <h1>{{ props.msg }}</h1>

  <p>
    {{ $t('recommendation') }}
    <a
      href="https://code.visualstudio.com/"
      target="_blank"
    >VSCode</a>
    +
    <a
      href="https://github.com/johnsoncodehk/volar"
      target="_blank"
    >Volar</a>
  </p>

  <p>
    {{ $t('moreInfo.preCode') }}
    <code>{{ $t('moreInfo.code') }}</code>
    {{ $t('moreInfo.postCode') }}
  </p>

  <p>
    <a
      href="https://vitejs.dev/guide/features.html"
      target="_blank"
    >
      Vite Docs
    </a>
    |
    <a
      href="https://v3.vuejs.org/"
      target="_blank"
    >Vue 3 Docs</a>
  </p>

  <button
    type="button"
    @click="count++"
  >
    {{ $tCounter('declarativeValue') }}: {{ count }}
  </button>
  <p>
    {{ $t('hmr.preCode') }}
    <code>{{ $t('hmr.code') }}</code>
    {{ $t('hmr.postCode') }}
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
