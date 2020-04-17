<template>
<div>
  <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3
              shadow-md mb-6"
        role="alert">
    <div class="flex">
      <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
      <div>
        <p class="font-bold">Credenciales guardadas con éxito</p>
        <p class="text-sm">
          Está información solo será mostrada una vez.
          Asegurate de copiar el <b>Access Token</b>
          </p>
      </div>
    </div>
  </div>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg border-1">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Información de las credenciales
      </h3>
    </div>
    <div>
      <dl>
        <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm leading-5 font-medium font-semibold text-gray-900">
            Banco
          </dt>
          <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
            {{ bankName }}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm leading-5 font-medium font-semibold text-gray-900">
            Tipo de cuenta
          </dt>
          <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
            {{ translatedHolderType }}
          </dd>
        </div>
        <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm leading-5 font-medium font-semibold text-gray-900">
            Número de cuentas
          </dt>
          <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
            {{ numberOfAccounts }}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm leading-5 font-medium font-semibold text-gray-900">
            Access token
          </dt>
          <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
            <ul class="border border-gray-200 rounded-md">
              <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm
                          leading-5 bg-teal-200">
                <div class="w-0 flex-1 flex items-center">
                  <span class="ml-2 flex-1 w-0 truncate tracking-widest
                                font-semibold">
                    <font-awesome-icon icon="lock" class="mt-1 mr-1"/>
                    {{ accessToken }}
                  </span>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    bankName: String,
    holderType: String,
    numberOfAccounts: String,
    accessToken: String,
  },
  computed: {
    translatedHolderType() {
      return this.holderType === 'business' ? 'Empresas' : 'Persona';
    },
  },
};
</script>
