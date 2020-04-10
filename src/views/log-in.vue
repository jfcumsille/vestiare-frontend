<template>
<div class="bg-gray-100 min-h-screen flex flex-col">
  <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div class="max-w-md w-full">
      <img class="mx-auto h-16 w-auto" src="../assets/images/fintoc-logo.png" alt="fintoc" />
      <div>
        <h2 class="mt-6 text-center text-4xl leading-9 font-semibold text-gray-900">
          Ingresa a tu cuenta
        </h2>
        <p class="mt-2 text-center text-sm leading-5 text-gray-600">
          O
          <router-link to="/signup"
                       class="font-medium text-indigo-600 hover:text-indigo-800
                              focus:outline-none focus:underline transition ease-in-out
                              duration-150">
            Registrate acá
          </router-link>
        </p>
      </div>
      <form @submit.prevent="onSubmit" method="POST" class="mt-6">
        <div class="rounded-md shadow-sm">
          <input aria-label="Email address" name="email" type="email"
                 required
                 v-model="email"
                 class="appearance-none block w-full px-3 py-3 border
                        border-gray-400 placeholder-gray-500 text-gray-900 rounded-t-md
                        focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                        focus:z-10 sm:text-sm sm:leading-5" placeholder="Email" />
          <input aria-label="Password" name="password" type="password"
                 required
                 v-model="password"
                 class="appearance-none relative block w-full px-3 py-3 border border-t-0
                        border-gray-400 placeholder-gray-500 text-gray-900 rounded-b-md
                        focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                        focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div class="text-sm leading-5 flex items-end">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none
                              focus:underline transition ease-in-out duration-150">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border
                                      border-transparent text-sm leading-5 font-medium rounded-md
                                      text-white bg-indigo-600 hover:bg-indigo-500
                                      focus:outline-none
                                      focus:border-indigo-700 focus:shadow-outline-indigo
                                      active:bg-indigo-700 transition duration-150 ease-in-out">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out
                          duration-150" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0
                        01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('logIn', formData);
    },
  },
};
</script>
