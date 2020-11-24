export default {
  state: {
    show: false,
    currentStep: 0,
    isProgrammer: null,
    useCase: null,
  },
  getters: {
  },
  mutations: {
    updateCurrentStep(state) {
      state.currentStep += 1;
    },
    setInitialOnboarding(state, payload) {
      state.isProgrammer = payload.isProgrammer;
      state.useCase = payload.useCase;
    },
  },
  actions: {
    nextOnboardingStep({ commit }) {
      commit('updateCurrentStep');
    },
    setOnboarding({ commit }, payload) {
      commit('setInitialOnboarding', payload);
    },
  },
};
