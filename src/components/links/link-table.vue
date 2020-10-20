<template>
<div>
  <transition name="background-fade" mode="out-in" >
    <div v-show="showModal"
      class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
                  sm:p-0">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
        </span>
        <transition name="modal-fade" mode="out-in" >
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
                    shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg
                    sm:w-full"
            role="dialog"
            v-show="showModal"
            aria-modal="true"
            aria-labelledby="modal-headline">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12
                          rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <!-- Heroicon name: exclamation -->
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732
                      4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <spinner v-if="showSpinner"></spinner>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Eliminar Link
                </h3>
                <div class="mt-2">
                  <p class="text-sm leading-5 text-gray-700">
                    ¿Estas seguro que quieres borrar este link?
                    El usuario tendrá que hacer login de nuevo en el banco para crearlo.
                    Esta acción no se puede deshacer.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                @click="confirmDestroyLink()"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4
                      py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm
                    hover:bg-red-500 focus:outline-none focus:border-red-700
                      focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm
                      sm:leading-5">
                Eliminar
              </button>
            </span>
            <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                @click="cancelLinkDeletion()"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2
                    bg-white text-base leading-6 font-medium text-gray-700 shadow-sm
                    hover:text-gray-500 focus:outline-none focus:border-blue-300
                      focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm
                      sm:leading-5">
                Cancelar
              </button>
            </span>
          </div>
        </div>
        </transition>
      </div>
    </div>
  </transition>

  <table class="min-w-full">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider">
          Banco
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider">
          Rut usuario
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider">
          Rut empresa
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider">
          Número de cuentas
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider">
          Modo
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
      </tr>
    </thead>
    <tbody class="bg-white" is="transition-group" name="list">
      <tr v-for='link in userLinks' v-bind:key='link.linkId'>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" :src="link.bank.smallLogo" />
            </div>
            <div class="ml-4">
              <div class="text-sm leading-5 font-medium text-gray-900">{{ link.bank.label }}</div>
              <div class="text-sm leading-5 text-gray-600">
                {{ translatedHolderType(link.holderType) }}
              </div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="text-lg leading-5 text-gray-900">{{ link.rut | rutFilter}}</div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="text-lg leading-5 text-gray-900">
            {{ (link.holderType === 'business' ? link.holderId : '') | rutFilter }}
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="text-lg leading-5 text-gray-900">
            <p type="password">{{ link.numberOfAccounts }}</p></div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="text-lg leading-5 text-gray-900">
            <div
              class="py-2 px-4 rounded-md w-16"
              :class="{ 'bg-green-200': link.mode === 'test',
                        'bg-blue-200': link.mode === 'live' }"
            >
              {{ link.mode }}
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm
                  leading-5 font-medium">
          <a href="#" @click="askForLinkDeletion(link.linkId)"
            class="ml-6 px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-red-200
                      text-red-900 hover:bg-red-300">
            <font-awesome-icon icon="trash" class="mt-1 mr-1"/> Borrar
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Spinner from '../spinner.vue';

export default {
  data() {
    return {
      showSpinner: false,
      showModal: false,
      linkToDestroy: null,
    };
  },

  computed: {
    ...mapGetters([
      'userLinks',
    ]),
  },

  components: {
    Spinner,
  },

  methods: {
    trackLinkDeleted(linkId) {
      window.analytics.track('Link Deleted', { link_id: linkId });
    },

    askForLinkDeletion(linkId) {
      this.showModal = true;
      this.linkToDestroy = linkId;
    },

    cancelLinkDeletion() {
      this.showModal = false;
      this.linkToDestroy = null;
    },

    async destroyLink(linkId) {
      return this.$store.dispatch('destroyUserLink', linkId).then(() => {
        this.trackLinkDeleted(linkId);
      });
    },

    async confirmDestroyLink() {
      if (this.linkToDestroy === null) {
        return;
      }

      this.showSpinner = true;
      await this.destroyLink(this.linkToDestroy);
      this.showSpinner = false;
      this.showModal = false;
    },

    translatedHolderType(holderType) {
      return holderType === 'business' ? 'Empresas' : 'Personas';
    },
  },
};
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all .3s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-15px);
}

.modal-fade-enter,
.modal-fade-leave-to {
  scale: 95;
  transform: translateY(10px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all .3s ease;
}

.background-fade-enter,
.background-fade-leave-to {
  opacity: 0;
}

.background-fade-enter-active,
.background-fade-leave-active {
  transition: opacity .2s ease-out;
}
</style>
