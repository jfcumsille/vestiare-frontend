<template>
<div>
  <link-wizard v-if="showForm"
    @createSuccess='onCreateSuccess'
    :createdThrough="'dashboard'"
    :submitAction="'createUserLinkFromDashboard'"
    :headers="formHeaders">
  </link-wizard>
  <link-detail v-if="!showForm"
      :bank='bank'
      :holderType='holderType'
      :numberOfAccounts='numberOfAccounts'
      :linkToken='linkToken'>
  </link-detail>
</div>
</template>

<script>

import LinkDetail from './link-detail.vue';
import LinkWizard from './link-wizard.vue';
import { findBankByCode } from '../../banks-helper';

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
    window.analytics.page('New dashboard Link');
  },
  components: {
    LinkWizard,
    LinkDetail,
  },
  computed: {
    formHeaders() {
      return this.$store.getters.authHeaders;
    },
  },
  methods: {
    showLinkDetail(responseData) {
      this.bank = responseData.bank;
      this.holderType = responseData.holderType;
      this.numberOfAccounts = responseData.numberOfAccounts;
      this.linkToken = responseData.linkToken;
      this.showForm = false;
    },
    updateStep(newStep) {
      this.currentStep = newStep;
    },
    onCreateSuccess(response) {
      const newLinkData = {
        bank: findBankByCode(response.data.institution.id),
        numberOfAccounts: response.data.accounts.length,
        linkToken: response.data.link_token,
        holderType: response.data.holder_type,
      };

      this.showLinkDetail(newLinkData);
    },
  },
};
</script>
