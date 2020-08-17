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
                          duration-150 ease-in-out mt-4 hover:bg-indigo-500 tracking-wide"
                    id="intro-continue-btn">
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
          <widget-nav>
            <button @click="moveTo('intro')" slot='backButton'>
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 slot='currentStepText' >Selecciona tu banco</h1>
            <button @click="cancelLinkCreation" slot='closeButton'>
              <font-awesome-icon icon="times"/>
            </button>
          </widget-nav>
          <hr>
          <div class="flex-1 p-4">
            <div class="h-full">
              <div
                class="grid grid-cols-2 gap-2 p-2 h-24"
                id="bank-btns-container"
              >
                <button v-for="bank in supportedBanks"
                        v-bind:key='bank.code'
                        @click='selectBank(bank)'
                        class="border-gray-200 shadow-xs hover:shadow-md py-3 px-1 rounded
                        transition ease-in-out duration-150">
                  <img class="bank-logo h-6 w-auto rounded object-cover mx-auto"
                       :src="bank.logo[holderType]" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="bank-log-in"' class='h-full flex flex-col' :key="currentStep">
          <widget-nav>
            <button @click="moveTo('select-bank')" slot='backButton'>
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 slot='currentStepText' >Ingresa</h1>
            <button @click="cancelLinkCreation" slot='closeButton' id="exit-btn">
              <font-awesome-icon icon="times"/>
            </button>
          </widget-nav>
          <hr>
          <div class="relative flex-1">
            <spinner v-if="showSpinner">
              <p class="mt-6 text-center text-gray-800 font-medium text-sm w-48">
                Nos demoraremos 40 segundos como máximo  ⌛
              </p>
            </spinner>
            <div class="h-full flex flex-col px-6 py-6"
                 :class="{ 'justify-between': holderType === 'business' }">
              <img class="bank-logo h-12 rounded object-cover mx-auto"
                   :src="bank.logo[holderType]" />
              <div class="pt-6">
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
                            id='rut-input'
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
                          id="holder-id-input"
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
                          v-model.trim="$v.password.$model"
                          id='password-input'>
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
                        @click="submitLinkIntent"
                        :class="{ 'hover:bg-indigo-500': !$v.$invalid,
                                  'cursor-not-allowed': $v.$invalid }"
                        id="bank-login-submit-btn">
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
          <widget-nav>
            <button @click="moveTo('confirm-subscription')" slot='backButton'>
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 slot='currentStepText' >Selecciona una cuenta</h1>
            <button @click="cancelLinkCreation" slot='closeButton'>
              <font-awesome-icon icon="times"/>
            </button>
          </widget-nav>
          <hr>
          <div class="flex-1 px-6 py-6">
            <div class="h-full">
              <img class="bank-logo h-12 rounded object-cover mx-auto"
                  :src="bank.logo[holderType]" />
              <div class="text-center py-6 px-4 text-gray-900">
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
        <div v-if='currentStep==="confirm-subscription"'
             class='h-full flex flex-col'
             :key="currentStep">
          <widget-nav>
            <button @click="moveTo('intro')" slot='backButton'>
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 slot='currentStepText' >Confirmación</h1>
            <button @click="cancelLinkCreation" slot='closeButton'>
              <font-awesome-icon icon="times"/>
            </button>
          </widget-nav>
          <hr>
          <div class="relative flex-1">
            <spinner v-if="showSpinner">
              <p class="mt-6 w-48 text-center text-gray-800 font-medium text-sm">
                Nos demoraremos 20 segundos como máximo  ⌛
              </p>
            </spinner>
            <div class="h-full flex flex-col justify-between px-6 py-6 text-gray-900">
              <img class="bank-logo h-12 rounded object-cover mx-auto"
                   :src="bank.logo[holderType]" />
              <div>
                <div class="text-base font-regular flex flex-wrap items-center h-12">
                  <div class="w-2/12">
                    <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                                rounded-full">
                      <font-awesome-icon icon="building"/>
                    </div>
                  </div>
                  <div
                    id="company-connect-text"
                    class="w-10/12"
                  >
                    Vas a conectar tu cuenta con {{ subscribableCompanyName }}
                  </div>
                </div>
                <div class="text-base font-regular flex flex-wrap items-center h-12 mt-2">
                  <div class="w-2/12">
                    <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                                rounded-full">
                      <font-awesome-icon icon="dollar-sign"/>
                    </div>
                  </div>
                  <div class="w-10/12">
                    La conexión permite realizar transferencias desde la aplicación
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="font-regular text-gray-700 text-sm pb-2">
                  Se usará esta cuenta:
                </div>
                <div class="py-2">
                  <button @click='moveTo("select-account")'
                    class="w-full border-gray-200 shadow-xs hover:shadow-md py-4 px-1 rounded
                           transition ease-in-out duration-150">
                    <div class="text-sm flex flex-wrap items-center text-left">
                      <div class="w-2/12">
                        <div class="px-2 h-4">
                          <input type="radio" class="form-radio h-4 w-4" checked>
                        </div>
                      </div>
                      <div class="w-10/12">
                        <p class="font-medium">{{ selectedAccount.name }}</p>
                        <p>{{ selectedAccount.number }}</p>
                      </div>
                    </div>
                  </button>
                </div>
                <button @click="handleConfirmSubscription"
                  type="submit"
                  class="group relative w-full justify-center py-4 px-4 border mt-2
                        border-transparent text-l leading-5 rounded-md
                        text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                        focus:shadow-outline-indigo active:bg-indigo-700 transition
                        duration-150 ease-in-out tracking-wide 'hover:bg-indigo-500'"
                  id='confirm-subscription-btn'
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="second-factor"' class="h-full flex flex-col" :key="currentStep">
          <widget-nav>
            <button @click="moveTo('confirm-subscription')" slot='backButton'>
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 slot='currentStepText' >Segundo Factor</h1>
            <button @click="cancelLinkCreation" slot='closeButton'>
              <font-awesome-icon icon="times"/>
            </button>
          </widget-nav>
          <hr>
          <div class="relative flex-1">
            <spinner v-if="showSpinner">
            </spinner>
            <div class="h-full flex flex-col justify-between px-6 py-6">
              <img class="bank-logo h-12 rounded object-cover mx-auto"
                    :src="bank.logo[holderType]" />
              <div>
                <div class="text-base font-regular flex flex-wrap items-center h-12">
                  <div class="w-2/12 text-gray-900">
                    <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                                rounded-full text-gray-900">
                      <font-awesome-icon icon="handshake"/>
                    </div>
                  </div>
                  <div class="w-10/12 text-gray-900">
                    Sólo falta ingresar el segundo factor requerido por tu banco
                  </div>
                </div>
                <div class="text-base font-regular flex flex-wrap items-center h-12">
                  <div class="w-2/12">
                    <div class="bg-gray-100 shadow w-8 h-8 p-1 text-center align-middle
                                rounded-full text-green-700">
                      <font-awesome-icon icon="lock"/>
                    </div>
                  </div>
                  <div class="w-10/12 text-gray-900">
                    Por favor ingresa el código {{ secondFactorTypeText }}
                  </div>
                </div>
              </div>
              <div class=''>
                <div class='h-20'>
                  <div v-if='cardCodeAction'
                    class="flex mx-12">
                    <input
                      v-for="(v, index) in $v.cardCoordinates.$each.$iter"
                      :key="index"
                      type="password"
                      maxlength="2"
                      class="appearance-none block w-full bg-grey-lighter text-grey-900
                        border border-grey-lighter rounded py-4 px-2 mx-2 leading-tight
                        focus:outline-none focus:shadow-sm text-center"
                      :class="{ 'border-red-500': $v.secondFactor.$error }"
                      :placeholder="secondFactorAction.challenges[index]"
                      v-model.trim.lazy="v.value.$model"
                      :id="`challenge-${index}`"
                    >
                  </div>
                  <div v-else>
                    <input
                      type="password"
                      class="appearance-none block w-full bg-grey-lighter text-grey-900
                        border border-grey-lighter rounded py-4 px-4 leading-tight
                        focus:outline-none focus:shadow-sm"
                      :class="{ 'border-red-500': $v.secondFactor.$error }"
                      placeholder="Código segundo factor"
                      v-model.trim.lazy="$v.secondFactor.$model"
                      id='single-code-second-factor-input'
                    >
                  </div>
                </div>
                <button @click="submitSecondFactor"
                  type="submit"
                  class="group relative w-full justify-center py-4 px-4 border
                        border-transparent text-l leading-5 rounded-md
                        text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                        focus:shadow-outline-indigo active:bg-indigo-700 transition
                        duration-150 ease-in-out tracking-wide 'hover:bg-indigo-500'"
                      id='second-factor-auth-btn'
                >
                  Autorizar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="wait-for-app"' class="h-full flex flex-col" :key="currentStep">
          <widget-nav>
            <button @click="moveTo('confirm-subscription')" slot='backButton'>
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 slot='currentStepText' >Confirmación</h1>
            <button @click="cancelLinkCreation" slot='closeButton'>
              <font-awesome-icon icon="times"/>
            </button>
          </widget-nav>
          <hr>
          <div class="relative">
            <div class="flex-1 px-6 py-6">
              <div class="h-full">
                <img class="bank-logo h-12 rounded object-cover mx-auto"
                      :src="bank.logo[holderType]" />
                <div class="flex flex-col content-center text-center py-6">
                  <div class="m-8">
                    <vue-element-loading :active="true" :spinner="'bar-fade-scale'">
                    </vue-element-loading>
                  </div>
                  <div class="text-2xl my-3 text-center leading-tight">
                    {{ secondFactorTypeText }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="subscription-completed"'
             class='h-full flex flex-col'
             :key="currentStep">
          <widget-nav>
            <button @click="moveTo('confirm-subscription')" slot='backButton'>
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 slot='currentStepText' >Confirmación</h1>
            <button @click="cancelLinkCreation" slot='closeButton'>
              <font-awesome-icon icon="times"/>
            </button>
          </widget-nav>
          <hr>
          <div class="relative flex-1">
            <spinner v-if="showSpinner">
            </spinner>
            <div class="h-full flex flex-col justify-between px-6 py-6">
              <img class="bank-logo h-12 rounded object-cover mx-auto"
                   :src="bank.logo[holderType]" />
              <div class="bg-gray-100 shadow w-24 h-24 py-2
                          rounded-full m-auto justify-center flex">
                <font-awesome-icon class="m-auto fa-2x" icon="check"/>
              </div>
              <div class="text-2xl text-center leading-tight py-4">
                Te conectaste exitosamente con {{ subscribableCompanyName }}
              </div>
              <button @click="handleSubscriptionExit"
                type="submit"
                class="group relative w-full justify-center py-4 px-4 border
                      border-transparent text-l leading-5 rounded-md
                      text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                      focus:shadow-outline-indigo active:bg-indigo-700 transition
                      duration-150 ease-in-out mt-4 tracking-wide hover:bg-indigo-500"
                id="subscription-exit-btn"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
        <div v-if='currentStep==="error"'
             class='h-full flex flex-col'
             :key="currentStep">
          <widget-nav>
            <button @click="moveTo('bank-log-in')" slot='backButton'>
              <font-awesome-icon icon="chevron-left"/>
            </button>
            <h1 slot='currentStepText' >Error</h1>
          </widget-nav>
          <hr>
          <div class="flex-1 p-6 flex flex-col justify-between">
            <img class="bank-logo h-12 rounded object-cover mx-auto"
                :src="this.bank.logo[holderType]"/>
            <div class="bg-gray-100 shadow w-24 h-24 rounded-full m-auto justify-center flex
                        text-gray-900">
              <font-awesome-icon class="m-auto fa-2x" icon="times"/>
            </div>
            <div class="py-4">
              <div class="text-center text-red-900">
                <p class="font-semibold">Tuvimos un problema</p>
                <p class="text-sm">{{ textError }}</p>
                <p class='text-xs py-2' v-if="bank.specialIndication[holderType]">
                  * {{ bank.specialIndication[holderType] }}
                </p>
              </div>
            </div>
            <button @click="moveTo('bank-log-in')"
                  type="submit"
                  class="group relative w-full flex justify-center py-4 px-4 border
                        border-transparent text-l leading-5 rounded-md
                        text-white bg-indigo-600 focus:outline-none focus:border-indigo-700
                        focus:shadow-outline-indigo active:bg-indigo-700 transition
                        duration-150 ease-in-out mt-4 hover:bg-indigo-500 tracking-wide">
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

import { required, requiredIf, helpers } from 'vuelidate/lib/validators';
import VueElementLoading from 'vue-element-loading';
import { individualRut, businessRut } from '../../validators/rut_validator';
import Spinner from '../spinner.vue';
import WidgetNav from './widget-nav.vue';
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
  'wait-for-app',
  'subscription-completed',
  'error',
];
const PERMITTED_STEPS = [...LINK_STEPS, ...SUBSCRIPTION_STEPS];
const FIRST_STEP = PERMITTED_STEPS[0];
const SUBSCRIPTION_ACCEPTED_STATUSES = ['succeeded', 'unknown'];

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
      linkId: '',
      linkIntent: '',
      secondFactor: '',
      cardCoordinates: [{ value: '' }, { value: '' }, { value: '' }],
      subscription: {},
      pollingForStatusChange: false,
      subscribableCompanyName: '',
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
    VueElementLoading,
    WidgetNav,
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
            lenghtValidator: (value) => !helpers.req(value) || value.length === 2,
          },
        },
      },
    };
  },
  beforeMount() {
    if (this.requestType === 'subscription') {
      apiClient.widgetConfig.get(this.headers).then(({ data }) => {
        this.subscribableCompanyName = data.companyName;
      });
    }
  },
  computed: {
    holderType() {
      return this.$route.query['holder-type'] || this.$route.query.holder_type;
    },
    customerId() {
      return this.$route.query.customer_id;
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
        case 'credentials_locked':
          return 'Credenciales bloqueadas';
        case 'unavailable_institution':
          return 'Parece que estamos con problemas. Si el problema sigue escríbele a elliot@fintoc.com';
        case 'not_implemented_institution':
          return 'Lamentablemente esta institución no la hemos implementado. Escríbele a elliot@fintoc.com';
        case 'invalid_2f':
          return 'El código ingresado no es correcto, por favor intenta nuevamente';
        default:
          return 'No pudimos conectarnos con el banco. Si el problema persiste, intenta más tarde';
      }
    },
    secondFactorAction() {
      return this.subscription.nextAction || { type: '', challenges: [] };
    },
    cardCodeAction() {
      return this.secondFactorAction.type === 'enter_coordinates';
    },
    getSecondFactor() {
      if (this.cardCodeAction) {
        return this.cardCoordinates.map((item) => item.value);
      }

      return this.secondFactor;
    },
    secondFactorTypeText() {
      switch (this.secondFactorAction.type) {
        case 'enter_device_code':
          return 'de tu digipass';
        case 'enter_sms_code':
          return 'que fue enviado a tu teléfono';
        case 'enter_coordinates':
          return 'de tu tarjeta de coordenadas';
        case 'authorize_in_app':
          return 'Acepta la suscripción en la aplicación de tu teléfono para continuar';
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
      this.trackWidgetStepCompletedEvent(step);
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

      return {
        link_data: { ...formFields, product: this.requestType }, ...this.extraFields,
      };
    },

    handleFetchedAccounts(accounts) {
      const permittedAccountTypes = ['checking_account', 'sight_account'];
      this.accounts = this.sortAccounts(
        accounts.filter((account) => permittedAccountTypes.includes(account.type)),
      );

      [this.selectedAccount] = this.accounts;
    },

    handleSubscriptionLinkResponse(linkResponse) {
      this.handleFetchedAccounts(linkResponse.data.accounts);
      this.moveTo('confirm-subscription');
    },

    handleSucceededLinkIntent(linkIntentResponse) {
      const { link } = linkIntentResponse;
      this.linkId = link.id;
      this.linkToken = link.temporaryLinkToken;
      if (this.requestType === 'subscription') {
        this.handleFetchedAccounts(link.accounts);
        this.moveTo('confirm-subscription');
      }
      this.showSpinner = false;
      clearTimeout(this.interval);
      this.trackLinkCreatedEvent(link);
      this.$emit('linkCreated', link);
    },

    handleLinkIntentResponse(linkIntentResponse) {
      const { status } = linkIntentResponse;
      if (status === 'succeeded') {
        this.handleSucceededLinkIntent(linkIntentResponse);
      } else if (status === 'rejected') {
        this.errorCode = linkIntentResponse.reason || 'invalid_credentials';
        this.stopSpinnerClearIntervalAndMove(this.interval, 'error');
        this.trackLinkCreationFailedEvent(this.errorCode);
      } else if (status === 'failed') {
        this.stopSpinnerClearIntervalAndMove(this.interval, 'error');
        this.trackLinkCreationFailedEvent(this.errorCode);
      }
    },

    linkIntentPolling() {
      apiClient.linkIntents.get(this.linkIntent.id, this.headers, this.createdThrough)
        .then((response) => {
          this.handleLinkIntentResponse(response.data);
        })
        .catch((error) => {
          this.errorCode = 'unknown';
          if (error.response && error.response.data.error) {
            this.errorCode = error.response.data.error.code;
          }
          this.stopSpinnerClearIntervalAndMove(this.interval, 'error');
        });
    },

    pollForLinkIntent() {
      this.interval = setInterval(this.linkIntentPolling, 1000);
    },

    submitLinkIntent() {
      if (this.$v.$invalid || this.showSpinner) { return; }

      this.showSpinner = true;
      const formData = this.getFormData();

      this.trackWidgetStepCompletedEvent(null);
      apiClient.linkIntents.create(formData, this.headers, this.createdThrough)
        .then((response) => {
          this.linkIntent = response.data;
          this.pollForLinkIntent();
        })
        .catch((error) => {
          this.errorCode = error.response != null ? error.response.data.error.code : 'unknown';
          this.redirectIfApiKeyError(error.response);
          this.trackLinkCreationFailedEvent(this.errorCode);
          this.currentStep = 'error';
          this.showSpinner = false;
        });
    },

    handleAccountSelection(account) {
      this.selectedAccount = account;
      this.moveTo('confirm-subscription');
    },
    handleConfirmSubscription() {
      if (this.showSpinner) { return; }

      this.showSpinner = true;
      apiClient.subscriptions.create(this.selectedAccount.id,
        this.customerId,
        this.linkToken,
        this.headers)
        .then((response) => {
          this.subscription = response.data;
          this.pollForSubscription();
        })
        .catch((error) => {
          this.errorCode = error.response != null ? error.response.data.error.code : 'unknown';
          this.currentStep = 'error';
          this.showSpinner = false;
          this.trackSubscriptionCreationFailedEvent();
        })
        .finally(() => {
          this.pollingForStatusChange = false;
        });
    },
    submitSecondFactor() {
      if (this.$v.$invalid || this.showSpinner) { return; }

      this.showSpinner = true;
      const data = { secondFactor: this.getSecondFactor, linkToken: this.linkToken };
      this.pollingForStatusChange = true;
      apiClient.subscriptions.update(this.subscription.id,
        data,
        this.headers)
        .then(() => {
          this.pollForSubscription();
        })
        .catch((error) => {
          this.showSpinner = false;
          this.errorCode = error.response != null ? error.response.data.error.code : 'unknown';
          this.currentStep = 'error';
          this.trackSubscriptionCreationFailedEvent();
        });
    },
    handleSubscriptionExit() {
      const payload = {
        subscription: this.subscription,
        account: this.selectedAccount,
        linkId: this.linkId,
      };
      this.trackWidgetStepCompletedEvent(null);
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
    pollForSubscription() {
      this.interval = setInterval(this.subscriptionPolling, 1000);
    },
    subscriptionPolling() {
      apiClient.subscriptions.get(this.subscription.id,
        this.linkToken,
        this.headers)
        .then((response) => {
          this.subscription.status = response.data.status;
          this.subscription.nextAction = response.data.nextAction;
          this.handleSubscriptionStatus(this.subscription.status);
        })
        .catch((error) => {
          this.errorCode = error.response != null ? error.response.data.error.code : 'unknown';
          this.currentStep = 'error';
          this.trackSubscriptionCreationFailedEvent();
        });
    },
    handleSubscriptionStatus(status) {
      if (status === 'requires_action') {
        this.handleSubscriptionAction(this.secondFactorAction);
      } else if (SUBSCRIPTION_ACCEPTED_STATUSES.includes(status)) {
        this.stopSpinnerClearIntervalAndMove(this.interval, 'subscription-completed');
        this.trackSubscriptionCreatedEvent();
      } else if (status === 'rejected') {
        this.errorCode = 'invalid_2f';
        this.stopSpinnerClearIntervalAndMove(this.interval, 'error');
        this.trackSubscriptionCreationFailedEvent();
      } else if (status === 'failed') {
        this.stopSpinnerClearIntervalAndMove(this.interval, 'error');
        this.trackSubscriptionCreationFailedEvent();
      }
    },
    handleSubscriptionAction(action) {
      if (this.pollingForStatusChange) { return; }

      if (action.type === 'authorize_in_app') {
        // Polling continues until authorized
        this.showSpinner = false;
        this.moveTo('wait-for-app');
      } else {
        this.stopSpinnerClearIntervalAndMove(this.interval, 'second-factor');
      }
    },
    stopSpinnerClearIntervalAndMove(interval, nextStep) {
      this.showSpinner = false;
      clearTimeout(interval);
      this.moveTo(nextStep);
    },
    trackLinkCreatedEvent(link) {
      window.analytics.track('Link Created', {
        link_id: link.id,
        institution_id: link.institution.id,
        holder_type: link.holder_type,
        holder_id: link.holder_id,
        username: link.username,
        created_through: this.createdThrough,
        product: this.requestType,
      });
    },
    trackWidgetStepCompletedEvent(nextStep) {
      if (this.currentStep === 'confirm-subscription' && nextStep === 'select-account') {
        // Don't track step completed because moving to 'select-account' is not actually completing
        // the 'confirm-subscription' event
        return;
      }

      const properties = this.getComponentPropertiesToTrack();
      window.analytics.track('Widget Step Completed', {
        step: this.currentStep,
        product: this.requestType,
        ...properties,
      });
    },
    trackLinkCreationFailedEvent(errorCode) {
      const properties = this.getComponentPropertiesToTrack();
      window.analytics.track('Link Creation Failed', {
        error_code: errorCode,
        institution_id: properties.institution_id,
        holder_type: properties.holder_type,
        username: properties.username,
        holder_id: properties.holder_id,
        created_through: this.createdThrough,
      });
    },
    trackSubscriptionCreationFailedEvent() {
      const properties = this.getComponentPropertiesToTrack();
      window.analytics.track('Subscription Creation Failed', {
        error_code: this.errorCode,
        ...properties,
      });
    },
    trackSubscriptionCreatedEvent() {
      const properties = this.getComponentPropertiesToTrack();
      window.analytics.track('Subscription Created', {
        ...properties,
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
    getComponentPropertiesToTrack() {
      return {
        institution_id: this.bank ? this.bank.code : null,
        username: this.rut ? this.rut.replace(/[-.]/g, '') : null,
        holder_id: this.holderId ? this.holderId.replace(/[-.]/g, '') : null,
        holder_type: this.holderType,
        link_id: this.linkId ? this.linkId : null,
        selected_account: this.selectedAccount.id,
        subscription_id: this.subscription.id,
        customer_id: this.customerId ? this.customerId : null,
      };
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
