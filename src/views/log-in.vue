<template>
<div class="bg-gray-100 min-h-screen flex flex-col">
  <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <spinner v-if='showSpinner'></spinner>
    <div class="max-w-md w-full">
      <img class="mx-auto h-12 w-auto" src="../assets/images/fintoc-logo.png" alt="fintoc" />
      <div>
        <h2 class="mt-6 text-center text-4xl leading-9 font-medium text-gray-900">
          Ingresa a tu cuenta
        </h2>
        <p class="mt-2 text-center text-sm leading-5 text-gray-600">
          O
          <router-link to="/signup"
                       class="font-regular text-indigo-600 hover:text-indigo-800
                              focus:outline-none focus:underline transition ease-in-out
                              duration-150">
            Regístrate acá
          </router-link>
        </p>
      </div>
      <div class="text-center mt-6">
        <p v-if="showHelloBackMessage"
           class="text-3xl font-medium text-gray-900 border-indigo-500">
          Hola nuevamente 👋
        </p>
      </div>
      <transition name="slide-fade">
        <p class="text-red-700 mt-6" v-if='showloginError'>Credenciales inválidas 👮🏽‍♀️</p>
      </transition>
      <form @submit.prevent="submitForm" class="mt-6">
        <div class="rounded-md shadow-sm">
          <input aria-label="Email address" name="email" type="email"
                 required
                 v-model="email"
                 class="appearance-none block w-full p-4 border
                        border-gray-400 placeholder-gray-500 text-gray-900 rounded-t-md
                        focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                        focus:z-10 sm:text-sm sm:leading-5" placeholder="Email" />
          <input aria-label="Password" name="password" type="password"
                 required
                 v-model="password"
                 class="appearance-none relative block w-full p-4 border border-t-0
                        border-gray-400 placeholder-gray-500 text-gray-900 rounded-b-md
                        focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                        focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />
        </div>

        <div class="mt-6">
          <action-button
            :has-lock-icon="true"
            :invalid-form="$v.$invalid"
            >
            Login
          </action-button>
        </div>
        <div class="mt-6 flex items-center justify-between">
          <div class="text-sm leading-5 flex items-end">
            <router-link
              to="/recover-password"
              class="font-regular text-indigo-600 hover:text-indigo-800 focus:outline-none
                     focus:underline transition ease-in-out duration-150">
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import Spinner from '../components/spinner.vue';
import actionButton from '../components/actionButton.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      showloginError: false,
      showHelloBackMessage: false,
      showSpinner: false,
    };
  },
  created() {
    this.fillInputIfEmailInQueryParam();
  },
  mounted() {
    window.analytics.page('Login');
  },
  components: {
    actionButton,
    Spinner,
  },
  methods: {
    submitForm() {
      if (this.$v.$invalid) {
        throw Error('Invalid form');
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      this.showSpinner = true;
      this.$store.dispatch('logIn', formData)
        .then(() => {
          this.showSpinner = false;
          this.trackUserLoggedInEvent();
          this.$router.push('/links');
        }).catch((error) => {
          this.showSpinner = false;
          const codeError = error.response.data.error.type;
          if (codeError === 'invalid_request_error') {
            this.showloginError = true;
          }
        });
    },
    trackUserLoggedInEvent() {
      window.analytics.track('User Logged In');
    },
    fillInputIfEmailInQueryParam() {
      if (this.$route.query.email) {
        this.showHelloBackMessage = true;
        this.email = this.$route.query.email;
      }
    },
  },
  validations: {
    email: {
      email,
      required,
    },
    password: {
      required,
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
