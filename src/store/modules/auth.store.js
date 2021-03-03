import axiosAuth from '../../axios-auth';
import apiClient from '../../api';

const initialState = {
  idToken: localStorage.getItem('idToken') || '',
  userId: localStorage.getItem('userId') || '',
  email: localStorage.getItem('email') || '',
  name: '',
  lastName: '',
  organizations: [],
  defaultOrganizationId: localStorage.getItem('defaultOrganizationId') || '',
  country: null,
};

const getters = {
  isUserLoggedIn(state) {
    return !!state.idToken && !!state.userId;
  },

  getUser(state) {
    return state.userId;
  },

  getEmail(state) {
    return state.email;
  },

  getName(state) {
    return state.name;
  },

  getLastName(state) {
    return state.lastName;
  },

  getFullName(state) {
    return `${state.name} ${state.lastName}`;
  },

  getOrganizations(state) {
    return state.organizations;
  },

  getDefaultOrganizationId(state) {
    return state.defaultOrganizationId;
  },
};

const mutations = {
  saveSessionToStorage(state, userData) {
    localStorage.setItem('idToken', userData.idToken);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('defaultOrganizationId', userData.defaultOrganizationId);
  },

  saveSessionToStore(state, userData) {
    state.idToken = userData.idToken;
    state.userId = userData.userId;
    state.email = userData.email;
    state.name = userData.name;
    state.lastName = userData.lastName;
    state.organizations = userData.organizations;
    state.defaultOrganizationId = userData.defaultOrganizationId;
  },

  updateDefaultOrganizationId(state, defaultOrganizationId) {
    state.defaultOrganizationId = defaultOrganizationId;
    localStorage.setItem('defaultOrganizationId', defaultOrganizationId);
  },

  getCountry(state, country) {
    state.country = country;
  },
};

function getUserDataFromAuthResponse(response) {
  return {
    idToken: response.data.authentication_token,
    userId: response.data.id,
    email: response.data.email,
    name: response.data.name,
    lastName: response.data.last_name,
    organizations: response.data.organizations,
    defaultOrganizationId: response.data.default_organization_id,
  };
}

const actions = {
  setOrganizationChange({ commit }, payload) {
    commit('changeOrganization', payload);
  },
  saveSession({ commit }, userData) {
    commit('saveSessionToStorage', userData);
    commit('saveSessionToStore', userData);
  },

  clearAuthData({ dispatch }) {
    const clearAuthData = {
      idToken: '',
      userId: '',
      email: '',
      name: '',
      lastName: '',
      organizations: [],
      defaultOrganizationId: '',
    };
    dispatch('saveSession', clearAuthData);
  },

  changePassword({ dispatch }, formData) {
    const payload = {
      reset_password_token: formData.resetPasswordToken,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
    };
    const url = '/internal/v1/users/password';
    return axiosAuth.put(url, payload)
      .then((response) => {
        const userData = getUserDataFromAuthResponse(response);
        dispatch('saveSession', userData).then(() => {
          dispatch('identifyUserEvent');
        });
      })
      .catch((error) => { throw error; });
  },

  identifyUserEvent(context) {
    window.analytics.identify(context.state.userId, {
      email: context.state.email,
      name: context.getters.getFullName,
    });
  },

  handleUserResponse({ dispatch }, response) {
    const userData = getUserDataFromAuthResponse(response);
    // BEGIN TEMP CODE: Do not show temporary missing names.
    if (userData.name === 'pending-name' || userData.name === 'remove-field') {
      userData.name = '';
    }
    if (userData.lastName === 'pending-last-name') {
      userData.lastName = '';
    }
    // END TEMP CODE.
    dispatch('saveSession', userData).then(() => { dispatch('identifyUserEvent'); });
  },

  getCurrentUser({ dispatch }) {
    const url = `/internal/v1/users/${initialState.userId}`;
    return axiosAuth.get(url, { headers: this.getters.authHeaders })
      .then((response) => {
        dispatch('handleUserResponse', response);
      })
      .catch((error) => { throw error; });
  },

  logIn({ dispatch }, formData) {
    const payload = {
      email: formData.email,
      password: formData.password,
      token: formData.idToken,
    };
    const url = '/internal/v1/sessions';
    return axiosAuth.post(url, payload)
      .then((response) => {
        dispatch('handleUserResponse', response);
      })
      .catch((error) => { throw error; });
  },

  sendPasswordRecovery(context, formData) {
    const payload = { email: formData.email };
    const url = '/internal/v1/users/password';
    return axiosAuth.post(url, payload);
  },

  signOut({ dispatch }) {
    return dispatch('clearAuthData');
  },

  updateDefaultOrganizationId({ commit }, payload) {
    commit('updateDefaultOrganizationId', payload.defaultOrganizationId);
  },

  signUp({ dispatch }, formData) {
    const payload = {
      name: formData.name,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      token: formData.token,
    };
    const url = '/internal/v1/users';
    return axiosAuth.post(url, payload)
      .then((response) => {
        const userData = getUserDataFromAuthResponse(response);
        dispatch('saveSession', userData).then(() => {
          dispatch('identifyUserEvent');
        });
      });
  },

  updateUserInformation({ dispatch, state }, formData) {
    const url = `/internal/v1/users/${state.userId}`;
    const payload = { name: formData.name, last_name: formData.lastName };
    return axiosAuth.put(url, payload, { headers: this.getters.authHeaders })
      .then((response) => {
        const userData = getUserDataFromAuthResponse(response);
        dispatch('saveSession', userData).then(() => {
          dispatch('identifyUserEvent');
        });
      });
  },

  async getCountry({ commit }) {
    const headers = this.getters.authHeaders;
    const response = await apiClient.country.get(headers);
    commit('getCountry', response.data.country);
    return response.data.country;
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
