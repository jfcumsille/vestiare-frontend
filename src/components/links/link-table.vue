<template>
<div class="relative w-full h-full">
  <link-confirmation-modal v-if="showDeleteModal"
      :title='"Eliminar Link"'
      :text='`¿Estás seguro que quieres borrar este link? El usuario tendrá que hacer
              login de nuevo en el banco para crearlo. Esta acción no se puede deshacer.`'
      :leftButtonText="'Cancelar'"
      :rightButtonText="'Eliminar'"
      :onConfirm="confirmDestroyLink"
      :onCancel="cancelLinkDeletion"
      :showSpinner="showSpinner"
      />
  <link-confirmation-modal v-if="showPreventDeactivationModal"
      :title='"Contraseña Inválida"'
      :text='`La última vez que fuimos al banco con este link, las credenciales eran inválidas.
             Hemos dejado de actualizar los movimientos de esta cuenta para evitar un bloqueo.
             Si crees que esto es un error, podemos reactivar las actualizaciones apretando
             Reintentar.`'
      :leftButtonText="'Cancelar'"
      :rightButtonText="'Reintentar'"
      :onConfirm="confirmPreventRefreshDeactivation"
      :onCancel="cancelPreventRefreshDeactivation"
      :showSpinner="showSpinner"/>
  <div v-if="loading" class="flex justify-center">
    <div class="absolute w-full h-full bg-white opacity-50 z-10"/>
    <spinner class="absolute z-20 inset-y-2/5"
             :widthClsName="'w-16'"
             :heightClsName="'h-16'"
             :borderClsName="'border-4 border-t-4'"/>
  </div>
  <table class="w-full table-fixed">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-1/6">
          Banco
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-1/6">
          Usuario
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-1/6">
          Empresa
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-1/6">
          Última Actualización
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-8p">
          Activo
        </th>
        <th class="border-b border-gray-200 bg-gray-50 w-06p"/>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 w-8p"></th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 w-1/6"></th>
      </tr>
    </thead>
    <tbody class="bg-white" name="list">
      <tr v-show="showNoLinkMessage">
        <td colspan="8" class="bg-white border-b border-gray-200">
          <div class="px-6 py-4 w-full text-center">
            <h1 class="text-4xl mt-4">
              Todavía no agregas ninguna credencial 👀
            </h1>
          </div>
        </td>
      </tr>
      <tr v-for='link in userLinks' v-bind:key='link.linkId'>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6
                   overflow-hidden">
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
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6 overflow-hidden">
          <div v-show="link.holderType !== 'business'">
            <div class="text-sm leading-5 font-medium text-gray-900">{{ link.holderName }}</div>
            <div class="text-sm leading-5 text-gray-600">
              {{ link.rut | rutFilter}}
            </div>
          </div>
          <div v-show="link.holderType === 'business'" class="text-base leading-5 text-gray-900">
            {{ link.rut | rutFilter}}
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6 overflow-hidden">
          <div v-show="link.holderType === 'business'">
            <div class="text-sm leading-5 font-medium text-gray-900">{{ link.holderName }}</div>
            <div class="text-sm leading-5 text-gray-600">
              {{ link.rut | rutFilter}}
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6 overflow-hidden">
          <div class="text-sm text-center leading-5 text-gray-900">
            <span>{{ formatDatetime(link.lastTimeRefreshed) }}</span>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6 overflow-hidden">
          <div class="text-lg leading-5 text-gray-900">
            <toggle-button :color="{checked: 'rgba(52, 211, 153, 0.75)',
                                    unchecked: '#718096'}"
               :value="link.active"
               :sync="true"
               :width="60"
               :height="28"
               :fontSize="12"
               :speed="250"
               :labels="{checked: 'Sí', unchecked: 'No'}"
               @change="updateActive({ ...link })"/>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6  w-06p"/>
        <td class="px-4 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm
                  leading-5 font-medium">
          <a href="#" @click="askForLinkDeletion(link.linkId)"
            class="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-red-200
                      text-red-900 hover:bg-red-300">
            <font-awesome-icon icon="trash" class="mt-1 mr-1"/> Borrar
          </a>
        </td>
        <td class="pr-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="flex flex-row justify-around text-lg leading-5 text-gray-900">
            <a v-if="link.preventRefresh" href="#" @click="askForPreventDeactivation(link.linkId)"
              class="inline-flex text-orange-900 text-xs leading-5 font-medium rounded-md">
                <div
                  class="py-1 px-2 rounded-md text-center bg-orange-300 bg-opacity-50
                         hover:bg-orange-400 hover:bg-opacity-75"
                >
                  <font-awesome-icon icon="exclamation-circle" class="mr-1"/>
                  <span>Contraseña Inválida</span>
                </div>
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters, mapState } from 'vuex';
import LinkConfirmationModal from './link-confirmation-modal.vue';
import Spinner from '../lib/spinner.vue';

export default {
  data() {
    return {
      showSpinner: false,
      showDeleteModal: false,
      showPreventDeactivationModal: false,
      linkToDestroy: null,
      linkToUpdate: null,
    };
  },

  props: {
    loading: Boolean,
  },

  computed: {
    ...mapGetters({
      userLinks: 'getLinks',
    }),
    ...mapState({
      mode: (state) => state.links.mode,
      loadingLinks: (state) => state.links.loading,
    }),
    showNoLinkMessage() {
      return !this.loadingLinks && this.userLinks.length === 0;
    },
  },

  components: {
    LinkConfirmationModal,
    Spinner,
  },

  methods: {
    ...mapActions(['destroyUserLink']),

    formatDatetime(datetime) {
      const date = moment(datetime).format('DD MMMM YYYY HH:mm:ss');
      return moment(datetime).isValid() ? date : null;
    },

    trackLinkDeleted(linkId) {
      window.analytics.track('Link Deleted', { link_id: linkId });
    },

    askForLinkDeletion(linkId) {
      this.showDeleteModal = true;
      this.linkToDestroy = linkId;
    },

    askForPreventDeactivation(linkId) {
      this.showPreventDeactivationModal = true;
      this.linkToUpdate = linkId;
    },

    cancelLinkDeletion() {
      this.showDeleteModal = false;
      this.linkToDestroy = null;
    },

    cancelPreventRefreshDeactivation() {
      this.showPreventDeactivationModal = false;
      this.linkToUpdate = null;
    },

    async destroyLink(linkId, mode) {
      return this.destroyUserLink({ linkId, mode }).then(() => {
        this.trackLinkDeleted(linkId);
      });
    },

    async updateLink({ linkId, preventRefresh, active }) {
      return this.$store.dispatch('updateUserLink', { linkId, preventRefresh, active });
    },

    async confirmDestroyLink() {
      if (this.linkToDestroy === null) {
        return;
      }

      this.showSpinner = true;
      await this.destroyLink(this.linkToDestroy, this.mode);
      this.showSpinner = false;
      this.showDeleteModal = false;
    },

    async updateActive({ linkId, active, preventRefresh }) {
      await this.updateLink({ linkId, active: !active, preventRefresh });
    },

    async confirmPreventRefreshDeactivation() {
      if (this.linkToUpdate === null) {
        return;
      }

      this.showSpinner = true;
      const updatingLink = this.userLinks.find((link) => link.linkId === this.linkToUpdate);
      await this.updateLink({ ...updatingLink, preventRefresh: false });
      this.showSpinner = false;
      this.showPreventDeactivationModal = false;
    },

    translatedHolderType(holderType) {
      return holderType === 'business' ? 'Empresas' : 'Personas';
    },
  },
};
</script>

<style scoped>

.w-8p {
  width: 8%
}
.w-06p {
  width: 0.666667%
}

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
