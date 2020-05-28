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
import { getValidUrl } from '../../helpers/widget_helper';

export default {
  mounted() {
    window.analytics.page('New widget Link');
  },
  components: {
    LinkForm,
  },
  computed: {
    apiKey() {
      return this.$route.query['public-api-key'];
    },
    callbackUrl() {
      return this.$route.query['callback-url'];
    },
    returnUrl() {
      return this.$route.query['return-result-to'];
    },
    formHeaders() {
      return { Authorization: this.apiKey };
    },
    extraFields() {
      return { callbackUrl: this.callbackUrl };
    },
  },
  methods: {
    onCreateSuccess() {
      window.location = getValidUrl(this.returnUrl);
    },
  },
};
</script>
