<template>
  <div>
    <div class="2xl:px-8 2xl:py-8 2xl:py-4 pt-4 2xl:mb-8 mb-2">
      <div class="2xl:text-3xl xl:text-2xl lg:text-xl font-bold">
        Tu primer Link </div>
      <div class="2xl:text-2xl xl:text-xl lg:text-md font-semibold">
        Conectaste exitosamente tu primera cuenta y
        acabas de crear tu primer <b> Link </b>
        de Fintoc.
      </div>
    </div>
    <div class="flex flex-row items-center justify-center relative">
      <div class="bg-gray-100 ring-2 border-2 shadow-md text-center
                  text-lg text-black border-gray-200 py-4 rounded-sm my-8 px-8 mx-8">
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
      <div class="bg-opacity-50 rounded-sm 2xl:text-2xl
            xl:text-xl lg:text-md font-semibold">
        El id de tu Link solo se mostrara una vez, asi que guardalo bien! Cada cuenta
        que se conecta a Fintoc genera un id unico que puedes usar para probar nuestra API!
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
