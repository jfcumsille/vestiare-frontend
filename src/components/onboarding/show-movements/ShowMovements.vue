<template>
<div class="flex h-full justify-center items-center">
  <modal v-if="showModal" @close-modal="toggleModal"/>
  <div class="box-border bg-white px-8 py-12 rounded shadow sm:w-1/2 w-11/12">
    <div class="flex flex-col items-center justify-center relative">
      <div class="text-lg text-center mb-12">
        Prueba Fintoc en 3 minutos!
      </div>
      <div class="text-sm font-semibold mb-2 text-left w-full">
        Tus movimientos
      </div>
      <div class="text-sm text-justify">
        Con tu nuevo <span class=font-semibold> Link </span>
        también puedes consultar nuestra API y obtener los datos de tus movimientos cuando quieras.
      </div>

      <div class="mt-8">
        <div v-if="loading" class="text-xs text-center text-fintoc-blue">
          Nos tardamos a lo mas 5 minutos en traer todos tus movimientos.
        </div>

        <div v-if="useFakeMovements" class="text-xs text-center text-fintoc-blue">
          Nos tardamos mucho en buscar tus movimientos, usaremos unos de ejemplo.
        </div>

        <div class="flex justify-center">
          <div v-if="!loading"
              class="bg-gray-100 py-2 px-2 rounded border-2 border-gray-200 shadow">
            <movement-row
              :movement="movement"
              v-for="movement in renderMovements"
              :key="movement.id"
            />
          </div>

          <div
              v-if="loading"
              class="bg-gray-500 animate-pulse py-2 px-2
                      rounded shadow h-16 w-40 mt-8"/>
        </div>
        <div @click="toggleModal()"
            class="text-xs text-right underline text-fintoc-blue w-full pl-8 mb-8 py-2
                  cursor-pointer">
            ver por API
        </div>
      </div>
      <div
        @click="nextPage"
        class="shadow-outline-lg rounded
        text-white rounde font-bold
          text-md text-center py-2 px-4 mt-4 lg:mt-8 ring-0 focus:ring-0"
        v-bind:class="{
          'bg-gray-400': loading, 'bg-fintoc-blue': !loading,
          'cursor-wait': loading, 'cursor-pointer': !loading,
        }">
        Continuar
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MovementRow from './MovementsRow.vue';
import Modal from './MovementsModal.vue';

export default {
  data() {
    return {
      pollingInterval: null,
      showModal: false,
      useFakeMovements: false,
    };
  },
  computed: {
    ...mapState({
      accounts: (state) => state.onboarding.accounts,
      movements: (state) => state.onboarding.movements,
    }),
    loading() {
      return this.movements.length === 0 && this.useFakeMovements === false;
    },
    fakeMovements() {
      return [
        { postDate: '1999-01-01', description: 'TEF from Jon Snow', amount: 10000 },
        { postDate: '2005-07-07', description: 'Direct Deposit from Daenerys', amount: 20000 },
        { postDate: '2010-04-09', description: 'Payment to the Lannisters', amount: 30000 },
      ];
    },
    renderMovements() {
      if (this.useFakeMovements) {
        console.log(1);
        return this.fakeMovements;
      }
      return this.movements.slice(0, 3);
    },
  },
  mounted() {
    this.fetchData();
    this.pollingInterval = setInterval(this.fetchData, 1000);
    setTimeout(this.endPolling, 60 * 1000);
  },
  methods: {
    ...mapActions([
      'fetchMovements',
    ]),
    nextPage() {
      if (!this.loading) {
        this.$emit('next');
      }
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    fetchData() {
      this.fetchMovements()
        .then((response) => {
          console.log(response);
          if (response.data.length > 0) {
            clearInterval(this.pollInterval);
          }
        });
    },
    endPolling() {
      clearInterval(this.pollingInterval);
      if (this.movements.length === 0) {
        this.useFakeMovements = true;
      }
    },
  },
  components: {
    MovementRow,
    Modal,
  },
};
</script>
