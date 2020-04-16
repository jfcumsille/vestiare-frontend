<template>
<div class="bg-gray-200">
  <header class="bg-white">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-medium leading-tight text-gray-900">
        Nuevas credenciales
      </h1>
    </div>
  </header>
  <main class="h-screen">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex flex-col">
          <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="align-middle inline-block min-w-full overflow-hidden
                        sm:rounded-md border-gray-200">
              <div v-if="showForm" class="bg-white rounded px-8 py-6 flex flex-col">
                <form @submit.prevent="onSubmit" method="POST">
                <div class="-mx-2 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-900 text-xs
                                  font-bold mb-2">
                      Banco
                    </label>
                    <div class="relative">
                      <select class="block appearance-none w-full bg-grey-lighter border
                                     border-grey-lighter leading-tight focus:outline-none
                                     text-gray-900 py-3 px-4 pr-8 rounded"
                              required
                              v-model="bank">
                        <option value='cl_banco_de_chile'>Banco de Chile</option>
                        <option value='cl_banco_santander'>Banco Santander</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center
                                  px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757
                                   6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-900 text-xs
                                  font-bold mb-2">
                      Tipo de cuenta
                    </label>
                    <div class="relative">
                      <select class="block appearance-none w-full bg-grey-lighter border
                                     border-grey-lighter leading-tight focus:outline-none
                                     text-gray-900 py-3 px-4 pr-8 rounded"
                              required
                              v-model="holderType">
                        <option value='individual'>Personas</option>
                        <option value='business'>Empresas</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center
                                  px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757
                                   6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="-mx-2 md:flex mb-6">
                  <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-grey-900 text-xs
                                  font-bold mb-2">
                      Rut
                    </label>
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-900
                                  border border-grey-lighter rounded py-3 px-4 leading-tight
                                  focus:outline-none"
                           type="text"
                           required
                           placeholder="11111111-1"
                           v-model="rut">
                  </div>
                  <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-900 text-xs font-bold
                                  mb-2">
                      Password
                    </label>
                    <input class="appearance-none block w-full bg-grey-lighter text-gray-900
                                  border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight
                                  focus:outline-none"
                           type="password"
                           placeholder="••••••••••••"
                           required
                           v-model="password">
                  </div>
                </div>
                <div class="-mx-2 md:flex md:flex-row-reverse">
                  <div class="md:w-1/4 px-3 mb-6 md:mb-0">
                    <button type="submit"
                            class="group relative w-full flex justify-center py-2 px-4 border
                                   border-transparent text-sm leading-5 font-medium rounded-md
                                   text-white bg-indigo-600 hover:bg-indigo-500
                                   focus:outline-none
                                   focus:border-indigo-700 focus:shadow-outline-indigo
                                   active:bg-indigo-700 transition duration-150 ease-in-out">
                      Crear credencial
                    </button>
                  </div>
                </div>
                </form>
              </div>
              <div v-if="!showForm">
                <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3
                            shadow-md mb-6"
                     role="alert">
                  <div class="flex">
                    <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                    <div>
                      <p class="font-bold">Credenciales guardadas exitosamente</p>
                      <p class="text-sm">
                        Está información solo será mostrada una vez.
                        Asegurate de copiar el Access Token
                        </p>
                    </div>
                  </div>
                </div>
                <div class="bg-white shadow overflow-hidden sm:rounded-lg border-1">
                  <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Información de las credenciales
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-900">
                      Personal details and application.
                    </p>
                  </div>
                  <div>
                    <dl>
                      <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm leading-5 font-medium font-semibold text-gray-900">
                          Banco
                        </dt>
                        <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ bank }}
                        </dd>
                      </div>
                      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm leading-5 font-medium font-semibold text-gray-900">
                          Tipo de cuenta
                        </dt>
                        <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ holderType }}
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
            </div>
            <div class="mt-4 text-right">
              <router-link to="/links"
                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-200
                        text-gray-900 hover:bg-gray-300">
                Volver
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
export default {
  data() {
    return {
      bank: '',
      holderType: '',
      rut: '',
      password: '',
      showForm: true,
      accessToken: '',
      numberOfAccounts: 0,
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        institution_id: this.bank,
        account_holder_type: this.holderType,
        username: this.rut,
        password: this.password,
      };
      this.$store.dispatch('createUserLink', formData).then((response) => {
        this.bank = response.data.institution.name;
        this.holderType = response.data.holder_type === 'business' ? 'Empresas' : 'Persona';
        this.numberOfAccounts = response.data.accounts.length;
        this.accessToken = response.data.access_token;
        this.showForm = false;
      });
    },
  },
};
</script>
