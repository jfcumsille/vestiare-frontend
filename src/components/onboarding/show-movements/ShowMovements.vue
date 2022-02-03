<template>
<div class="demo">
  <modal v-if="showModal" @close-modal="toggleModal"/>
  <div class="box-border bg-white px-8 py-12 rounded shadow">
    <div class="flex flex-col items-center justify-center relative">
      <div class="demo-title w-full">
        Movimientos
      </div>
      <!-- <div class="text-sm font-semibold mb-2 text-left w-full">
        Tus movimientos
      </div> -->
      <div class="demo-subtitle">
        Con tu nuevo <span class="font-semibold"> Link </span>
        puedes consultar nuestra API y obtener los datos de tus movimientos cuando quieras.
      </div>

      <div class="mt-8">
        <div v-if="loading" class="demo-subtitle">
          Nos tardamos a lo más 5 minutos en traer todos tus movimientos.
        </div>

        <div v-if="useFakeMovements" class="demo-subtitle">
          Nos tardamos mucho en buscar tus movimientos, usaremos unos de ejemplo.
        </div>

        <div class="flex flex-col justify-center">
          <div v-if="!loading"
              class="bg-gray-100 py-2 px-2 rounded border-2 border-gray-200 shadow mt-2">
            <movement-row
              :movement="movement"
              v-for="movement in renderMovements"
              :key="movement.id"
            />
          </div>
                    <div
              v-if="loading"
              class="bg-gray-500 animate-pulse py-2 px-2
                      rounded shadow h-32 mt-2"/>
          <div @click="toggleModal()"
            class="text-xs text-right underline text-fintoc-blue
            px-2 mt-2 py-2 cursor-pointer font-sz-14 font-300">
            ver por API
        </div>
        </div>
      </div>
      <button class="demo-button text-center mt-8 min-w-200" @click="nextPage">
        Continuar</button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MovementRow from './MovementsRow.vue';
import Modal from './MovementsModal.vue';
import apiClient from '../../../api/index';

export default {
  data() {
    return {
      pollingCount: 0,
      showModal: false,
      useFakeMovements: false,
    };
  },
  computed: {
    ...mapState({
      movements: (state) => state.onboarding.movements,
      linkId: (state) => state.onboarding.linkId,
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
    formHeaders() {
      return this.$store.getters.authHeaders;
    },
  },
  mounted() {
    if (this.movements.length === 0) {
      this.fetchData();
      setTimeout(this.endPolling, 3 * 60 * 1000);
    }
  },
  methods: {
    ...mapActions(['fetchMovements', 'setOnboardingLink']),
    nextPage() {
      if (!this.loading) {
        this.$emit('next');
      }
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    async fetchData() {
      if (this.loading) {
        const linkResponse = await apiClient.links.regenerateLinkToken(this.linkId,
          this.formHeaders);
        const { linkToken } = linkResponse.data;
        this.setOnboardingLink({ linkToken, mode: this.mode });
        const response = await this.fetchMovements();
        if (response.data.length > 0) {
          clearInterval(this.pollInterval);
        }
      }
    },
    endPolling() {
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
