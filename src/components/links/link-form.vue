<template>
<div>
  <div class="bg-white shadow-lg rounded link-frame mx-auto">
    <div class="w-full h-full">
      <transition name="component-fade" mode="out-in">
        <div v-if='currentStep==="intro"'
          class="h-full flex flex-col justify-between p-8"
          :key="currentStep">
          <div>
            <img class="mx-auto h-16 w-auto rounded-full shadow"
                src="../../assets/images/fintoc-isologo.png" alt="fintoc" />
            <h1 class="text-2xl mt-4 text-center leading-tight">
              Fintoc se conectará con tu banco
            </h1>
            <div class="text-gray-800">
              <div class="text-base font-light mt-2 flex flex-wrap items-center h-16">
                <div class="w-2/12">
                  <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle rounded-full">
                    <font-awesome-icon icon="bolt"/>
                  </div>
                </div>
                <div class="w-10/12">
                  Tomará menos de un minuto
                </div>
              </div>
              <div class="text-base font-light flex flex-wrap items-center h-16">
                <div class="w-2/12">
                  <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle rounded-full">
                    <font-awesome-icon icon="shield-alt"/>
                  </div>
                </div>
                <div class="w-10/12">
                  La conexión está encriptada de extremo a extremo
                </div>
              </div>
              <div class="text-base font-light flex flex-wrap items-center h-16">
                <div class="w-2/12">
                  <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle rounded-full">
                    <font-awesome-icon icon="lock"/>
                  </div>
                </div>
                <div class="w-10/12">
                  Tus credenciales no son compartidas con nadie
                </div>
              </div>
            </div>
          </div>
          <button @click="moveTo('select-bank')"
                  type="submit"
                  class="group relative w-full flex justify-center py-3 px-4 border
                        border-transparent text-l leading-5 rounded-md
                        text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                        focus:shadow-outline-indigo active:bg-indigo-700 transition
                        duration-150 ease-in-out mt-6 hover:bg-indigo-500 tracking-wide">
              Continuar
          </button>
        </div>
        <div v-if='currentStep==="select-bank"' class='h-full flex flex-col' :key="currentStep">
          <div class="pt-6 px-6 text-gray-800">
            <button @click="moveTo('intro')" class="self-start text-gray-700">
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 class="text-l mt-2">Selecciona tu banco</h1>
          </div>
          <hr class="mt-1">
          <div class="flex-1 p-4">
            <div class="h-full">
              <div class="grid grid-cols-2 gap-2 p-2">
                <button v-for="bank in supportedBanks"
                        v-bind:key='bank.code'
                        @click='selectBank(bank)'
                        class="border-gray-200 shadow-xs hover:shadow-md py-3 px-1 rounded
                        transition ease-in-out duration-150">
                  <img class="bank-logo h-16 w-auto rounded object-cover mx-auto"
                      :src="bank.logo" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="bank-log-in"' class='h-full flex flex-col' :key="currentStep">
          <div class="pt-6 px-6 text-gray-800">
            <button @click="moveTo('select-bank')" class="self-start text-gray-700">
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 class="text-l mt-2 text-center">Ingresa</h1>
          </div>
          <hr class="mt-1">
          <div class="relative">
            <spinner v-if="showSpinner">
            </spinner>
            <div class="flex-1 p-6">
              <img class="bank-logo h-24 rounded object-cover mx-auto"
                  :src="this.bank.logo" />
              <div class="mt-6">
                <div class="rounded-md shadow-sm">
                  <input class="appearance-none block w-full bg-grey-lighter text-grey-900
                                border border-grey-lighter rounded py-3 px-4 leading-tight
                                focus:outline-none focus:shadow-sm mt-4"
                        type="text"
                        :class="{ 'border-red-500': $v.rut.$error }"
                        placeholder="Rut"
                        v-rut
                        v-model.trim.lazy="$v.rut.$model">
                  <input class="appearance-none block w-full bg-grey-lighter text-grey-900
                                border border-grey-lighter rounded py-3 px-4 leading-tight
                                focus:outline-none focus:shadow-sm mt-4"
                        type="text"
                        :class="{ 'border-red-500': $v.holderId.$error }"
                        placeholder="Rut empresa"
                        v-if="isBusiness"
                        v-rut
                        v-model.trim.lazy="$v.holderId.$model">
                  <input class="appearance-none block w-full bg-grey-lighter text-gray-900
                                border border-grey-lighter rounded py-3 px-4 leading-tight
                                focus:outline-none focus:shadow-sm mt-4"
                        type="password"
                        placeholder="Contraseña"
                        v-model.trim="$v.password.$model">
                </div>
                <div class="mt-4">
                  <button type="submit"
                          class="group relative w-full flex justify-center py-3 px-4 border
                                border-transparent text-sm leading-5 font-medium rounded-md
                                text-white bg-indigo-600 focus:outline-none
                                focus:border-indigo-700 focus:shadow-outline-indigo
                                active:bg-indigo-700 transition duration-150
                                ease-in-out"
                          @click="onSubmit"
                          :class="{ 'hover:bg-indigo-500': !$v.$invalid,
                                    'cursor-not-allowed': $v.$invalid }">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400
                                  transition ease-in-out duration-150"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0
                                01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clip-rule="evenodd" />
                      </svg>
                    </span>
                    Ingresar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="error"' class='h-full flex flex-col' :key="currentStep">
          <div class="pt-6 px-6 text-gray-800">
            <button @click="moveTo('bank-log-in')" class="self-start text-gray-700">
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 class="text-l mt-2 text-center">Error</h1>
          </div>
          <hr class="mt-1">
          <div class="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3
                          shadow-md mb-6"
                   role="alert">
                <div class="flex">
                  <div class="py-1">
                    <svg class="fill-current h-6 w-6 text-red-500 mr-4"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93
                               17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32
                               11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold">Tuvimos un problema con tus credenciales</p>
                    <p class="text-sm">{{ textError }}</p>
                  </div>
                </div>
              </div>
              <img class="bank-logo h-24 rounded object-cover mx-auto"
                  :src="this.bank.logo"/>
            </div>
            <button @click="moveTo('bank-log-in')"
                  type="submit"
                  class="group relative w-full flex justify-center py-3 px-4 border
                        border-transparent text-l leading-5 rounded-md
                        text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                        focus:shadow-outline-indigo active:bg-indigo-700 transition
                        duration-150 ease-in-out mt-6 hover:bg-indigo-500 tracking-wide">
              Volver a intentar
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <div class="mt-4 w-64 text-sm font-light text-gray-500 mx-auto text-center">
    Este es el widget que tus usuarios verán en tu aplicación
  </div>
