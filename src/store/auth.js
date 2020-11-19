import axiosAuth from '../axios-auth';

const initialState = {
  idToken: localStorage.getItem('idToken') || '',
  userId: localStorage.getItem('userId') || '',
  email: localStorage.getItem('email') || '',
  name: localStorage.getItem('name') || '',
  lastName: localStorage.getItem('lastName') || '',
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
};

const mutations = {
  saveSessionToStorage(state, userData) {
    localStorage.setItem('idToken', userData.idToken);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('name', userData.name);
    localStorage.setItem('lastName', userData.lastName);
  },

  saveSessionToStore(state, userData) {
    state.idToken = userData.idToken;
    state.userId = userData.userId;
    state.email = userData.email;
    state.name = userData.name;
    state.lastName = userData.lastName;
  },
};

function getUserDataFromAuthResponse(response) {
  return {
    idToken: response.data.authentication_token,
    userId: response.data.id,
    email: response.data.email,
    name: response.data.name,
    lastName: response.data.last_name,
  };
}

const actions = {
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

  logIn({ dispatch }, formData) {
    const payload = { email: formData.email, password: formData.password };
    const url = '/internal/v1/sessions';
    return axiosAuth.post(url, payload)
      .then((response) => {
        const userData = getUserDataFromAuthResponse(response);

        // BEGIN TEMP CODE: Do not show temporary missing names.
        if (userData.name === 'pending-name' || userData.name === 'remove-field') {
          userData.name = '';
        }
        if (userData.lastName === 'pending-last-name') {
          userData.lastName = '';
        }
        // END TEMP CODE.

        dispatch('saveSession', userData).then(() => {
          dispatch('identifyUserEvent');
        });
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

  signUp({ dispatch }, formData) {
    const payload = {
      name: formData.name,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
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
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
