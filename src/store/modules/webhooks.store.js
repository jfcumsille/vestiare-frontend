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
    if (mode === 'test') {
      state.testWebhookEndpoints = userEndpoints;
    }
    if (mode === 'live') {
      state.liveWebhookEndpoints = userEndpoints;
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
  removeWebhookEndpoint(state, { webhookEndpointId, mode }) {
    if (mode === 'live') {
      state.liveWebhookEndpoints = state.liveWebhookEndpoints
        .filter((webhook) => webhook.id !== webhookEndpointId);
    } else if (mode === 'test') {
      state.testWebhookEndpoints = state.testWebhookEndpoints
        .filter((webhook) => webhook.id !== webhookEndpointId);
    }
  },
  updateWebhookEndpoint(state, { webhookEndpoint, mode }) {
    const key = mode === 'live' ? 'liveWebhookEndpoints' : 'testWebhookEndpoints';
    state[key] = state[key].map((webhook) => (webhook.id !== webhookEndpoint.id ? webhook : {
      ...webhookEndpoint,
    }));
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
  async destroyWebhookEndpoint({ commit }, { webhookEndpointId, apiKey, mode }) {
    const headers = { ...this.getters.authHeaders, Authorization: apiKey };
    const params = {
      id: webhookEndpointId,
      current_organization_id: this.getters.getDefaultOrganizationId,
    };
    apiClient.webhooks.destroy(headers, params).then(() => {
      commit('removeWebhookEndpoint', { webhookEndpointId, mode });
    });
  },
  async updateWebhookEndpoint({ commit }, {
    webhookEndpointId, requestBody, mode, apiKey,
  }) {
    const headers = { ...this.getters.authHeaders, Authorization: apiKey };
    const params = {
      id: webhookEndpointId,
      current_organization_id: this.getters.getDefaultOrganizationId,
    };
    apiClient.webhooks.update(headers, params, requestBody).then((response) => {
      commit('updateWebhookEndpoint', { webhookEndpoint: response.data, mode });
    });
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
