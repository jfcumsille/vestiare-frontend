import apiClient from '../../api';

const initialWebhooksTest = {
  testRequestBody: null,
};
const initialState = {
  liveWebhookEndpoints: [],
  testWebhookEndpoints: [],
  mode: 'live',
  loading: true,
  liveError: false,
  testError: false,
  selectedWebhook: null,
  webhookSelectedToDelete: null,
  ...initialWebhooksTest,
  showCreateModal: false,
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
    if (state.selectedWebhook) {
      if (state.selectedWebhook.id === webhookEndpointId) state.selectedWebhook = null;
    }
  },
  updateWebhookEndpoint(state, { webhookEndpoint, mode }) {
    const key = mode === 'live' ? 'liveWebhookEndpoints' : 'testWebhookEndpoints';
    state[key] = state[key].map((webhook) => (webhook.id !== webhookEndpoint.id ? webhook : {
      ...webhookEndpoint,
    }));
    if (!state.selectedWebhook) return;
    if (state.selectedWebhook.id === webhookEndpoint.id) state.selectedWebhook = webhookEndpoint;
  },
  updateSelectedWebhook(state, webhookEndpointId) {
    if (!webhookEndpointId) state.selectedWebhook = null;
    let selectedWebhook = state.liveWebhookEndpoints
      .find((webhookEndpoint) => webhookEndpoint.id === webhookEndpointId);
    if (selectedWebhook) {
      state.mode = 'live';
      state.selectedWebhook = selectedWebhook;
      return;
    }
    selectedWebhook = state.testWebhookEndpoints
      .find((webhookEndpoint) => webhookEndpoint.id === webhookEndpointId);
    if (selectedWebhook) {
      state.mode = 'test';
      state.selectedWebhook = selectedWebhook;
    }
  },
  updateWebhookSelectedToDelete(state, webhookEndpointId) {
    state.webhookSelectedToDelete = webhookEndpointId;
  },
  updateWebhookTestResponse(state, { requestBody }) {
    state.testRequestBody = requestBody;
  },
  addWebhookEndpoint(state, { webhookEndpoint, mode }) {
    const key = mode === 'live' ? 'liveWebhookEndpoints' : 'testWebhookEndpoints';
    state[key].push(webhookEndpoint);
  },
  updateShowCreateModal(state) {
    state.showCreateModal = !state.showCreateModal;
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
  updateWebhookSelectedToDelete({ commit }, { webhookEndpointId }) {
    commit('updateWebhookSelectedToDelete', webhookEndpointId);
  },
  updateShowCreateModal({ commit }) {
    commit('updateShowCreateModal');
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
  async sendTestWebhookEvent({ commit }, {
    webhookEndpointId, requestBody, apiKey,
  }) {
    const headers = { ...this.getters.authHeaders, Authorization: apiKey };
    const params = {
      id: webhookEndpointId,
      current_organization_id: this.getters.getDefaultOrganizationId,
    };
    return apiClient.webhooks.sendTestWebhookEvent(headers, params, requestBody)
      .then((response) => {
        commit('updateWebhookTestResponse', response.data);
      });
  },
  async createWebhookEndpoint({ commit }, { requestBody, apiKey, mode }) {
    const headers = { ...this.getters.authHeaders, Authorization: apiKey };
    const params = {
      current_organization_id: this.getters.getDefaultOrganizationId,
    };
    return apiClient.webhooks.create(headers, params, requestBody)
      .then((response) => {
        commit('addWebhookEndpoint', { webhookEndpoint: response.data, mode });
        return response.data.id;
      })
      .catch(() => false);
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
