<template>
<div>
  <link-wizard v-if="showForm"
    @linkCreated='onLinkCreated'
    :createdThrough="'dashboard'"
    :headers="formHeaders"
    :product="product"
    :mode="testModeFilter ? 'test' : 'live'">
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

import { mapState } from 'vuex';
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
    ...mapState({
      testModeFilter: (state) => state.links.testModeFilter,
    }),
    formHeaders() {
      return this.$store.getters.authHeaders;
    },
    product() {
      return this.$route.query.product || 'movements';
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
