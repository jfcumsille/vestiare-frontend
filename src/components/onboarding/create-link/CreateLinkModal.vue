<template>
  <div class="absolute z-10 inset-0 overflow-y-auto
            bg-gray-700 bg-opacity-75">
    <div class="flex h-screen items-center justify-center py-4 px-4 text-center">
      <div
        class="bg-white px-4 py-4 inline-block align-bottom rounded-sm  overflow-hidden
                  shadow-xl w-full sm:w-3/5 cursor-auto">
          <div class="font-semibold text-left">
            Credenciales de prueba
          </div>
          <div class="sm:text-sm text-xs text-justify pb-4">
            En Fintoc te damos credenciales de prueba para que puedas construir lo que quieras en
            un ambiente seguro. Las credenciales las puedes encontrar en la
          <a class="underline" target="_blank" href="https://fintoc.com/docs#autenticacion"> documentación</a>.
            Acá te dejamos unas para que puedas usar si es que
            quieres conectar una cuenta de prueba:
          </div>
          <div class="flex flex-col items-center justify-center relative">
            <div class="bg-gray-100 py-2 px-2 rounded border-2 border-gray-200 shadow
            grid grid-cols-2 w-1/3 text-xs">
              <div class="text-left"> Cuenta:</div> <div> 41614850-3 </div>
              <div class="text-left"> Clave:</div> <div> jonsnow </div>
            </div>
          </div>
          <div class="flex justify-center items-center mt-4">
            <div
              @click="closeModal"
              class="bg-tint-blue text-sm py-2 px-8 rounded-sm
                    text-white cursor-pointer">
                Listo
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>
