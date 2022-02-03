<template>
<div class="demo">
  <modal v-if="showModal" @close-modal="toggleModal"/>
  <div class="box-border bg-white px-8 py-12 rounded shadow">
    <div class="flex flex-col items-center justify-center relative">
      <div class="demo-title w-full">
        Cuentas
      </div>
      <div class="demo-subtitle">
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
          rounded shadow h-16 w-40 mt-4"/>
        <div @click="toggleModal()"
            class="font-sz-14 font-300 text-right underline text-fintoc-blue w-full pl-8 mb-4 py-2
                  cursor-pointer">
            ver por API
        </div>
      </div>
      <button class="demo-button text-center mt-4 min-w-200" @click="nextPage">
        Ver movimientos</button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AccountRow from './AccountRow.vue';
import Modal from './AccountsModal.vue';

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
    if (this.accounts === null) {
      this.fetchAccounts();
    }
  },
  methods: {
    ...mapActions(['fetchAccounts']),
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
  },
};
</script>
