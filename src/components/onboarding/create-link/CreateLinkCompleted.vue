<template>
  <div>
    <div class="2xl:px-8 2xl:py-8 2xl:py-4 pt-4 2xl:mb-8 mb-2">
      <div class="2lg:text-md sm:text-md text-sm font-bold">
        Tu primer Link
      </div>
      <div class="2xl:text-2xl xl:text-xl lg:text-md md:text-md text-sm
        text-justify">
        Conectaste exitosamente tu primera cuenta y
        acabas de crear tu primer <span class="font-semibold"> Link </span>
        de Fintoc.
      </div>
    </div>
    <div class="flex flex-row items-center justify-center relative">
      <div class="bg-gray-100 ring-2 border-2 shadow-md text-center
                text-black border-gray-200 rounded-sm
                  sm:py-4 sm:my-8 sm:px-8 py-2 px-2 sm:mx-8 my-4
                  md:text-md sm:text-sm text-xs">
        <span class="font-bold py-2">
          Link
        </span>
        <span class="cursor-pointer" @click="copyToClipboard">
          {{ this.link.temporaryLinkToken }}
          </span>
        <input type="hidden" id="copy" :value="this.link.temporaryLinkToken">
      </div>
    </div>
    <div class="2xl:px-8 2xl:py-8 2xl:py-4 text-center 2xl:mb-8 mb-2">
      <div class="bg-opacity-50 rounded-sm 2xl:text-2xl text-sm
            xl:text-xl lg:text-md text-justify">
        Cada cuenta que conectes a Fintoc genera un identificador unico que puedes usar para
        probar nuestra API!
      </div>
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
