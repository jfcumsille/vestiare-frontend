<template>
<div class="flex h-full justify-center items-center">
  <modal v-if="showModal" @close-modal="toggleModal"/>
  <div class="box-border bg-white px-8 py-12 rounded shadow sm:w-1/2 w-11/12">
    <div class="flex flex-col items-center justify-center relative">
      <div class="text-4xl text-center mb-10">
        ¡Prueba Fintoc en 3 minutos!
      </div>
      <div class="text-sm font-semibold mb-2 text-left w-full">
        Tus cuentas
      </div>
      <div class="text-sm text-justify text-gray-800">
        Con tu nuevo <span class=font-semibold> Link </span>
        puedes consultar nuestra API y obtener los datos de tus cuentas cuando quieras.
      </div>
      <div class="mt-8">
        <div v-if="!loading" class="bg-gray-100 py-2 px-2 rounded border-2 border-gray-200 shadow">
          <account-row
            :account="account"
            v-for="account in accounts"
            :key="account.id"
          />
        </div>
        <div v-if="loading" class="bg-gray-400 animate-pulse py-2 px-2
          rounded shadow h-16 w-40 mt-8"/>
        <div @click="toggleModal()"
            class="text-xs text-right underline text-fintoc-blue w-full pl-8 mb-8 py-2
                  cursor-pointer">
            ver por API
        </div>
      </div>
      <step-button @click.native="nextPage" v-bind:loading="loading">
        Ver Movimientos
      </step-button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AccountRow from './AccountRow.vue';
import Modal from './AccountsModal.vue';
import StepButton from '../StepButton.vue';

export default {
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState({
      accounts: (state) => state.onboarding.accounts,
    }),
    loading() {
      return this.accounts === null;
    },
  },
  created() {
    this.fetchApiKeys();
  },
  methods: {
    ...mapActions([
      'fetchApiKeys',
    ]),
    nextPage() {
      if (!this.loading) {
        this.$emit('next');
      }
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
  components: {
    AccountRow,
    Modal,
    StepButton,
  },
};
</script>
