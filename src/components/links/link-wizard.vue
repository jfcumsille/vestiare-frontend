<template>
<div>
  <div class="bg-white shadow-lg rounded link-frame mx-auto">
    <div class="w-full h-full">
      <transition name="component-fade" mode="out-in">
        <div v-if='currentStep==="intro"'
          class="h-full flex flex-col"
          :key="currentStep">
          <div class="pt-6 px-6 flex justify-end">
            <button @click="cancelLinkCreation" class="text-gray-700">
              <font-awesome-icon icon="times"/>
            </button>
          </div>
          <div class="px-8 pb-8 flex flex-col justify-between">
            <img class="mx-auto h-16 w-auto rounded-full shadow"
                src="../../assets/images/fintoc-isologo.png" alt="fintoc" />
            <h1 class="text-2xl mt-4 text-center leading-tight">
              Fintoc se conectará con tu banco
            </h1>
            <div class="text-gray-800 mt-1">
              <div class="text-base font-regular flex flex-wrap items-center h-12">
                <div class="w-2/12">
                  <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                              rounded-full">
                    <font-awesome-icon icon="bolt"/>
                  </div>
                </div>
                <div class="w-10/12">
                  Tomará menos de un minuto
                </div>
              </div>
              <div class="text-base font-regular flex flex-wrap items-center h-12 mt-2">
                <div class="w-2/12">
                  <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                              rounded-full">
                    <font-awesome-icon icon="shield-alt"/>
                  </div>
                </div>
                <div class="w-10/12">
                  La conexión está encriptada de extremo a extremo
                </div>
              </div>
              <div class="text-base font-regular flex flex-wrap items-center h-12 mt-2">
                <div class="w-2/12">
                  <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                              rounded-full">
                    <font-awesome-icon icon="lock"/>
                  </div>
                </div>
                <div class="w-10/12">
                  Tus credenciales no son compartidas con nadie
                </div>
              </div>
            </div>
            <button @click="moveTo('select-bank')"
                    type="submit"
                    class="group relative w-full justify-center py-3 px-4 border
                          border-transparent text-l leading-5 rounded-md
                          text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                          focus:shadow-outline-indigo active:bg-indigo-700 transition
                          duration-150 ease-in-out mt-4 hover:bg-indigo-500 tracking-wide">
                Continuar
            </button>
              <div class="text-center text-sm text-gray-600 mt-4">
                Al continuar aceptas los
                <a
                  class="no-underline border-b border-gray-400"
                  href="documents/terms-and-conditions.pdf"
                  target="_blank">
                    Términos y Condiciones
                </a> y la
                <a
                  class="no-underline border-b border-gray-400"
                  href="documents/privacy-policies.pdf"
                  target="_blank">
                    Política de Privacidad
                </a>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="select-bank"' class='h-full flex flex-col' :key="currentStep">
          <div class="py-6 px-6 text-gray-800 flex justify-between">
            <button @click="moveTo('intro')" class="text-gray-700">
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 class="text-l">Selecciona tu banco</h1>
            <button @click="cancelLinkCreation" class="text-gray-700">
              <font-awesome-icon icon="times"/>
            </button>
          </div>
          <hr>
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
          <div class="py-6 px-6 text-gray-800 flex justify-between">
            <button @click="moveTo('select-bank')" class="text-gray-700">
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 class="text-l">Ingresa</h1>
            <button @click="cancelLinkCreation" class="text-gray-700">
              <font-awesome-icon icon="times"/>
            </button>
          </div>
          <hr>
          <div class="relative">
            <spinner v-if="showSpinner">
            </spinner>
            <div class="flex-1 px-6 flex flex-col justify-between">
              <div class="py-2">
                <img
                    :class="{ 'mt-6' : !isBusiness}"
                    class="bank-logo h-24 rounded object-cover mx-auto"
                    :src="this.bank.logo" />
              </div>
              <div :class="{ 'mt-6' : !isBusiness}">
                <div class="h-20">
                  <div class="w-full flex flex-col">
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-900
                                  border border-grey-lighter rounded py-4 px-4 leading-tight
                                  focus:outline-none focus:shadow-sm"
                            type="text"
                            :class="{ 'border-red-500': $v.rut.$error }"
                            placeholder="Rut personal"
                            v-rut:live
                            v-model.trim="rut"
                            @blur='touchIfPresentElseReset($v.rut)'
                    >
                    <transition name="vertical-slide-fade">
                      <p
                        class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                        v-if="rut !== ''"
                      >
                        Rut personal
                      </p>
                    </transition>
                  </div>
                  <transition name="slide-fade">
                    <p class="text-sm text-red-700" v-if="$v.rut.$error">
                      No parece un rut de <b class="font-medium">persona</b> válido
                    </p>
                  </transition>
                </div>
                <div class="h-20" v-if="isBusiness">
                  <div class="w-full flex flex-col">
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-900
                                  border border-grey-lighter rounded py-4 px-4 leading-tight
                                  focus:outline-none focus:shadow-sm"
                          type="text"
                          :class="{ 'border-red-500': $v.holderId.$error }"
                          placeholder="Rut empresa"
                          v-rut:live
                          v-model.trim="holderId"
                          @blur='touchIfPresentElseReset($v.holderId)'
                    >
                    <transition name="vertical-slide-fade">
                      <p
                        class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                        v-if="holderId !== ''"
                      >
                        Rut empresa
                      </p>
                    </transition>
                  </div>
                  <transition name="slide-fade">
                    <p class="text-sm text-red-700" v-if="$v.holderId.$error">
                      No parece un rut de <b class="font-medium">empresa</b> válido
                    </p>
                  </transition>
                </div>
                <div class="h-20">
                  <div class="w-full flex flex-col">
                    <input class="appearance-none block w-full bg-grey-lighter text-gray-900
                                  border border-grey-lighter rounded py-4 px-4 leading-tight
                                  focus:outline-none focus:shadow-sm"
                          type="password"
                          placeholder="Contraseña"
                          v-model.trim="$v.password.$model">
                    <transition name="vertical-slide-fade">
                      <p
                        class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                        v-if="password !== ''"
                      >
                        Contraseña
                      </p>
                    </transition>
                  </div>
                </div>
                <button type="submit"
                        class="group relative w-full flex justify-center py-4 px-4 border
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
        <div v-if='currentStep==="select-account"' class='h-full flex flex-col' :key="currentStep">
          <div class="py-6 px-6 text-gray-800 flex justify-between">
            <button @click="moveTo('confirm-subscription')" class="text-gray-700">
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 class="text-l">Selecciona una cuenta</h1>
            <button @click="cancelLinkCreation" class="text-gray-700">
              <font-awesome-icon icon="times"/>
            </button>
          </div>
          <hr>
          <div class="relative">
            <div class="flex-1 px-6 py-2">
              <div class="h-full">
                <img class="bank-logo h-24 rounded object-cover mx-auto"
                    :src="bank.logo" />
                <div class="text-center px-4">
                  Selecciona la cuenta con la que quieres conectarte
                </div>
                <div class="grid grid-cols-1 gap-4 px-2 py-3 my-5 h-56 overflow-auto">
                  <button v-for="account in accounts"
                          :key='account.id'
                          @click='handleAccountSelection(account)'
                          class="border-gray-200 shadow-xs hover:shadow-md py-2 px-1 rounded
                          transition ease-in-out duration-150">
                    <div class="flex items-center text-sm">
                      <div class="flex w-3/5 text-left items-center">
                        <div class="w-1/5 px-2">
                          <input type="radio" class="form-radio h-4 w-4"
                          :checked="account.id === selectedAccount.id">
                        </div>
                        <div class="w-4/5 px-1">
                          <p> {{ account.name }}</p>
                          <p class="text-gray-700"> {{ account.number }}</p>
                        </div>
                      </div>
                      <div class="w-2/5">
                        <p class="text-gray-700"> ${{ account.balance.available }}</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="confirm-subscription"'>
          <div class="py-6 px-6 text-gray-800 flex justify-between">
            <button @click="moveTo('intro')" class="text-gray-700">
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 class="text-l">Confirmación</h1>
            <button @click="cancelLinkCreation" class="text-gray-700">
              <font-awesome-icon icon="times"/>
            </button>
          </div>
          <hr>
          <div class="relative">
            <spinner v-if="showSpinner">
            </spinner>
            <div class="flex-1 px-6 py-2">
              <div class="h-full">
                <img class="bank-logo h-24 rounded object-cover mx-auto"
                    :src="bank.logo" />
                <div class="flex flex-col justify-between py-2">
                  <div class="text-base font-regular flex flex-wrap items-center py-2">
                    <div class="w-2/12">
                      <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                                  rounded-full">
                        <font-awesome-icon icon="building"/>
                      </div>
                    </div>
                    <div class="w-10/12">
                       Vas a conectar tu cuenta Fintual
                    </div>
                  </div>
                  <div class="text-base font-regular flex flex-wrap items-center py-2">
                    <div class="w-2/12">
                      <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                                  rounded-full">
                        <font-awesome-icon icon="dollar-sign"/>
                      </div>
                    </div>
                    <div class="w-10/12">
                      El monto máximo varía según tu cuenta
                    </div>
                  </div>
                  <div class=" px-2 font-regular flex flex-wrap items-center
                    text-gray-700 py-2 text-sm">
                    Se usará esta cuenta:
                  </div>
                  <div class="px-2 py-2">
                    <button @click='moveTo("select-account")'
                      class="w-full border-gray-200 shadow-xs hover:shadow-md py-2 px-1 rounded
                      transition ease-in-out duration-150">
                    <div class="items-center text-sm mt-1">
                        <div class="flex text-left items-center">
                          <div class="w-1/5 px-2">
                            <input type="radio" class="form-radio h-4 w-4" checked>
                          </div>
                          <div class="w-4/5 px-1">
                            <p> {{ selectedAccount.name }}</p>
                            <p> {{ selectedAccount.number }}</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                  <button @click="handleConfirmSubscription"
                    type="submit"
                    class="group relative w-full justify-center py-3 px-4 border
                          border-transparent text-l leading-5 rounded-md
                          text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                          focus:shadow-outline-indigo active:bg-indigo-700 transition
                          duration-150 ease-in-out mt-4 tracking-wide 'hover:bg-indigo-500'">
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="second-factor"'>
          <div class="py-6 px-6 text-gray-800 flex justify-between">
            <button @click="moveTo('intro')" class="text-gray-700">
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 class="text-l">Segundo Factor</h1>
            <button @click="cancelLinkCreation" class="text-gray-700">
              <font-awesome-icon icon="times"/>
            </button>
          </div>
          <hr>
          <div class="relative">
            <spinner v-if="showSpinner">
            </spinner>
            <div class="flex-1 px-6 py-2">
              <div class="h-full">
                <img class="bank-logo h-24 rounded object-cover mx-auto"
                    :src="bank.logo" />
                <div class="flex flex-col justify-between py-2">
                  <div>
                    <div class="text-base font-regular flex flex-wrap items-center py-2">
                      <div class="w-2/12">
                        <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                                    rounded-full">
                          <font-awesome-icon icon="handshake"/>
                        </div>
                      </div>
                      <div class="w-10/12">
                        Sólo falta ingresar el segundo factor
                      requerido por tu banco
                      </div>
                    </div>
                    <div class="text-base font-regular flex flex-wrap items-center py-2">
                      <div class="w-2/12">
                        <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                                    rounded-full">
                          <font-awesome-icon icon="lock"/>
                        </div>
                      </div>
                      <div class="w-10/12">
                        Por favor ingresa el código {{ secondFactorTypeText }}
                      </div>
                    </div>
                    <div v-if='secondFactorAction.type === "enter_card_code"'
                      class="flex mx-12">
                      <input
                        v-for="(v, index) in $v.cardCoordinates.$each.$iter"
                        :key="index"
                        type="password"
                        maxlength="2"
                        class="w-1/3 appearance-none block w-full bg-grey-lighter text-grey-900
                          border border-grey-lighter rounded py-3 px-2 mx-2 leading-tight
                          focus:outline-none focus:shadow-sm mt-4 text-center"
                        :class="{ 'border-red-500': $v.secondFactor.$error }"
                        :placeholder="secondFactorAction.coordinates[index]"
                        v-model.trim.lazy="v.value.$model">
                    </div>
                    <div v-else>
                      <input
                        type="password"
                        class="appearance-none block w-full bg-grey-lighter text-grey-900
                          border border-grey-lighter rounded py-3 px-4 leading-tight
                          focus:outline-none focus:shadow-sm mt-4"
                        :class="{ 'border-red-500': $v.secondFactor.$error }"
                        placeholder="Código segundo factor"
                        v-model.trim.lazy="$v.secondFactor.$model">
                    </div>
                  </div>
                  <button @click="submitSecondFactor"
                    type="submit"
                    class="group relative w-full justify-center mt-6 py-3 px-4 border
                          border-transparent text-l leading-5 rounded-md
                          text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                          focus:shadow-outline-indigo active:bg-indigo-700 transition
                          duration-150 ease-in-out mt-4 tracking-wide 'hover:bg-indigo-500'">
                    Autorizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="subscription-completed"'>
          <div class="py-6 px-6 text-gray-800 flex justify-between">
            <button @click="moveTo('intro')" class="text-gray-700">
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 class="text-l">Confirmación</h1>
            <button @click="cancelLinkCreation" class="text-gray-700">
              <font-awesome-icon icon="times"/>
            </button>
          </div>
          <hr>
          <div class="relative">
            <spinner v-if="showSpinner">
            </spinner>
            <div class="flex-1 px-6 py-2">
              <div class="h-full">
                <img class="bank-logo h-24 rounded object-cover mx-auto"
                    :src="bank.logo" />
                <div class="flex flex-col content-center text-center my-2">
                  <div class="mb-4">
                    <div class="bg-gray-100 shadow w-24 h-24 p-1
                                rounded-full m-auto justify-center flex">
                      <font-awesome-icon class="m-auto fa-2x" icon="check"/>
                    </div>
                  </div>
                  <div class="text-2xl my-3 text-center leading-tight">
                    Te conectaste exitosamente con Fintual
                  </div>

                  <div class="h-full">
                    <button @click="handleSubscriptionExit"
                      type="submit"
                      class="group relative w-full justify-center py-3 px-4 border
                            border-transparent text-l leading-5 rounded-md
                            text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                            focus:shadow-outline-indigo active:bg-indigo-700 transition
                            duration-150 ease-in-out mt-4 tracking-wide hover:bg-indigo-500">
                      Continuar
                    </button>
                  </div>
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
          <hr>
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
                    <p class="font-semibold">Tuvimos un problema con tus credenciales</p>
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
</div>
</template>
<script>

