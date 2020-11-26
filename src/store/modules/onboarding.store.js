export default {
  state: {
    show: false,
    currentStep: 0,
    isProgrammer: null,
    useCase: null,
    link: null,
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
    setOnboardingLink(state, payload) {
      state.link = payload.link;
    },
  },
  actions: {
    nextOnboardingStep({ commit }) {
      commit('updateCurrentStep');
    },
    setOnboarding({ commit }, payload) {
      commit('setInitialOnboarding', payload);
    },
    setOnboardingLink({ commit }, payload) {
      commit('setOnboardingLink', payload);
    },
  },
};
