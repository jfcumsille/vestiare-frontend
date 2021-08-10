<template>
<div class="min-h-screen flex flex-col">
  <spinner v-if='showSpinner'></spinner>
  <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <img class="mx-auto h-12 w-auto" src="../assets/images/fintoc-isologo.svg" alt="fintoc" />
    <div v-show="!completed">
      <h1 class="m-5 text-4xl text-center font-regular text-gray-900">
        Regístrate acá 👇
      </h1>
      <div class="w-full">
        <div class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3
                    shadow-md mb-4 mt-2"
            role="alert"
            v-if='showFormError'>
          <div class="flex">
            <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>
              <p class="font-semibold">Tuvimos un problema con el registro</p>
              <p class="text-sm">
                Si el problema persiste escríbenos a sos@fintoc.com. Respondemos muy rápido
              </p>
            </div>
          </div>
        </div>
        <oauth-panel
          :signs-up="true"
          @start-loading="showSpinner = true"
          @stop-loading="showSpinner = false"
          @set-token="idToken = $event"
          @submit="onSubmit" />
        <hr class="mt-6 mx-auto w-4/5 block border-gray-400" />
        <form @submit.prevent="onSubmit" method="POST">
          <div class="h-20 mt-6">
            <div class="w-full flex flex-col">
              <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-900
                        border border-grey-lighter rounded py-4 px-4 leading-tight
                        focus:outline-none focus:shadow-sm"
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  @blur='touchIfPresentElseReset($v.name)'
                  v-model.trim.lazy="$v.name.$model"
              >
              <transition name="vertical-slide-fade">
                <p
                  class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                  v-if="name !== ''"
                >
                  Nombre
                </p>
              </transition>
            </div>
            <div class='text-red-700 text-xs' v-if="!$v.name.minLength">
              Ingresa un nombre válido 👮🏽‍♀
            </div>
            <div class='text-red-700 text-xs' v-if="!$v.name.required && $v.name.$error">
              Este campo es obligatorio
            </div>
          </div>

          <div class="h-20">
            <div class="w-full flex flex-col">
              <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-900
                        border border-grey-lighter rounded py-4 px-4 leading-tight
                        focus:outline-none focus:shadow-sm"
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  @blur='touchIfPresentElseReset($v.lastName)'
                  v-model.trim.lazy="$v.lastName.$model"
              >
              <transition name="vertical-slide-fade">
                <p
                  class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                  v-if="lastName !== ''"
                >
                  Apellido
                </p>
              </transition>
            </div>
            <div class='text-red-700 text-xs' v-if="!$v.lastName.minLength">
              Ingresa un apellido válido 👮🏽‍♀️
            </div>
            <div class='text-red-700 text-xs' v-if="!$v.lastName.required && $v.lastName.$error">
              Este campo es obligatorio
            </div>
          </div>

          <div class="h-20">
            <div class="w-full flex flex-col">
              <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-900
                        border border-grey-lighter rounded py-4 px-4 leading-tight
                        focus:outline-none focus:shadow-sm"
                  type="email"
                  name="email"
                  placeholder="Email"
                  @blur='touchIfPresentElseReset($v.email)'
                  v-model.trim.lazy="$v.email.$model"
              >
              <transition name="vertical-slide-fade">
                <p
                  class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                  v-if="email !== ''"
                >
                  Email
                </p>
              </transition>
            </div>
            <div class='text-red-700 text-xs' v-if="!$v.email.email">
              Ingresa un email válido 👮🏽‍♀️
            </div>
            <div class='text-red-700 text-xs' v-if="!$v.email.required && $v.email.$error">
              Este campo es obligatorio
            </div>
          </div>

          <div class="h-20">
            <div class="w-full flex flex-col">
              <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-900
                        border border-grey-lighter rounded py-4 px-4 leading-tight
                        focus:outline-none focus:shadow-sm"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  @blur='touchIfPresentElseReset($v.password)'
                  v-model.trim.lazy="$v.password.$model"
              >
              <transition name="vertical-slide-fade">
                <p
                  class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                  v-if="password !== ''"
                >
                  Contraseña
                </p>
              </transition>
            </div>
            <div class='text-red-700 text-xs' v-if="!$v.password.minLength && $v.password.$error">
              La contraseña debe tener un mínimo de {{$v.password.$params.minLength.min}} caracteres
            </div>
            <div class='text-red-700 text-xs' v-if="!$v.password.required && $v.password.$error">
              Este campo es obligatorio
            </div>
          </div>

          <div class="mt-2">
            <action-button
              :has-lock-icon="true"
              :invalid-form="$v.$invalid"
              >
              Registrarse
            </action-button>
          </div>
        </form>
      </div>

      <div class="text-center text-sm text-gray-600 mt-4">
          Al registrarte, aceptas los
          <a
            class="no-underline border-b border-gray-400"
            href="https://fintoc.com/legal/#terminos-y-condiciones"
            target="_blank">
              Términos y Condiciones
          </a> y la
          <a
            class="no-underline border-b border-gray-400"
            href="https://fintoc.com/legal/#politicas-de-privacidad"
            target="_blank">
              Políticas de Privacidad
          </a>
      </div>

      <div class="text-gray-900 mt-4 text-center">
        ¿Ya tienes una cuenta?
        <router-link to="../login/"
                    class="font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none
                            focus:underline transition ease-in-out duration-150">
            Log in
        </router-link>
      </div>
    </div>
    <div v-show="completed" class="mt-4">
      <transition name="background-fade" mode="out-in" >
        <div>
          <h1 class="m-5 text-3xl text-center font-regular text-gray-900">
            ¡Te enviamos un correo!
          </h1>
          <h2 class="m-5 text-xl text-center font-regular text-gray-900">
            Revisa el link enviado a {{ email }} para verificar tu cuenta.
          </h2>
          <p class="text-center text-base text-main mb-8">
            {{ name }}, gracias por formar parte de Fintoc.
          </p>
          <p class="text-xs text-center mb-2"> ¿No recibiste nuestro correo? 👇 </p>
          <action-button :disabled="emailResent"
                         :isDisabled="emailResent"
                         @click.native="resendEmail">
            {{ emailResent ? '¡Link de verificación reenviado!' : 'Reenviar'}}
          </action-button>
        </div>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';
