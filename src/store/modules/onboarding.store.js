export default {
  state: {
    show: false,
    currentStep: 0,
  },
  getters: {
  },
  mutations: {
    updateCurrentStep(state) {
      state.currentStep += 1;
    },
  },
  actions: {
    nextOnboardingStep({ commit }) {
      commit('updateCurrentStep');
    },
  },
};