import { required, requiredIf } from 'vuelidate/lib/validators';
import { individualRut, businessRut } from '../../validators/rut_validator';
import Spinner from '../spinner.vue';
import { availableBanks } from '../../banks-helper';
import { getValidUrl } from '../../helpers/widget_helper';
import errorObject from '../../helpers/error_object';
import apiClient from '../../api';

const LINK_STEPS = [
  'intro',
  'select-bank',
  'bank-log-in',
  'error',
];
const SUBSCRIPTION_STEPS = [
  'confirm-subscription',
  'select-account',
  'second-factor',
  'subscription-completed',
  'error',
];
const PERMITTED_STEPS = [...LINK_STEPS, ...SUBSCRIPTION_STEPS];
const FIRST_STEP = PERMITTED_STEPS[0];

export default {
  data() {
    return {
      bank: '',
      rut: '',
      password: '',
      holderId: '',
      currentStep: FIRST_STEP,
      errorCode: '',
      showSpinner: false,
      accounts: [],
      selectedAccount: {},
      linkToken: '',
      secondFactor: '',
      cardCoordinates: [{ value: '' }, { value: '' }, { value: '' }],
      subscription: {},
      subscriptionResult: '',
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
    requestType: {
      type: String,
      default: '',
    },
  },
  components: {
    Spinner,
  },
  validations() {
    if (this.currentWizard === 'link') {
      return {
        holderType: {
          required,
        },
        rut: {
          required,
          rutValidator: individualRut,
        },
        holderId: {
          required: requiredIf('isBusiness'),
          rutValidator: (value) => businessRut(value) || value === '',
        },
        password: {
          required,
        },
      };
    }

    return {
      secondFactor: {
        required: requiredIf(() => !this.cardCodeAction),
      },
      cardCoordinates: {
        $each: {
          value:
          {
            required: requiredIf('cardCodeAction'),
            lenghtValidator: (value) => value.length === 2,
          },
        },
      },
    };
  },
  computed: {
    holderType() {
      return this.$route.query['holder-type'] || this.$route.query.holder_type;
    },
    customerId() {
      return this.$route.query.holder_type;
    },
    isBusiness() {
      return this.holderType === 'business';
    },
    supportedBanks() {
      return availableBanks.filter((bank) => bank.holderTypes[this.holderType] === true);
    },
    currentWizard() {
      if (LINK_STEPS.includes(this.currentStep)) return 'link';
      return 'subscription';
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
    secondFactorAction() {
      return this.subscription.next_action || { type: '', coordinates: [] };
    },
    cardCodeAction() {
      return this.secondFactorAction.type === 'enter_card_code';
    },
    getSecondFactorCode() {
      if (this.cardCodeAction) {
        return this.cardCoordinates.map((item) => item.value).join('');
      }

      return this.secondFactor;
    },
    secondFactorTypeText() {
      switch (this.secondFactorAction.type) {
        case 'device_code':
          return 'de tu digipass';
        case 'sms_code':
          return 'que fue enviado a tu teléfono';
        case 'enter_card_code':
          return 'de tu tarjeta de coordenadas';
        case 'in_app':
          return 'Unsupported yet';
        default:
          return '';
      }
    },
  },
  methods: {
    cancelLinkCreation() {
      const redirectToUrl = this.$route.query.redirect_to;
      if (redirectToUrl) {
        const validRedirectToURL = getValidUrl(redirectToUrl);
        const resultIsUserExited = 'result=user_exited';
        window.location = `${validRedirectToURL}?${resultIsUserExited}`;
      } else {
        this.$router.push('/links');
      }
    },
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

      return { link_data: formFields, ...this.extraFields };
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
          if (this.requestType === 'subscription') {
            this.handleFetchedAccounts(response.data.accounts);
            this.linkToken = response.data.link_token;
            this.moveTo('confirm-subscription');
          }
        })
        .catch((error) => {
          this.errorCode = error.response != null ? error.response.data.error.code : 'unknown';
          this.redirectIfApiKeyError(error.response);
          this.trackLinkCreationFailedEvent(formData, this.errorCode);
          this.currentStep = 'error';
          this.showSpinner = false;
        });
    },
    handleFetchedAccounts(accounts) {
      const permittedAccountTypes = ['checking_account', 'sight_account'];
      this.accounts = this.sortAccounts(
        accounts.filter((account) => permittedAccountTypes.includes(account.type)),
      );

      [this.selectedAccount] = this.accounts;
    },
    handleAccountSelection(account) {
      this.selectedAccount = account;
      this.moveTo('confirm-subscription');
    },
    handleConfirmSubscription() {
      this.showSpinner = true;
      apiClient.subscriptions.create(this.selectedAccount.id,
        this.customerId,
        this.linkToken,
        this.headers)
        .then((response) => {
          this.subscription = response.data;
          this.showSpinner = false;
          this.moveTo('second-factor');
        })
        .catch((error) => {
          this.errorCode = error.response != null ? error.response.data.error.code : 'unknown';
          this.currentStep = 'error';
          this.showSpinner = false;
        });
    },
    submitSecondFactor() {
      if (this.$v.$invalid) { return; }

      this.showSpinner = true;
      const data = { code: this.getSecondFactorCode, linktoken: this.linkToken };
      apiClient.subscriptions.update(this.subscription.id,
        data,
        this.headers)
        .then((response) => {
          this.subscriptionResult = response.data.result;
          this.showSpinner = false;
          this.moveTo('subscription-completed');
        })
        .catch((error) => {
          this.showSpinner = false;
          this.errorCode = error.response != null ? error.response.data.error.code : 'unknown';
          this.currentStep = 'error';
        });
    },
    handleSubscriptionExit() {
      const payload = { result: '', subscription: this.subscription };
      this.$emit('subscriptionCreateSuccess', payload);
    },
    sortAccounts(accounts) {
      let orderedAccounts = this.orderAccountsByName(accounts);
      orderedAccounts = this.orderAccountsByAmount(orderedAccounts);

      return orderedAccounts;
    },
    orderAccountsByAmount(accounts) {
      return accounts.sort((a, b) => b.balance.available - a.balance.available);
    },
    orderAccountsByName(accounts) {
      return accounts.sort((a, b) => {
        if (a.name < b.name) return -1;
        return a.name > b.name ? 1 : 0;
      });
    },
    trackLinkCreatedEvent(responseData) {
      window.analytics.track('Link Created', {
        link_id: responseData.id,
        institution_id: responseData.institution.id,
        holder_type: responseData.holder_type,
        holder_id: responseData.holder_id,
        username: responseData.username,
        created_through: this.createdThrough,
      });
    },
    trackLinkCreationFailedEvent(formData, errorCode) {
      window.analytics.track('Link Creation Failed', {
        error_code: errorCode,
        institution_id: formData.link_data.institution_id,
        holder_type: formData.link_data.holder_type,
        username: formData.link_data.username,
        holder_id: formData.link_data.holder_id,
        created_through: this.createdThrough,
      });
    },
    redirectIfApiKeyError(errorResponse) {
      if (this.errorCode === 'invalid_api_key') {
        const error = errorObject;
        // TODO: redirect to 401 with errorResponse.data.error.type
        error.type = 'invalid_request_error';
        error.code = this.errorCode;
        error.message = errorResponse.data.error.message;
        error.param = 'public_key';

        this.$router.push({
          name: 'error',
          params: { error },
        });
      }
    },
    touchIfPresentElseReset(field) {
      if (field.$model !== '') {
        field.$touch();
      } else {
        field.$reset();
      }
    },
  },
};
</script>

<style scoped>
.link-frame {
  height: 500px;
  width: 360px;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity .2s ease;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .5s ease;
}

.vertical-slide-fade-enter,
.vertical-slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-18px);
}

.vertical-slide-fade-enter-active,
.vertical-slide-fade-leave-active {
  transition: all .5s ease;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
}
</style>
