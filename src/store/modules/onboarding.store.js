import apiClient from '../../api';

export default {
  state: {
    accounts: null,
    apiKey: null,
    publicKey: null,
    currentStep: 0,
    isProgrammer: null,
    linkId: null,
    linkToken: null,
    mode: null,
    movements: [],
    show: null,
    skipped: null,
    useCase: null,
  },
  getters: {
  },
  mutations: {
    updateShowOnboarding(state, payload) {
      state.show = payload.onboarding;
    },
    setOnboardingToFalse(state) {
      state.show = false;
    },
    setOnboardingToSkipped(state) {
      state.skipped = true;
    },
    setNextStep(state) {
      state.currentStep += 1;
    },
    setPreviousStep(state) {
      state.currentStep -= 1;
    },
    setProgrammerOption(state, payload) {
      state.isProgrammer = payload;
    },
    setUseCaseOption(state, payload) {
      state.useCase = payload;
    },
    setOnboardingLink(state, payload) {
      state.linkToken = payload.linkToken;
    },
    setLinkId(state, payload) {
      state.linkId = payload.linkId;
    },
    setMode(state, payload) {
      state.mode = payload.mode;
    },
    resetLink(state) {
      state.mode = null;
      state.link = null;
      state.accounts = null;
      state.movements = [];
    },
    setApiKey(state, payload) {
      state.apiKey = payload.apiKey;
    },
    setAccounts(state, payload) {
      state.accounts = payload.accounts;
    },
    setMovements(state, payload) {
      state.movements = payload.movements;
    },
    setPublicKey(state, payload) {
      state.publicKey = payload;
    },
  },
  actions: {
    showOnboarding({ commit }) {
      apiClient.onboarding.index(this.getters.authHeaders).then((response) => {
        commit('updateShowOnboarding', response.data);
      });
    },
    skipOnboarding({ commit }) {
      commit('setOnboardingToFalse');
      commit('setOnboardingToSkipped');
    },
    finishOnboarding({ commit }) {
      commit('setOnboardingToFalse');
    },
    nextOnboardingStep({ commit }) {
      commit('setNextStep');
    },
    previousOnboardingStep({ commit }) {
      commit('setPreviousStep');
    },
    updateProgrammerOption({ commit }, payload) {
      commit('setProgrammerOption', payload);
    },
    updateUseCaseOption({ commit }, payload) {
      commit('setUseCaseOption', payload);
    },
    setOnboardingLink({ commit }, payload) {
      commit('setOnboardingLink', payload);
    },
    setEnvironmentMode({ commit }, payload) {
      commit('setMode', payload);
    },
    setLinkId({ commit }, payload) {
      commit('setLinkId', payload);
    },
    removeLink({ commit }) {
      commit('resetLink');
    },
    async fetchApiKeys({ commit, dispatch, state }) {
      const params = { current_organization_id: this.getters.getDefaultOrganizationId };
      const response = await apiClient.apiKeys.index(this.getters.authHeaders, params);
      const apiKey = response.data.find((key) => key.mode === state.mode && !key.isPublic);
      const publicKey = response.data.find((key) => key.mode === state.mode && key.isPublic);
      if (publicKey) {
        commit('setPublicKey', publicKey);
      }
      if (apiKey) {
        commit('setApiKey', { apiKey });
      } else {
        await dispatch('createUserApiKey').then((res) => {
          commit('setApiKey', { apiKey: res.data });
        });
      }
    },
    async fetchAccounts({ commit, state }) {
      const { linkToken, apiKey } = state;
      const response = await apiClient.accounts.get({ linkToken, apiKey });
      commit('setAccounts', { accounts: response.data });
    },
    async fetchMovements({ commit, state }) {
      const { linkToken } = state;
      const accountId = state.accounts[0].id;
      const apiKey = state.apiKey.token;
      const response = await apiClient.movements.get({ linkToken, accountId, apiKey });
      commit('setMovements', { movements: response.data });
      return response;
    },
  },
};
