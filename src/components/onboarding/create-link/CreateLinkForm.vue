<template>
  <div>
    <div v-if="!linkOptionSelected"
        class="flex flex-row text-center justify-center space-x-12">
      <div @click="selectModeOption(MODE_OPTIONS.test)"
            class="py-2 bg-white 2xl:text-2xl xl:text-xl text-lg
                  cursor-pointer rounded px-6 text-fintoc-blue text-bold
                  shadow-lg">
        Conectar cuenta de prueba
      </div>
      <div @click="selectModeOption(MODE_OPTIONS.live)"
            class="py-2 bg-fintoc-blue 2xl:text-2xl xl:text-xl text-lg
                  cursor-pointer rounded px-6 text-white text-bold
                  shadow-lg">
        Conectar mi cuenta real
      </div>
    </div>
    <transition name="fade">
      <widget
          v-if="linkOptionSelected"
          @linkCreated='onLinkCreated'
          :createdThrough="'onboarding'"
          :product="'movements'"
          :headers="formHeaders"
          :holderTypeOnboarding="'individual'"
          :mode="mode"
        />
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Widget from '../../links/link-wizard.vue';

const MODE_OPTIONS = { test: 'test', live: 'live' };

export default {
  data() {
    return {
      mode: null,
      MODE_OPTIONS,
    };
  },
  computed: {
    linkOptionSelected() {
      return Object.keys(MODE_OPTIONS).includes(this.mode);
    },
    formHeaders() {
      return this.$store.getters.authHeaders;
    },
  },
  methods: {
    ...mapActions([
      'setOnboardingLink',
      'setEnvironmentMode',
    ]),
    selectModeOption(mode) {
      this.setEnvironmentMode({ mode });
      this.mode = mode;
    },
    onLinkCreated(link) {
      this.setOnboardingLink({ link, mode: this.mode });
    },
  },
  components: {
    Widget,
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
