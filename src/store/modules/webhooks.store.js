import apiClient from '../../api';

const initialState = {
  liveWebhookEndpoints: [],
  testWebhookEndpoints: [],
  mode: 'live',
  loading: true,
  liveError: false,
  testError: false,
};

const getters = {
  webhookEndpoints(state) {
    return state.mode === 'test' ? [...state.testWebhookEndpoints].reverse() : [...state.liveWebhookEndpoints].reverse();
  },
  errors(state) {
    return state.mode === 'test' ? state.testError : state.liveError;
  },
};

const mutations = {
  updateWebhookEndpoints(state, { userEndpoints, mode }) {
    const webhookEndpoints = userEndpoints.map((subscribedEndpoint) => ({
      id: subscribedEndpoint.id,
      description: subscribedEndpoint.description,
      url: subscribedEndpoint.url,
      status: subscribedEndpoint.status,
      mode: subscribedEndpoint.mode,
      enabledEvents: subscribedEndpoint.enabledEvents,
    }));
    if (mode === 'test') {
      state.testWebhookEndpoints = webhookEndpoints;
    }
    if (mode === 'live') {
      state.liveWebhookEndpoints = webhookEndpoints;
    }
  },
  updateMode(state) {
    const modeValue = state.mode === 'test' ? 'live' : 'test';
    state.mode = modeValue;
  },
  updateLoading(state, status) {
    state.loading = status;
  },
  updateErrors(state, error) {
    if (state.mode === 'test') { state.testError = error; } else if (state.mode === 'live') state.liveError = error;
  },
};

const actions = {
  getWebhookEndpoints({ commit }, { mode, apiKey }) {
    const headers = { ...this.getters.authHeaders, Authorization: apiKey };
    const params = { current_organization_id: this.getters.getDefaultOrganizationId };
    apiClient.webhooks.index(headers, params).then((response) => {
      commit('updateWebhookEndpoints', { userEndpoints: response.data, mode });
      commit('updateLoading', false);
      commit('updateErrors', false);
    }).catch((error) => {
      commit('updateErrors', error.response.data.error);
      commit('updateLoading', false);
    });
  },
  updateWebhookEndpointsMode({ commit }) {
    commit('updateMode');
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
