<template>
    <div class="h-screen flex-col flex items-center justify-center">
      <div class="relative modal-size rounded flex flex-col">
        <div class="p-4">
          <div class="flex flex-col justify-content items-center">
            <img class="img-size mb-4" :src="require('@/assets/images/fintoc-isologo.svg')" />

            <div class="text-lg text-center mb-10">
              We are not available in your country yet. 😞
            </div>
            <div class="text-md font-semibold font-sm text-center mb-6">
              Submit your email and we will email you when we are available in your country!
            </div>
          <div class="text-sm text-center text-red-500"> {{ err }}</div>
          <input
          v-model.trim="mail"
          class="border w-64 border-main h-10 px-6 mb-2
          rounded focus:border-main active:border-main focus:outline-none"
          placeholder="email" />
          <button v-if="!clicked" @click="addToWaitingList"
            class="bg-main w-64 h-10 text-white text-sm text-center
            flex flex-col items-center justify-center font-semibold text-md
            rounded focus:outline-none">
            <span v-if="showMessage"> Notify me when available! </span>
            <span v-if="showSpinner" class="flex flex-col items-center">
              <div class="loader ease-linear
              rounded-full border-2 border-t-2 h-6 w-6" /> </span>
            <span v-if="showDone"> Done </span>
          </button>
          <button v-if="clicked"
            class="bg-gray-400 text-main w-64 h-10 text-sm text-center
            flex flex-col items-center justify-center font-semibold text-md
            rounded focus:outline-none cursor-default">
            <span v-if="showDone"> Done </span>
          </button>

          </div>

        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  data() {
    return {
      mail: '',
      clicked: false,
      loading: false,
      err: '',
    };
  },
  computed: {
    ...mapState({
      country: (state) => state.auth.country,
    }),
    showMessage() {
      return !this.loading && !this.clicked;
    },
    showSpinner() {
      return this.loading;
    },
    showDone() {
      return !this.loading && this.clicked;
    },
    error() {
      return this.err !== '';
    },
  },
  mounted() {
    window.analytics.page('Unavailable Country', {
      country: this.country,
    });
  },
  methods: {
    async addToWaitingList() {
      if (this.mail.includes('@') && this.mail.includes('.')) {
        window.analytics.track('Unavailable Country Mail', {
          country: this.country,
          mail: this.mail,
        });
        this.err = '';
        this.loading = true;
        await sleep(3000);
        this.clicked = true;
        this.loading = false;
      } else {
        this.err = 'Use a valid email.';
      }
    },
  },
};
</script>

<style>

.img-size {
  height: 50px;
}

.modal-size {
  height: 600px;
  width: 400px;
}

.loader {
  border-color: #a6a6a6;
  border-top-color: white;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
