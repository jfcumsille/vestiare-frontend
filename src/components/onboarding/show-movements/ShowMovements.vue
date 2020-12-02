<template>
<div class="flex h-full justify-center items-center">
  <modal v-if="showModal" @close-modal="toggleModal"/>
  <div class="box-border bg-white px-8 py-12 rounded shadow sm:w-1/2 w-11/12">
    <div class="flex flex-col items-center justify-center relative">
      <div class="text-4xl text-center mb-10">
        ¡Prueba Fintoc en 3 minutos!
      </div>
      <div class="text-sm font-semibold mb-2 text-left w-full">
        Tus movimientos
      </div>
      <div class="text-sm text-justify text-gray-800">
        Con tu nuevo <span class=font-semibold> Link </span>
        también puedes consultar nuestra API y obtener los datos de tus movimientos cuando quieras.
      </div>

      <div class="mt-8">
        <div v-if="loading" class="text-xs text-center text-fintoc-blue">
          Nos tardamos a lo más 5 minutos en traer todos tus movimientos.
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
                      rounded shadow h-24 w-64 mt-8"/>
        </div>
        <div @click="toggleModal()"
            class="text-xs text-right underline text-fintoc-blue w-full pl-8 mb-8 py-2
                  cursor-pointer">
            ver por API
        </div>
      </div>
      <step-button @click.native="nextPage" v-bind:loading="loading">
        Continuar
      </step-button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MovementRow from './MovementsRow.vue';
import Modal from './MovementsModal.vue';
import StepButton from '../StepButton.vue';

export default {
  data() {
    return {
      pollingCount: 0,
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
        {
          id: 1, postDate: '1999-01-01', description: 'TEF to Jon Snow', amount: -457182,
        },
        {
          id: 2, postDate: '2005-07-07', description: 'Direct Deposit from Daenerys', amount: 227531,
        },
        {
          id: 3, postDate: '2010-04-09', description: 'Payment to the Lannisters', amount: 99999,
        },
      ];
    },
    renderMovements() {
      if (this.useFakeMovements) {
        return this.fakeMovements;
      }
      return this.movements.slice(0, 3);
    },
  },
  mounted() {
    this.fetchData();
    this.pollingInterval = setInterval(this.fetchData, 1000);
    setTimeout(this.endPolling, 3 * 60 * 1000);
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
      if (this.loading) {
        this.fetchMovements({ count: this.pollingCount })
          .then((response) => {
            if (response.data.length > 0) {
              clearInterval(this.pollInterval);
            }
          });
      }
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
    StepButton,
  },
};
</script>
