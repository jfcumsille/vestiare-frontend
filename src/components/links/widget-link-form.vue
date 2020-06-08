<template>
<div>
  <link-form
    @createSuccess='onCreateSuccess'
    :createdThrough="'widget'"
    :submitAction="'createUserLinkFromWidget'"
    :headers="formHeaders"
    :extraFields="extraFields">
  </link-form>
</div>
</template>

<script>

import LinkForm from './link-form.vue';
import { getValidUrl, queryize } from '../../helpers/widget_helper';

export default {
  mounted() {
    window.analytics.page('New widget Link');
  },
  components: {
    LinkForm,
  },
  computed: {
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
    onCreateSuccess(response) {
      const {
        // eslint-disable-next-line camelcase
        id: link_id, username, holder_type, institution: { id: institution_id },
      } = response.data;
      const params = {
        result: 'link_created',
        link_id,
        username,
        holder_type,
        institution_id,
      };
      window.location = getValidUrl(`${this.returnUrl}?${queryize(params)}`);
    },
  },
};
</script>