</div>
</template>

<script>

import { required, requiredIf } from 'vuelidate/lib/validators';
import { rutValidator } from 'vue-dni';
import Spinner from '../spinner.vue';
import { availableBanks } from '../../banks-helper';

const PERMITTED_STEPS = [
  'intro',
  'select-bank',
  'bank-log-in',
  'error',
];

export default {
  data() {
    return {
      bank: '',
      rut: '',
      password: '',
      holderId: '',
      currentStep: 'intro',
      errorCode: '',
      showSpinner: false,
    };
  },
  props: {
    createdThrough: {
      type: String,
      default: 'dashboard',
    },
    submitAction: {
      type: String,
      default: 'createUserLinkFromDashboard',
    },
    headers: {
      type: Object,
      default: () => ({}),
    },
    extraFields: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Spinner,
  },
  validations: {
    holderType: {
      required,
    },
    rut: {
      required,
      rutValidator,
    },
    holderId: {
      required: requiredIf('isBusiness'),
      rutValidator: (value) => rutValidator(value) || value === '',
    },
    password: {
      required,
    },
  },
  computed: {
    holderType() {
      return this.$route.query['holder-type'];
    },
    isBusiness() {
      return this.holderType === 'business';
    },
    supportedBanks() {
      return availableBanks.filter((bank) => bank.holderTypes[this.holderType] === true);
    },
    textError() {
      switch (this.errorCode) {
        case 'invalid_username':
          return 'Por favor utiliza un rut chileno válido';
        case 'invalid_credentials':
          return 'Credenciales inválidas';
        case 'unavailable_institution':
          return 'Parece que estamos con problemas. Si el problema sigue escríbele a elliot@fintoc.com';
        case 'not_implemented_institution':
          return 'Lamentablemente esta institución no la hemos implementado. Escríbele a elliot@fintoc.com';
        default:
          return 'No pudimos conectarnos con el banco. Si el problema persiste, intenta más tarde';
      }
    },
  },
  methods: {
    moveTo(step) {
      if (!PERMITTED_STEPS.includes(step)) {
        throw Error('Unrecognized step');
      }

      this.currentStep = step;
    },
    selectBank(bank) {
      this.bank = bank;
      this.moveTo('bank-log-in');
    },
    getFormData() {
      const formFields = {
        holder_type: this.holderType,
        holder_id: this.holderId,
        institution_id: this.bank.code,
        username: this.rut,
        password: this.password,
      };

      return { ...formFields, ...this.extraFields };
    },
    onSubmit() {
      if (this.$v.$invalid) { return; }

      this.showSpinner = true;
      const formData = this.getFormData();
      const payload = { formData: this.getFormData(), headers: this.headers };

      this.$store.dispatch(this.submitAction, payload)
        .then((response) => {
          this.trackLinkCreatedEvent(response.data);
          this.$emit('createSuccess', response);
          this.showSpinner = false;
        })
        .catch((error) => {
          this.errorCode = error.response != null ? error.response.data.error.code : 'unknown';
          this.trackLinkCreationFailedEvent(formData, this.errorCode);
          this.currentStep = 'error';
          this.showSpinner = false;
        });
    },
    trackLinkCreatedEvent(responseData) {
      window.analytics.track('Link Created', {
        link_id: responseData.id,
        institution_id: responseData.institution.public_id,
        holder_type: responseData.holder_type,
        username: responseData.username,
        created_through: this.createdThrough,
      });
    },
    trackLinkCreationFailedEvent(formData, errorCode) {
      window.analytics.track('Link Creation Failed', {
        error_code: errorCode,
        institution_id: formData.institution_id,
        holder_type: formData.holder_type,
        username: formData.username,
        created_through: this.createdThrough,
      });
    },
  },
};
</script>

<style scoped>
  .link-frame {
    height: 500px;
    max-width: 360px;
    width: 100%;
  }

  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity .2s ease;
  }

  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }
</style>
