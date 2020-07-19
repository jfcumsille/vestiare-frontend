<template>
<div>
  <link-wizard
    @linkCreated='onLinkCreated'
    @subscriptionCreateSuccess='onSubscriptionCreateSuccess'
    :createdThrough="'widget'"
    :submitAction="'createUserLinkFromWidget'"
    :headers="formHeaders"
    :extraFields="extraFields"
    :requestType="requestType">
  </link-wizard>
</div>
</template>

<script>

import LinkWizard from './link-wizard.vue';
import { getValidUrl, queryize } from '../../helpers/widget_helper';

export default {
  mounted() {
    window.analytics.page('New widget Link');
  },
  components: {
    LinkWizard,
  },
  computed: {
    requestType() {
      return this.$route.query.product || 'movements';
    },
    apiKey() {
      return this.$route.query.public_key;
    },
    callbackUrl() {
      return this.$route.query.webhook_url;
    },
    returnUrl() {
      return this.$route.query.redirect_to;
    },
    formHeaders() {
      return { Authorization: this.apiKey };
    },
    extraFields() {
      return { callback_url: this.callbackUrl };
    },
  },
  methods: {
    onLinkCreated(link) {
      if (this.requestType === 'movements') {
        this.redirectFromMovementCreation(link);
      }
    },

    redirectFromMovementCreation(data) {
      const {
        // eslint-disable-next-line camelcase
        id: link_id, username, holder_type, institution: { id: institution_id },
      } = data;

      const params = {
        result: 'link_created',
        link_id,
        username,
        holder_type,
        institution_id,
      };

      window.location = getValidUrl(`${this.returnUrl}?${queryize(params)}`);
    },

    onSubscriptionCreateSuccess(data) {
      this.redirectFromSubscriptionCreation(data);
    },

    redirectFromSubscriptionCreation(data) {
      const params = {
        result: 'subscription_created',
        subscription_id: data.subscription.id,
        link_id: data.linkId,
        account_id: data.account.id,
        username: data.account.holder_id,
      };

      window.location = getValidUrl(`${this.returnUrl}?${queryize(params)}`);
    },
  },
};
</script>
