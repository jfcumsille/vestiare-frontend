<template>
  <div class="min-h-screen flex flex-col">
    <div class="container mx-auto flex-1 flex flex-col items-center
        justify-center px-2 mt-10 max-w-md">
      <img class="mx-auto my-4 h-12 w-auto"
           src="../assets/images/fintoc-isologo.svg" alt="fintoc" />
      <h1 class="m-5 text-3xl leading-9 text-center font-regular text-gray-900">
        No pudimos confirmar tu correo
      </h1>
      <h1 class="text-6xl text-center font-regular">
        🤔
      </h1>
      <p class="m-5 text-xl text-center font-regular text-gray-900">
        El link de verificación ha expirado o ya fue utilizado anteriormente.
      </p>
      <div class="text-gray-900 text-xl mt-3 text-center">
        ¿Ya confirmaste tu cuenta?
        <router-link to="../login/"
                    class="font-medium text-main hover:text-indigo-800 focus:outline-none
                            focus:underline transition ease-in-out duration-150">
            Log in
        </router-link>
      </div>
      <div class="text-gray-600 text-xs mt-4 text-center">
        ¿No logras verificar tu cuenta? Revisa tu correo una última vez.
        Si tu link expiró ya te enviamos uno nuevo.
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
};
</script>
