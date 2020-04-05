<template>
<div class="bg-gray-100 min-h-screen flex flex-col">
  <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <img class="mx-auto h-16 w-auto" src="../assets/images/fintoc-logo.png" alt="fintoc" />
    <h1 class="mb-8 mt-2 text-4xl text-center font-semibold text-gray-900">¡Bienvenido!</h1>
    <form @submit.prevent="onSubmit" method="POST">
      <input
          type="text"
          class="border border-gray-400 placeholder-gray-500 text-gray-900 w-full p-3
                 rounded-md mb-4 focus:outline-none"
          name="name"
          required
          placeholder="Nombre"
          v-model="name" />
      <input
          type="text"
          class="border border-gray-400 placeholder-gray-500 text-gray-900 w-full p-3
                 rounded-md mb-4 focus:outline-none"
          name="last name"
          required
          placeholder="Apellido"
          v-model="lastName" />
      <input
          type="text"
          class="border border-gray-400 placeholder-gray-500 text-gray-900 w-full p-3
                 rounded-md mb-4 focus:outline-none"
          name="email"
          required
          placeholder="Email"
          v-model="email" />
      <input
          type="password"
          class="border border-gray-400 placeholder-gray-500 text-gray-900 w-full p-3
                 rounded-md mb-4 focus:outline-none"
          name="password"
          required
          placeholder="Password"
          v-model="password" />
      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border
                                    border-transparent text-sm leading-5 font-medium rounded-md
                                    text-white bg-indigo-600 hover:bg-indigo-500
                                    focus:outline-none focus:border-indigo-700
                                    focus:shadow-outline-indigo active:bg-indigo-700 transition
                                    duration-150 ease-in-out">
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition
                      ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012
                                          2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2
                                          2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
        </span>
        Registrarse
      </button>
    </form>

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
    <a class="font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none
              focus:underline transition ease-in-out duration-150" href="../login/">
        Log in
    </a>
  </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('signUp', formData);
    },
  },
};
</script>
