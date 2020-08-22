<template>
<div class="bg-gray-100 min-h-screen flex flex-col">
  <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <spinner v-if='showSpinner'></spinner>
    <div class="max-w-md w-full">
      <img class="mx-auto h-12 w-auto" src="../assets/images/fintoc-logo.png" alt="fintoc" />
      <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3
                  shadow-md mb-4 mt-4"
          role="alert"
          v-if='showInstructions'>
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p class="font-semibold">Terminamos el proceso con éxito</p>
            <p class="text-sm">
              Si existe una cuenta con este correo, se enviaron las instrucciones a {{ email }}.
            </p>
          </div>
        </div>
      </div>
      <div v-if="!showInstructions">
        <div>
          <h1 class="mt-6 text-center text-4xl leading-tight font-medium text-gray-900">
            Recupera tu contraseña acá 👇
          </h1>
          <h2 class="text-center text-xl leading-9 font-light text-gray-800">
            A todos nos pasa.
          </h2>
          <div class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3
                      shadow-md mb-4 mt-4"
              role="alert"
              v-if='showError'>
            <div class="flex">
              <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p class="font-semibold">Tuvimos un problema con recuperar tu contraseña</p>
                <p class="text-sm">
                  Si el problema persiste escríbenos a elliot@fintoc.com. Respondemos muy rápido
                </p>
              </div>
            </div>
          </div>
        </div>
        <form @submit.prevent="onSubmit" class="mt-6">
          <div class="rounded-md shadow-sm">
            <input aria-label="Email address" name="email" type="email"
                  required
                  v-model="email"
                  class="appearance-none block w-full p-4 border
                          border-gray-400 placeholder-gray-500 text-gray-900 rounded-md
                          focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                          focus:z-10 sm:text-sm sm:leading-5" placeholder="Email" />
          </div>

          <div class="mt-6">
            <action-button
              :has-lock-icon="false"
              :invalid-form="$v.$invalid"
              >
              Recuperar contraseña
            </action-button>
          </div>
        </form>
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
      showSpinner: false,
      showInstructions: false,
      showError: false,
    };
  },
  components: {
    actionButton,
    Spinner,
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) { return; }

      const formData = {
        email: this.email,
      };
      this.showSpinner = true;
      this.$store.dispatch('sendPasswordRecovery', formData).then(() => {
        this.showSpinner = false;
        this.showInstructions = true;
      }).catch(() => {
        this.showSpinner = false;
        this.showError = true;
      });
    },
  },
  validations: {
    email: {
      email,
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
