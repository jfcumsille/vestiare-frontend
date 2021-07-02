import apiClient from '../../api';

const initialWebhooksTest = {
  testRequestBody: null,
};
const initialState = {
  liveWebhookEndpoints: [],
  testWebhookEndpoints: [],
  mode: 'live',
  loading: true,
  selectedWebhook: null,
  webhookSelectedToDelete: null,
  ...initialWebhooksTest,
  showCreateModal: false,
  showSendTestWebhookModal: false,
  supportedEventTypes: [],
};

const getters = {
  webhookEndpoints(state) {
    return state.mode === 'test' ? [...state.testWebhookEndpoints].reverse() : [...state.liveWebhookEndpoints].reverse();
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
  updateShowSendTestWebhookModal(state) {
    state.showSendTestWebhookModal = !state.showSendTestWebhookModal;
  },
  updateEventTypes(state, { supportedEventTypes }) {
    state.supportedEventTypes = supportedEventTypes;
  },
};

const actions = {
  async getWebhookEndpoints({ commit }, { mode }) {
    const headers = this.getters.authHeaders;
    const params = { current_organization_id: this.getters.getDefaultOrganizationId, mode };
    return apiClient.webhooks.index(headers, params).then((response) => {
      commit('updateWebhookEndpoints', { userEndpoints: response.data, mode });
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
  updateShowSendTestWebhookModal({ commit }) {
    commit('updateShowSendTestWebhookModal');
  },
  updateWebhookTestResponse({ commit }, { requestBody }) {
    commit('updateWebhookTestResponse', { requestBody });
  },
  async destroyWebhookEndpoint({ commit }, { webhookEndpointId, mode }) {
    const headers = this.getters.authHeaders;
    const params = {
      id: webhookEndpointId,
      current_organization_id: this.getters.getDefaultOrganizationId,
      mode,
    };
    apiClient.webhooks.destroy(headers, params).then(() => {
      commit('removeWebhookEndpoint', { webhookEndpointId, mode });
    });
  },
  async updateWebhookEndpoint({ commit }, {
    webhookEndpointId, requestBody, mode,
  }) {
    const headers = this.getters.authHeaders;
    const params = {
      id: webhookEndpointId,
      current_organization_id: this.getters.getDefaultOrganizationId,
      mode,
    };
    apiClient.webhooks.update(headers, params, requestBody).then((response) => {
      commit('updateWebhookEndpoint', { webhookEndpoint: response.data, mode });
    });
  },
  async sendTestWebhookEvent({ commit }, {
    webhookEndpointId, requestBody,
  }) {
    const headers = this.getters.authHeaders;
    const params = {
      id: webhookEndpointId,
      current_organization_id: this.getters.getDefaultOrganizationId,
      mode: 'test',
    };
    return apiClient.webhooks.sendTestWebhookEvent(headers, params, requestBody)
      .then((response) => {
        commit('updateWebhookTestResponse', response.data);
      });
  },
  async createWebhookEndpoint({ commit }, { requestBody, mode }) {
    const headers = this.getters.authHeaders;
    const params = {
      current_organization_id: this.getters.getDefaultOrganizationId,
      mode,
    };
    return apiClient.webhooks.create(headers, params, requestBody)
      .then((response) => {
        commit('addWebhookEndpoint', { webhookEndpoint: response.data, mode });
        return response.data.id;
      })
      .catch(() => false);
  },
  async getAvailableEventTypes({ commit }) {
    const headers = this.getters.authHeaders;
    return apiClient.webhooks.getAvailableWebhookEventTypes(headers)
      .then((response) => {
        commit('updateEventTypes', { supportedEventTypes: response.data });
        return response.data;
      });
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
