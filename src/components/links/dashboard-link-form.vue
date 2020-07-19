<template>
<div>
  <link-wizard v-if="showForm"
    @linkCreated='onLinkCreated'
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

import apiClient from '../../api';
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

    onLinkCreated(link) {
      apiClient.links.regenerateAccessToken(link.id, this.headers).then((linkResponse) => {
        const newLinkData = {
          bank: findBankByCode(linkResponse.data.institution.id),
          numberOfAccounts: linkResponse.data.accounts.length,
          linkToken: linkResponse.data.link_token,
          holderType: linkResponse.data.holder_type,
        };
        this.showLinkDetail(newLinkData);
      }).catch((error) => {
        // TODO: Add retry.
        this.errorCode = error.response != null ? error.response.data.error.code : 'unknown';
        this.currentStep = 'error';
      });
    },
  },
};
</script>
