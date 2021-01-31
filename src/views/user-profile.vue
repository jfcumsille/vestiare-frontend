<template>
<div class="h-screen">
  <div class="max-w-screen-md mx-auto p-6 lg:p-8 relative">
    <spinner v-if="showSpinner"></spinner>

    <div class="h-20">
      <div class="w-full flex flex-col">
        <select class="border p-4">
          <option v-for="organization in organizations"
                  v-bind:key="organization.id"
                  v-bind:value="organization.id">
            Organización {{ organization.name || 'Default' }}
          </option>
        </select>
      </div>
    </div>

    <form @submit.prevent="onSubmit" method="POST">
      <div class="h-20">
        <div class="w-full flex flex-col">
          <input
              disabled
              class="appearance-none block w-full bg-grey-lighter text-grey-900
                     border border-grey-lighter rounded py-4 px-4 leading-tight
                     focus:outline-none focus:shadow-sm cursor-not-allowed"
              type="email"
              name="email"
              placeholder="Email"
              v-model="email"
          >
          <p
            class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
          >
            Email
          </p>
        </div>
      </div>

      <div class="h-20">
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
          <transition lastName="vertical-slide-fade">
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

      <div class="mt-2">
        <action-button
          :has-lock-icon="true"
          :invalid-form="$v.$invalid"
          >
          Actualizar
        </action-button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
import ActionButton from '../components/actionButton.vue';
import Spinner from '../components/spinner.vue';

export default {
  data() {
    return {
      name: this.$store.getters.getName,
      lastName: this.$store.getters.getLastName,
      email: this.$store.getters.getEmail,
      organizations: this.$store.getters.getOrganizations,
      password: '',
      showFormError: false,
      showSpinner: false,
    };
  },

  methods: {
    onSubmit() {
      if (this.$v.$invalid) { return; }
      const formData = {
        name: this.name,
        lastName: this.lastName,
      };
      this.showSpinner = true;
      this.$store.dispatch('updateUserInformation', formData).then(() => {
        this.showSpinner = false;
      });
    },

    touchIfPresentElseReset(field) {
      if (field.$model !== '') {
        field.$touch();
      } else {
        field.$reset();
      }
    },
  },
  components: {
    ActionButton,
    Spinner,
  },
  validations: {
    name: {
      required,
      minLength: minLength(2),
    },
    lastName: {
      required,
      minLength: minLength(2),
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
