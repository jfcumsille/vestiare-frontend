<template>
<div class="relative w-full h-full overflow-x-scroll">
  <div v-if="loading" class="flex justify-center">
    <div class="absolute w-full h-full bg-white opacity-50 z-10"/>
    <spinner class="absolute z-20 inset-y-2/5"
             :widthClsName="'w-16'"
             :heightClsName="'h-16'"
             :borderClsName="'border-4 border-t-4'"/>
  </div>
  <table class="w-full min-width table-fixed">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-1/3">
          URL
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-1/4">
          Descripción
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-1/4">
          Nº de Eventos suscritos
        </th>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-600 uppercase tracking-wider w-8p">
          Activo
        </th>

        <th class="border-b border-gray-200 bg-gray-50 w-06p"/>
        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 w-8p"></th>
      </tr>
    </thead>
    <tbody class="bg-white" name="list">
      <tr v-show="showNoEndpointsMessage">
        <td colspan="8" class="bg-white border-b border-gray-200">
          <div class="px-6 py-4 w-full text-center">
            <h1 class="text-4xl mt-4">
                {{
                  loading
                    ? 'No encontramos los webhooks que buscas 🤷‍♂️'
                    : 'Todavía no suscribes ningún webhook 👀'
                }}
            </h1>
          </div>
        </td>
      </tr>
      <tr v-for='webhookEndpoint in webhookEndpoints' v-bind:key='webhookEndpoint.id'>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6
                  overflow-hidden">
          <div class="text-sm text-left leading-5 text-gray-900">
            <span>{{ webhookEndpoint.url }}</span>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6
                  overflow-hidden">
          <div class="text-sm text-left leading-5 text-gray-900">
            <span>{{ webhookEndpoint.description }}</span>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6
                  overflow-hidden">
          <div class="text-sm text-left leading-5 text-gray-900">
            <span>{{ webhookEndpoint.enabledEvents.length }}</span>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6 overflow-hidden">
          <div class="text-lg leading-5 text-gray-900">
            <toggle-button :color="{checked: 'rgba(52, 211, 153, 0.75)',
                                    unchecked: '#718096'}"
              :value="webhookEndpoint.status === 'enabled'"
              :sync="true"
              :width="60"
              :height="28"
              :fontSize="12"
              :speed="250"
              :labels="{checked: 'Sí', unchecked: 'No'}"
              />
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/6  w-06p"/>
        <td class="px-4 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm
                  leading-5 font-medium">
          <a href="#"
            class="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-red-200
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
import { mapActions, mapGetters, mapState } from 'vuex';
import Spinner from '../lib/spinner.vue';

export default {
  computed: {
    ...mapGetters(['userApiKeys', 'userSecretKeys', 'webhookEndpoints', 'errors']),
    ...mapState({
      mode: (state) => state.webhooks.mode,
      loading: (state) => state.webhooks.loading,
    }),
    showNoEndpointsMessage() {
      return !this.loading && this.webhookEndpoints.length === 0;
    },
  },

  components: {
    Spinner,
  },

  methods: {
    ...mapActions(['destroyUserLink', 'updateUserLink']),
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

.min-width {
  min-width: 1100px;
}
</style>
