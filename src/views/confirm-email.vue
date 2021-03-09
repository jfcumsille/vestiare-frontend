<template>
  <div class="min-h-screen flex flex-col">
    <spinner v-show='showSpinner'></spinner>
    <div v-show='!showSpinner' class="container mx-auto flex-1 flex flex-col items-center
        justify-center px-2 mt-10">
      <img class="mx-auto h-12 w-auto" src="../assets/images/fintoc-isologo.svg" alt="fintoc" />
      <h1 class="m-5 text-3xl text-center font-regular text-gray-900">
        ¡Gracias por confirmar tu correo!
      </h1>
      <h2 class="m-5 text-xl text-center font-regular text-gray-900">
        Ya puedes ingresar a la App.
      </h2>
      <action-button class="max-w-sm px-2"
        :has-lock-icon="false"
        @click.native="enterApplication"
        >
        Entrar a Fintoc
      </action-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Spinner from '../components/spinner.vue';
import actionButton from '../components/actionButton.vue';

export default {
  data() {
    return {
      showSpinner: true,
      userData: null,
    };
  },
  mounted() {
    this.confirmEmail();
  },
  components: {
    Spinner,
    actionButton,
  },
  methods: {
    ...mapActions(['saveSession']),
    trackUserConfirmedEvent() {
      window.analytics.track('User Email Confirmed');
    },
    async confirmEmail() {
      const formData = {
        confirmationToken: this.$route.query.confirmation_token,
      };
      this.showSpinner = true;
      await this.$store.dispatch('confirmEmail', formData)
        .then((response) => {
          this.showSpinner = false;
          this.userData = response;
        }).catch(() => {
          this.showSpinner = false;
          this.$router.push('/confirm-email/failed');
        });
    },
    trackUserLoggedInEvent() {
      window.analytics.track('User Logged In');
    },
    enterApplication() {
      this.saveSession(this.userData);
      this.trackUserLoggedInEvent();
      this.$router.push('/links');
    },
  },
};
</script>
