<template>
<div class="bg-gray-100 min-h-screen flex flex-col">
  <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <spinner v-if='showSpinner'></spinner>
    <div class="max-w-md w-full">
      <img class="mx-auto h-12 w-auto" src="../assets/images/fintoc-logo.png" alt="fintoc" />
      <div>
        <h1 class="mt-6 text-center text-4xl leading-9 font-regular text-gray-900">
          Escribe tu nueva contraseña
        </h1>
      </div>
      <div class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3
                      shadow-md mb-4 mt-4"
              role="alert"
              v-if='showError'>
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p class="font-semibold">Tuvimos un problema con cambiar tu contraseña</p>
            <p class="text-sm">
              Si el problema persiste escríbenos a elliot@fintoc.com. Respondemos muy rápido
            </p>
          </div>
        </div>
      </div>
      <form @submit.prevent="submitForm" class="mt-6">
        <input
            type="password"
            class="border border-gray-400 placeholder-gray-500 text-gray-900 w-full p-3
                  rounded-t-md focus:outline-none"
            name="password"
            placeholder="Contraseña"
            v-model.trim="$v.password.$model">
        <input
            type="password"
            class="border border-gray-400 placeholder-gray-500 text-gray-900 w-full p-3
                  rounded-b-md focus:outline-none border-t-0"
            name="passwordConfirmation"
            placeholder="Confirma contraseña"
            v-model.trim="$v.passwordConfirmation.$model">

        <div class="mt-6">
            <action-button
              :has-lock-icon="true"
              :invalid-form="$v.$invalid"
              >
              Recuperar contraseña
            </action-button>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div class="text-sm leading-5 flex items-end">
            <router-link
              to="/login"
              class="font-regular text-indigo-600 hover:text-indigo-800 focus:outline-none
                     focus:underline transition ease-in-out duration-150">
              ¿La recordaste? Login acá
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import Spinner from '../components/spinner.vue';
import actionButton from '../components/actionButton.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      showSpinner: false,
      showError: false,
    };
  },
  components: {
    actionButton,
    Spinner,
  },
  methods: {
    trackUserLoggedInEvent() {
      const userData = this.$store.getters.retrieveSessionFromStorage;
      window.analytics.identify(userData.userId, {
        email: userData.email,
      });
      window.analytics.track('User Logged In');
    },
    submitForm() {
      if (this.$v.$invalid) {
        throw Error('Invalid form');
      }
      const formData = {
        resetPasswordToken: this.$route.query.reset_password_token,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      };
      this.showSpinner = true;
      this.$store.dispatch('changePassword', formData)
        .then(() => {
          this.showSpinner = false;
          this.trackUserLoggedInEvent();
          this.$router.push('/links');
        }).catch(() => {
          this.showSpinner = false;
          this.showError = true;
        });
    },
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
    },
    passwordConfirmation: {
      required,
      minLength: minLength(8),
    },
  },
};
</script>

<style scoped>

.slide-fade-enter {
  opacity: 0;
  transform: translateX(15px);
}

.slide-fade-enter-active{
  transition: all .5s ease;
}

</style>
