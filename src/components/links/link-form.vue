<template>
<div class="bg-white rounded px-8 py-6 relative">
  <div class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3
              shadow-md mb-6"
       role="alert"
       v-if='showTextError'>
    <div class="flex">
      <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
      <div>
        <p class="font-bold">Tuvimos un problema con tus credenciales</p>
        <p class="text-sm">{{ textError }}</p>
      </div>
    </div>
  </div>
  <spinner v-if="showSpinner">
    <transition name="slide-fade" mode="out-in">
      <p class="text-gray-900 font-bold text-5xl mt-6" :key='loadingText'>
        {{ loadingText }}
      </p>
    </transition>
  </spinner>
  <div>
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
          <p>*(Estamos trabajando para agregar más bancos. Escríbenos si necesitas uno urgente)</p>
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
          <div class='text-red-700' v-if="!$v.holderType.required && $v.holderType.$error">
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
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { rutValidator } from 'vue-dni';
import Spinner from '../spinner.vue';

export default {
  data() {
    return {
      bankName: '',
      holderType: '',
      rut: '',
      password: '',
      showSpinner: false,
      showTextError: false,
      textError: '',
      loadingText: 'estamos validando tus datos...',
      loadingTextList: [
        'estamos validando tus datos...',
        'ahora preguntándole al banco si está todo bien...',
        'todo en orden por ahora...',
        'ya casi...',
        'paciencia...',
        'un poco más...',
      ],
    };
  },
  mounted() {
    // TODO: destroy interval.
    window.setInterval(() => {
      this.rotateText();
    }, 5000);
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

      const formData = this.getFormData();
      this.showSpinner = true;
      this.$store.dispatch('createUserLink', formData)
        .then((response) => {
          this.trackLinkCreatedEvent(response.data);
          const newLinkData = {
            // TODO: Data must be parsed on links actions.
            bankName: response.data.institution.name,
            holderType: response.data.holder_type,
            numberOfAccounts: response.data.accounts.length,
            linkToken: response.data.link_token,
          };
          this.$emit('newLinkSuccess', newLinkData);
        })
        .catch((error) => {
          this.trackLinkCreationFailedEvent(formData, error.response.data.error);
          const errorCode = error.response.data.error.code;
          this.showCredentialsError(errorCode);
          this.showSpinner = false;
        });
    },
    trackLinkCreatedEvent(responseData) {
      window.analytics.track('Link Created', {
        linkId: responseData.id,
        institutionId: responseData.institution.public_id,
        holderType: responseData.holder_type,
        username: responseData.username,
      });
    },
    trackLinkCreationFailedEvent(formData, errorData) {
      window.analytics.track('Link Creation Failed', {
        errorCode: errorData.code,
        institutionId: formData.institution_id,
        holderType: formData.holder_type,
        username: formData.username,
      });
    },
    showCredentialsError(errorCode) {
      switch (errorCode) {
        case 'invalid_username':
          this.textError = 'Por favor utiliza un rut Chileno válido';
          break;
        case 'invalid_credentials':
          this.textError = 'Credenciales inválidas';
          break;
        case 'institution_unavailable':
          this.textError = 'Parece que estamos con problemas. Si el problema sigue escríbele a elliot@fintoc.com';
          break;
        case 'not_implemented_institution':
          this.textError = 'Lamentablemente esta institución no la hemos implementado. Escríbele a elliot@fintoc.com';
          break;
        default:
          this.textError = 'No pudimos conectarnos con el banco. Si el problema persiste, intenta más tarde';
      }
      this.showTextError = true;
    },
    rotateText() {
      const first = this.loadingTextList.shift();
      this.loadingTextList = this.loadingTextList.concat(first);
      [this.loadingText] = this.loadingTextList;
    },
  },
};
</script>

<style scoped>

.slide-fade-enter {
  opacity: 0;
  transform: translateX(-150px);
}

.slide-fade-enter-active, .slide-fade-leave-active{
  transition: all .8s ease;
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(150px);
}
</style>
