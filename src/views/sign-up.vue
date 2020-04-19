<template>
<div class="bg-gray-100 min-h-screen flex flex-col">
  <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <img class="mx-auto h-16 w-auto" src="../assets/images/fintoc-logo.png" alt="fintoc" />
    <h1 class="mt-2 text-4xl text-center font-semibold text-gray-900">
      ¡Bienvenido!
    </h1>
    <h2 class="mb-2 text-4xl text-center font-semibold text-gray-900">
      Registrate acá
    </h2>
    <div class="w-full">
      <form @submit.prevent="onSubmit" method="POST">
        <input
            type="email"
            class="border border-gray-400 placeholder-gray-500 text-gray-900 w-full p-3
                  rounded-md mt-4 focus:outline-none mb-1"
            name="email"
            placeholder="Email"
            v-model.trim.lazy="$v.email.$model">
        <div class='text-red-700' v-if="!$v.email.email">Ingresa un email válido 👮🏽‍♀️</div>
        <div class='text-red-700' v-if="!$v.email.required && $v.email.$error">
          Este campo es obligatorio
        </div>
        <input
            type="password"
            class="border border-gray-400 placeholder-gray-500 text-gray-900 w-full p-3
                  rounded-md mt-4 focus:outline-none mb-1"
            name="password"
            placeholder="Password"
            v-model.trim.lazy="$v.password.$model">
        <div class='text-red-700' v-if="!$v.password.required && $v.password.$error">
          Este campo es obligatorio
        </div>
        <div class='text-red-700' v-if="!$v.password.minLength && $v.password.$error">
          La contraseña debe tener un mínimo de {{$v.password.$params.minLength.min}} caracteres
        </div>
        <button type="submit"
                :disabled="$v.$invalid"
                :class="{ 'hover:bg-indigo-500': !$v.$invalid,
                          'cursor-not-allowed': $v.$invalid }"
                class="group relative w-full flex justify-center py-2 px-4 border
                       border-transparent text-sm leading-5 font-medium rounded-md
                       text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                       focus:shadow-outline-indigo active:bg-indigo-700 transition
                       duration-150 ease-in-out mt-4">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition
                        ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2
                       2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
            </svg>
          </span>
          Registrarse
        </button>
      </form>
    </div>
    <div class="text-center text-sm text-gray-900 mt-4">
        Al registrarte, aceptas los
        <a class="no-underline border-b border-gray-900 text-gray-900" href="#">
            Terminos y Condiciones
        </a> y la
        <a class="no-underline border-b border-gray-900 text-gray-900" href="#">
            Politica de Privacidad
        </a>
    </div>
    <div class="text-gray-900 mt-6">
    ¿Ya tienes una cuenta?
    <router-link to="../login/"
                 class="font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none
                        focus:underline transition ease-in-out duration-150">
        Log in
    </router-link>
  </div>
  </div>
</div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      name: 'remove-field',
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) { return; }

      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('signUp', formData).then(() => {
        this.afterSuccess();
      });
    },
    afterSuccess() {
      if (this.$store.getters.isUserLoggedIn) {
        this.$router.push('/dashboard');
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
      minLength: minLength(8),
    },
  },
};
</script>
