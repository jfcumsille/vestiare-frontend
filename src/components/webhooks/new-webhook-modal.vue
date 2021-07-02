<template>
  <transition name="background-fade" mode="out-in" >
    <div class="fixed z-10 inset-0 overflow-y-auto">
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
            aria-modal="true"
            aria-labelledby="modal-headline">
            <div class="bg-white px-4 pt-4 pb-4 sm:p-6 sm:pb-4 border-b">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Suscribir un webhook endpoint {{mode === 'test' ? 'de prueba' : ''}}
              </h3>
            </div>
            <div v-if="errors.url || errors.events || errors.api"
                  class="text-red-600 bg-gray-100 flex pt-3 pl-3 gap-4">
              <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732
                    4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p v-if="errors.api">Se produjo un error, intenta nuevamente.</p>
                <p v-if="errors.url">URL inválida</p>
                <p v-if="errors.events">Debes seleccionar al menos un evento</p>
              </div>
            </div>
            <div class="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4
                            m:text-left w-full overflow-x-scroll">
                  <div class="mt-2 flex flex-wrap gap-4 w-full tracking-wider">
                    <input aria-label="URL" name="url" type="url"
                      required
                      v-model="url"
                      class="appearance-none relative block w-full p-4 border
                              border-gray-400 placeholder-gray-500 text-gray-900 rounded-b-mdqq
                              focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                              focus:z-10 sm:text-sm sm:leading-5" placeholder="https://"
                    />
                    <textarea aria-label="description" name="description" type="description"
                      required
                      v-model="description"
                      placeholder="Descripción opcional"
                      class="appearance-none relative block w-full p-4 border
                            border-gray-400 placeholder-gray-500 text-gray-900 rounded-b-md
                            focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                            focus:z-10 sm:text-sm sm:leading-5"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4
                      border-b text-gray-700 tracking-wider"
            >
              <h3>Eventos para enviar</h3>
              <div>
                <div v-for="option in eventOptions" :key="option.value" class="flex-no-wrap">
                  <label class="cursor-pointer ml-2">
                    <input type="checkbox" v-model="option.selected">
                    {{option.value}}
                  </label>
                </div>
              </div>
            </div>
            <div class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
                <button
                  v-if="!loading"
                  @click="checkForm"
                  class="justify-self-center w-40 rounded-md border border-transparent
                      px-4 py-2 bg-main text-base leading-6 font-medium text-white shadow-sm
                      hover:bg-sub focus:outline-none focus:border-blue-700
                      focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm
                      sm:leading-5 align-self-center">
                  Suscribir
                </button>
                <div v-if="loading"
                  class="justify-self-center w-40 rounded-md border border-transparent
                      px-4 py-2 bg-gray-400 text-base leading-6 font-medium text-white shadow-sm
                      hover:bg-gray focus:outline-none focus:border-blue-700
                      focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm
                      sm:leading-5 align-self-center flex items-center justify-center cursor-wait">
                  <spinner :widthClsName="'w-6'" :heightClsName="'h-6'"
                           :borderClsName="'border-4 border-t-4'" />
                </div>
                <button
                  @click="cancelCreation"
                  type="button"
                  class="justify-self-center w-40 rounded-md border border-gray-300 px-4
                        py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm
                        hover:text-gray-500 focus:outline-none focus:border-blue-300
                        focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm
                        sm:leading-5 align-middle h-12 align-self-center">
                  Cancelar
                </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Spinner from '../lib/spinner.vue';

export default {
  data() {
    return {
      loading: false,
      type: null,
      url: 'https://',
      description: null,
      eventOptions: [],
      errors: {
        url: false,
        events: false,
        api: false,
      },
    };
  },
  async created() {
    let { options } = this;
    if (options.length === 0) {
      options = await this.getAvailableEventTypes();
    }
    this.eventOptions = options.map((option) => ({ value: option, selected: false }));
  },
  components: {
    Spinner,
  },
  computed: {
    ...mapState({
      mode: (state) => state.webhooks.mode,
      options: (state) => state.webhooks.supportedEventTypes,
    }),
    ...mapGetters(['webhookEndpoints']),
    selectedEvents() {
      return this.eventOptions.filter((option) => option.selected).map((option) => option.value);
    },
  },
  methods: {
    ...mapActions(['createWebhookEndpoint', 'updateShowCreateModal', 'getAvailableEventTypes']),
    createNewWebhook(requestBody) {
      this.createWebhookEndpoint({ requestBody, mode: this.mode })
        .then((createdId) => {
          if (createdId) {
            this.updateShowCreateModal();
          } else {
            this.errors.api = true;
          }
          this.loading = false;
        });
    },
    submitForm() {
      this.loading = true;
      this.createNewWebhook({
        ...(this.description && { description: this.description }),
        url: this.url,
        enabledEvents: this.selectedEvents,
      });
    },
    cancelCreation() {
      this.updateShowCreateModal();
    },
    validURL() {
      // eslint-disable-next-line no-useless-escape
      const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      return regex.test(this.url);
    },
    checkForm(e) {
      e.preventDefault();
      this.errors.events = this.selectedEvents.length === 0;
      this.errors.url = !this.validURL();
      if (this.errors.url || this.errors.events) return;
      this.submitForm();
    },
  },
};
</script>
