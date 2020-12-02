<template>
  <div>
    <div class="flex flex-row items-center justify-center relative my-4">
      <div class="bg-gray-100 ring-2 border-2 shadow-md text-center overflow-x-scroll
                text-black border-gray-200 rounded-sm text-xs px-2 py-2 o">
        <span class="cursor-pointer" @click="copyToClipboard">
          {{ this.link.temporaryLinkToken }}
          </span>
        <input type="hidden" id="copy" :value="this.link.temporaryLinkToken">
      </div>
    </div>
    <div class="text-sm text-justify">
      Cada cuenta que conectes a Fintoc genera un identificador unico que puedes usar para
      probar nuestra API!
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      link: (state) => state.onboarding.link,
    }),
  },
  methods: {
    copyToClipboard() {
      const linkTextInput = document.querySelector('#copy');
      linkTextInput.setAttribute('type', 'text');
      linkTextInput.select();
      document.execCommand('copy');
      linkTextInput.setAttribute('type', 'hidden');
    },
  },
  nents: {
  },
};
</script>
