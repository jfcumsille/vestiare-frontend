<template>
  <div class="flex flex-col mt-6">
    <a
      :href="googleAuthorizeUrl"
      class="mt-6 group relative w-full flex justify-center py-4 px-4 border
              border-transparent text-sm leading-5 font-medium rounded-md
              text-white bg-main focus:outline-none transition duration-150
              ease-in-out focus:opacity-50">
      <span
        class="absolute left-0 inset-y-0 flex items-center
                pl-3 text-white opacity-25 transition
                ease-in-out duration-150">
        <div class="h-5 w-5">
          <inline-svg
            :src="require('../assets/icons/google-icon.svg')"
            class="fill-current" />
        </div>
      </span>
      {{ actionButtonLabel }} con Google
    </a>

    <a
      :href="githubAuthorizeUrl"
      class="mt-6 group relative w-full flex justify-center py-4 px-4 border
              border-transparent text-sm leading-5 font-medium rounded-md
              text-white bg-main focus:outline-none transition duration-150
              ease-in-out focus:opacity-50">
      <span
        class="absolute left-0 inset-y-0 flex items-center
                pl-3 text-white opacity-25 transition
                ease-in-out duration-150">
        <div class="h-5 w-5">
          <inline-svg
            :src="require('../assets/icons/github-icon.svg')"
            class="fill-current" />
        </div>
      </span>
      {{ actionButtonLabel }} con Github
    </a>
  </div>
</template>

<script>
import apiClient from '../api';
import auth0Helper from '../helpers/auth0_helper';

export default {
  props: {
    signsUp: { type: Boolean, default: false },
  },
  data() {
    return { verifier: auth0Helper.generateVerifier() };
  },
  computed: {
    googleAuthorizeUrl() {
      return auth0Helper.authorizationUri(this.callbackPath, this.challenge, 'google-oauth2');
    },
    githubAuthorizeUrl() {
      return auth0Helper.authorizationUri(this.callbackPath, this.challenge, 'github');
    },
    challenge() {
      return auth0Helper.generateChallenge(this.verifier);
    },
    redirectedFromAuth0() {
      return !!this.$route.query.code;
    },
    callbackPath() {
      if (this.signsUp) return 'signup';
      return 'login';
    },
    actionButtonLabel() {
      if (this.signsUp) return 'Registrarse';
      return 'Login';
    },
  },
  methods: {
    async getOAuthJWT(verifier) {
      this.$emit('start-loading');
      const { code } = this.$route.query;

      try {
        const { data } = await apiClient.auth0.getOAuthJWT(code, verifier);
        this.$emit('set-token', data.idToken);
        this.$emit('submit');
      } catch (err) {
        this.$emit('stop-loading');
        window.history.pushState('', '', '/login');
      }
    },
    retrieveAndReplaceAuth0Verifier() {
      const lastVerifier = localStorage.getItem('a0-x-verifier');
      localStorage.setItem('a0-x-verifier', this.verifier);
      return lastVerifier;
    },
  },
  async mounted() {
    const lastVerifier = this.retrieveAndReplaceAuth0Verifier();

    if (this.redirectedFromAuth0) await this.getOAuthJWT(lastVerifier);
  },
};
</script>
