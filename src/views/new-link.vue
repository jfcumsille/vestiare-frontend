<template>
<div class="bg-gray-200">
  <header class="bg-white">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-medium leading-tight text-gray-900">
        Nuevas credenciales
      </h1>
    </div>
  </header>
  <main class="h-screen">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0">
        <div class="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 flex flex-col">
          <link-form v-if="showForm" @newLinkSuccess='showLinkDetail'></link-form>
          <link-detail v-if="!showForm"
              :bank='bank'
              :holderType='holderType'
              :numberOfAccounts='numberOfAccounts'
              :linkToken='linkToken'>
          </link-detail>
          <div class="mt-4 text-right">
            <router-link to="/links"
              class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-200
                      text-gray-900 hover:bg-gray-300">
              Volver
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>
<script>
import LinkDetail from '../components/links/link-detail.vue';
import LinkForm from '../components/links/link-form.vue';

export default {
  data() {
    return {
      showForm: true,
      bank: null,
      holderType: '',
      numberOfAccounts: '',
      linkToken: '',
    };
  },
  mounted() {
    window.analytics.page('New Link');
  },
  methods: {
    showLinkDetail(responseData) {
      this.bank = responseData.bank;
      this.holderType = responseData.holderType;
      this.numberOfAccounts = responseData.numberOfAccounts;
      this.linkToken = responseData.linkToken;
      this.showForm = false;
    },
  },
  components: {
    LinkDetail,
    LinkForm,
  },
};
</script>
