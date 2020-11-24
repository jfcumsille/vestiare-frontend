<template>
<div>
  <div class="px-8 bg-white rounded-lg flex
  flex-col items-center justify-center py-8 shadow-lg">
    <div>
      <img src="../../../assets/images/fintoc-isologo.png" class="h-16" />
    </div>

    <div class="py-8 text-center text-xl">
      <p> Bienvendio a Fintoc, {{ name }}! </p>
      <p>  Necesitamos conocerte un poco más antes de partir </p>
    </div>

    <div class="flex flex-col justify-center md:justify-start
    my-auto  px-8">
      <form class="flex flex-col" onsubmit="event.preventDefault();">
          <div class="flex flex-col pt-4 pb-8">
              <label class="text-lg text-center pb-4">Sabes programar?</label>
              <div class="flex flex-row gap-x-8">
                <introduction-button
                @click.native="selectOption('isProgrammerSelected', true)"
                :isActive="isProgrammer(true)"> Si </introduction-button>
                <introduction-button
                @click.native="selectOption('isProgrammerSelected', false)"
                :isActive="isProgrammer(false)"> No </introduction-button>
              </div>
          </div>

          <div class="flex flex-col pt-4">
              <label class="text-lg text-center pb-4">Para que quieres usar Fintoc?</label>
              <div class="flex flex-row gap-x-8">
                <introduction-button
                  :isActive="useCaseOption('business')"
                  @click.native="selectOption('useCaseSelected', 'business')"
                > Empresa </introduction-button>
                <introduction-button
                  :isActive="useCaseOption('person')"
                  @click.native="selectOption('useCaseSelected', 'person')"
                > Persona </introduction-button>              </div>
          </div>

          <div @click="nextPage"
          class="shadow-outline-lg rounded text-white font-bold
          text-lg text-center p-2 mt-8 lg:mt-12 ring-0 focus:ring-0"
          v-bind:class="nextPageButtonCSS"> Continuar </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import IntroductionButton from './IntroductionButton.vue';

export default {
  data() {
    return {
      isProgrammerSelected: null,
      useCaseSelected: null,
    };
  },
  computed: {
    ...mapState({
      name: (state) => state.auth.name,
    }),
    isCompleted() {
      return this.isProgrammerSelected !== null && this.useCaseSelected !== null;
    },
    nextPageButtonCSS() {
      if (this.isCompleted) {
        return ['bg-tint-cyan', 'focus:bg-tint-yellow', 'hover:bg-tint-yellow', 'cursor-pointer'];
      }
      return ['bg-gray-400', 'cursor-default', 'disabled'];
    },
  },
  methods: {
    ...mapActions([
      'setOnboarding',
    ]),
    nextPage() {
      if (this.isCompleted) {
        const payload = {
          isProgrammer: this.isProgrammerSelected,
          useCase: this.useCaseSelected,
        };
        this.setOnboarding(payload);
        this.$emit('next');
      }
    },
    isProgrammer(selected) {
      return selected === this.isProgrammerSelected;
    },
    useCaseOption(selected) {
      return selected === this.useCaseSelected;
    },
    selectOption(question, value) {
      this[question] = value;
    },
  },
  components: {
    IntroductionButton,
  },
};
</script>

<style scoped>

</style>
