<template>
  <div class="flex flex-col mt-6">
    <action-button tag="a" :href="googleAuthorizeUrl" :has-lock-icon="false">
      <template #icon>
        <inline-svg
          :src="require('../assets/icons/google-icon.svg')"
          class="fill-current" />
      </template>
      {{ actionButtonLabel }} con Google
    </action-button>
    <action-button tag="a" :href="githubAuthorizeUrl" class="mt-6" :has-lock-icon="false">
      <template #icon>
        <inline-svg
          :src="require('../assets/icons/github-icon.svg')"
          class="fill-current" />
      </template>
      {{ actionButtonLabel }} con Github
    </action-button>
  </div>
</template>

<script>
import ActionButton from '../components/actionButton.vue';
import apiClient from '../api';
import auth0Helper from '../helpers/auth0_helper';

export default {
  components: { ActionButton },
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
      if (this.signsUp) return '/signup';
      return '/login';
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
