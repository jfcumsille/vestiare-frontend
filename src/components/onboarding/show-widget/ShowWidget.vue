<template>
<div>
  <div v-if="showWidget" class="flex h-screen items-center justify-center">
    <widget
        @linkCreated='onLinkCreated'
        @onboarding-back='unselectLinkOption'
        :createdThrough="'onboarding'"
        :product="'movements'"
        :headers="formHeaders"
        :holderTypeOnboarding="useCase"
        :mode="mode"
        :closeOnboarding="true"
      />
  </div>
  <link-created v-if="!showWidget" @next="$emit('next')"/>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Widget from '../../links/link-wizard.vue';
import LinkCreated from './LinkCreated.vue';
import apiClient from '../../../api';

export default {
  data() {
    return {
      showWidget: true,
    };
  },
  computed: {
    ...mapState({
      holderType: (state) => state.onboarding.useCase,
      link: (state) => state.onboarding.link,
      useCase: (state) => state.onboarding.useCase,
      mode: (state) => state.onboarding.mode,
    }),
    formHeaders() {
      return this.$store.getters.authHeaders;
    },
  },
  methods: {
    ...mapActions([
      'setOnboardingLink',
    ]),
    showLinkDetail(linkToken) {
      this.setOnboardingLink({ linkToken, mode: this.mode });
      this.showWidget = false;
    },
    onLinkCreated(link) {
      apiClient.links.regenerateLinkToken(link.id, this.formHeaders).then((linkResponse) => {
        const { linkToken } = linkResponse.data;
        this.showLinkDetail(linkToken);
      });
    },
    unselectLinkOption() {
      this.$emit('close-widget');
    },
  },
  components: {
    Widget,
    LinkCreated,
  },
};
</script>
