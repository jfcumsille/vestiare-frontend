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

    onLinkCreated(link) {
      apiClient.links.regenerateLinkToken(link.id, this.formHeaders).then((linkResponse) => {
        const newLinkData = {
          bank: findBankByCode(linkResponse.data.institution.id),
          numberOfAccounts: linkResponse.data.accountsCount,
          linkToken: linkResponse.data.linkToken,
          holderType: linkResponse.data.holderType,
        };
        this.showLinkDetail(newLinkData);
      });
    },
  },
};
</script>
