<template>
<div class="bg-white rounded px-8 py-6 flex flex-col">
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
                  v-model="bankName">
            <option value='' disabled>Selecciona un banco</option>
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
        <div v-if="!$v.bankName.required">Este campo es obligatorio</div>
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
                  v-model="holderType">
            <option value='' disabled>Selecciona un tipo de cuenta</option>
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
        <div v-if="!$v.holderType.required">Este campo es obligatorio</div>
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
                v-model="rut">
        <div v-if="!$v.rut.required">Este campo es obligatorio</div>
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
                v-model="password">
        <div v-if="!$v.password.required">Este campo es obligatorio</div>
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
                       border border-transparent text-sm leading-5 font-medium rounded-md
                       text-white bg-indigo-600
                       focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo
                       active:bg-indigo-700 transition duration-200 ease-in-out">
          Crear credencial
        </button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      bankName: '',
      holderType: '',
      rut: '',
      password: '',
    };
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
    },
    password: {
      required,
    },
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) { return; }

      const formData = {
        institution_id: this.bankName,
        account_holder_type: this.holderType,
        username: this.rut,
        password: this.password,
      };
      this.$store.dispatch('createUserLink', formData).then((response) => {
        const newLinkData = {
          bankName: response.data.institution.name,
          holderType: response.data.holder_type,
          numberOfAccounts: response.data.accounts.length,
          accessToken: response.data.access_token,
          showForm: false,
        };
        this.$emit('newLinkSuccess', newLinkData);
      });
    },
  },
};
</script>