import actionButton from '../components/actionButton.vue';
import Spinner from '../components/spinner.vue';
import OauthPanel from './oauth-panel.vue';

export default {
  data() {
    return {
      name: '',
      lastName: '',
      email: '',
      password: '',
      idToken: '',
      showFormError: false,
      showSpinner: false,
      completed: false,
      emailResent: false,
    };
  },
  async mounted() {
    window.analytics.page('Signup');
    const country = await this.getCountry();
    console.log(country);
  },
  methods: {
    ...mapActions(['getCountry', 'sendConfirmationEmail']),
    onSubmit() {
      if (this.idToken === '' && this.$v.$invalid) { return; }

      const formData = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        token: this.idToken,
      };
      this.showSpinner = true;
      this.$store.dispatch('signUp', formData).then(() => {
        this.showSpinner = false;
        this.afterSuccess();
      }).catch((error) => {
        this.showSpinner = false;
        const errorCode = error.response.data.error.code;
        if (errorCode === 'email_taken') {
          const query = {};

          if (this.email) query.email = this.email;
          else query.oauthEmailTaken = true;

          this.$router.push({ path: 'login', query });
        } else {
          this.showFormError = true;
        }
      });
    },
    afterSuccess() {
      this.trackUserSignedUpEvent();
      if (this.$store.getters.isUserLoggedIn) {
        this.$router.push('/links');
      } else {
        this.completed = true;
      }
    },
    touchIfPresentElseReset(field) {
      if (field.$model !== '') {
        field.$touch();
      } else {
        field.$reset();
      }
    },
    trackUserSignedUpEvent() {
      window.analytics.track('User Signed Up');
    },
    resendEmail() {
      this.emailResent = true;
      const formData = { email: this.email };
      this.sendConfirmationEmail(formData);
    },
  },
  components: {
    actionButton,
    Spinner,
    OauthPanel,
  },
  validations: {
    email: {
      email,
      required,
    },
    name: {
      required,
      minLength: minLength(2),
    },
    lastName: {
      required,
      minLength: minLength(2),
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
};
</script>

<style scoped>
  .vertical-slide-fade-enter,
  .vertical-slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-18px);
  }

  .vertical-slide-fade-enter-active,
  .vertical-slide-fade-leave-active {
    transition: all .5s ease;
  }
</style>
