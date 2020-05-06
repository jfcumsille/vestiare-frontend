<template>
<div class="bg-gray-200">
  <header class="bg-white">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-medium leading-tight text-gray-900">
        Solicitud de banco no listado
      </h1>
      <h2 class="text-l font-medium leading-tight text-gray-800">
        Si tu banco no aparece en el formulario para crear un nuevo link, puedes pedir que
        lo agreguemos acá.
      </h2>
      <h2 class="text-l font-medium leading-tight text-gray-800">
        Con esto aceleramos la construcción de Fintoc
      </h2>
    </div>
  </header>
  <main class="h-screen">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0">
        <div class="flex flex-col">
          <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="align-middle inline-block min-w-full overflow-hidden
                        sm:rounded-md border-gray-200">
            </div>
            <div class="bg-white rounded px-8 py-6 relative">
              <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3
                          shadow-md"
                  role="alert"
                  v-if='showFeedbackMessage'>
                <div class="flex">
                  <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p class="font-bold">Gracias por ayudar a mejorar Fintoc 🙌</p>
                    <p class="text-sm">
                      Esto será muy útil para nosotros.
                      Serás el primero en saber cuando tengamos este banco integrado.
                    </p>
                  </div>
                </div>
              </div>
              <spinner v-if='showSpinner'></spinner>
              <div v-if='!showFeedbackMessage'>
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
                                v-model.trim.lazy="$v.bankName.$model">
                          <option value='' disabled>Selecciona un banco</option>
                          <option v-for='bank in banks'
                                  v-bind:key='bank.value'
                                  :value='bank.value'>
                            {{ bank.label }}
                          </option>
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
                      <div class='text-red-700' v-if="!$v.bankName.required && $v.bankName.$error">
                        Este campo es obligatorio
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
                                v-model.trim.lazy="$v.holderType.$model">
                          <option value='' disabled>Selecciona una credencial</option>
                          <option value='business'>Personas</option>
                          <option value='individual'>Empresas</option>
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
                      <div class='text-red-700'
                           v-if="!$v.holderType.required && $v.holderType.$error">
                        Este campo es obligatorio
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
                              placeholder="11111111-1"
                              v-rut
                              v-model.trim="$v.rut.$model">
                      <div class='text-red-700' v-if="!$v.rut.required && $v.rut.$error">
                        Este campo es obligatorio
                      </div>
                      <div class='text-red-700' v-if="!$v.rut.rutValidator && $v.rut.$error">
                        Ingresa un rut válido
                      </div>
                    </div>
                    <div class="md:w-1/2 px-3">
                      <label class="block uppercase tracking-wide text-grey-900 text-xs font-bold
                                    mb-2">
                        Password
                      </label>
                      <input class="appearance-none block w-full bg-grey-lighter text-gray-900
                                    border border-grey-lighter rounded py-3 px-4 leading-tight
                                    focus:outline-none"
                              type="password"
                              placeholder="••••••••••••"
                              v-model.trim="$v.password.$model">
                      <div class='text-red-700' v-if="!$v.password.required && $v.password.$error">
                        Este campo es obligatorio
                      </div>
                    </div>
                  </div>
                  <div class="-mx-2 md:flex md:flex-row-reverse">
                    <div class="md:w-1/4 px-3 mb-6 md:mb-0">

                      <button type="submit"
                              :disabled="$v.$invalid"
                              :class="{ 'hover:bg-indigo-500': !$v.$invalid,
                                        'cursor-not-allowed': $v.$invalid
                                      }"
                              class="group relative w-full flex justify-center py-2 px-4
                                    border border-transparent text-sm leading-5 font-medium
                                    rounded-md text-white bg-indigo-600 focus:outline-none
                                    focus:border-indigo-700 focus:shadow-outline-indigo
                                    active:bg-indigo-700 transition duration-200 ease-in-out">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition
                                      ease-in-out duration-150"
                               fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0
                                     01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                  clip-rule="evenodd" />
                          </svg>
                        </span>
                        Enviar solicitud
                      </button>
                    </div>
                  </div>
                </form>
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
import { required } from 'vuelidate/lib/validators';
import { rutValidator } from 'vue-dni';
import Spinner from '../components/spinner.vue';

export default {
  data() {
    return {
      bankName: '',
      holderType: '',
      rut: '',
      password: '',
      showSpinner: false,
      showFeedbackMessage: false,
      banks: [
        { label: 'Banco de Chile', value: 'cl_banco_de_chile' },
        { label: 'Banco Santander', value: 'cl_banco_santander' },
        { label: 'Banco BCI', value: 'cl_banco_bci' },
        { label: 'Banco Estado', value: 'cl_banco_estado' },
        { label: 'Banco Falabella', value: 'cl_banco_falabella' },
        { label: 'Banco Internacional', value: 'cl_banco_internacional' },
        { label: 'Banco Security', value: 'cl_banco_security' },
        { label: 'Banco Scotiabank', value: 'cl_banco_scotiabank' },
        { label: 'Banco Corpbanca', value: 'cl_banco_corpbanca' },
        { label: 'Banco BBVA', value: 'cl_banco_bbva' },
        { label: 'Banco Itaú', value: 'cl_banco_itau' },
        { label: 'Banco Deutsche', value: 'cl_banco_deutsche' },
      ],
    };
  },
  methods: {
    getFormData() {
      return {
        institution_id: this.bankName,
        holder_type: this.holderType,
        username: this.rut,
        password: this.password,
      };
    },
    onSubmit() {
      if (this.$v.$invalid) { return; }

      this.showSpinner = true;
      const formData = this.getFormData();
      this.$store.dispatch('sendNewLinkRequest', formData)
        .then(() => {
          this.showSpinner = false;
          this.showFeedbackMessage = true;
        });
    },
  },
  mounted() {
    window.analytics.page('New Bank Request');
  },
  components: {
    Spinner,
  },
  validations: {
    bankName: {
      required,
    },
    holderType: {
      required,
    },
    rut: {
      required,
      rutValidator,
    },
    password: {
      required,
    },
  },
};
</script>
