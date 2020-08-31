import axiosAuth from '../axios-auth';

const state = {
  idToken: localStorage.getItem('idToken') || '',
  userId: localStorage.getItem('userId') || '',
  email: localStorage.getItem('email') || '',
  name: localStorage.getItem('name') || '',
  lastName: localStorage.getItem('lastName') || '',
};

const getters = {
  isUserLoggedIn() {
    return !!state.idToken && !!state.userId;
  },

  retrieveSessionFromStorage() {
    return {
      idToken: localStorage.getItem('idToken'),
      userId: localStorage.getItem('userId'),
      email: localStorage.getItem('email'),
      name: localStorage.getItem('name'),
      lastName: localStorage.getItem('lastName'),
    };
  },

  getUser() {
    return state.userId;
  },

  getEmail() {
    return state.email;
  },

  getName() {
    return state.name;
  },

  getLastName() {
    return state.lastName;
  },
};

const mutations = {
  saveSessionToStorage(context, userData) {
    localStorage.setItem('idToken', userData.idToken);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('name', userData.name);
    localStorage.setItem('lastName', userData.lastName);
  },

  saveSessionToStore(context, userData) {
    state.idToken = userData.idToken;
    state.userId = userData.userId;
    state.email = userData.email;
    state.name = userData.name;
    state.lastName = userData.lastName;
  },

  saveSession(context, userData) {
    this.commit('saveSessionToStorage', userData);
    this.commit('saveSessionToStore', userData);
  },

  clearAuthData() {
    const clearAuthData = {
      idToken: '',
      userId: '',
      email: '',
      name: '',
      lastName: '',
    };
    this.commit('saveSessionToStore', clearAuthData);
    this.commit('saveSessionToStorage', clearAuthData);
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
  changePassword({ commit }, formData) {
    const payload = {
      reset_password_token: formData.resetPasswordToken,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
    };
    const url = '/internal/v1/users/password';
    return axiosAuth.put(url, payload)
      .then((response) => {
        const userData = getUserDataFromAuthResponse(response);
        commit('saveSession', userData);
      })
      .catch((error) => { throw error; });
  },

  logIn({ commit }, formData) {
    const payload = {
      email: formData.email,
      password: formData.password,
    };
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

        commit('saveSession', userData);
      })
      .catch((error) => { throw error; });
  },

  sendPasswordRecovery(context, formData) {
    const payload = {
      email: formData.email,
    };
    const url = '/internal/v1/users/password';
    return axiosAuth.post(url, payload);
  },

  signOut({ commit }) {
    return commit('clearAuthData');
  },

  signUp({ commit }, formData) {
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
        commit('saveSession', userData);
      });
  },

  tryToLoginFromStorage({ commit }) {
    const userData = this.getters.retrieveSessionFromStorage;
    if (userData) { commit('saveSessionToStore', userData); }
  },

  updateUserInformation({ commit }, formData) {
    const url = `/internal/v1/users/${state.userId}`;
    const payload = {
      name: formData.name,
      last_name: formData.lastName,
    };
    return axiosAuth.put(url, payload, { headers: this.getters.authHeaders })
      .then((response) => {
        const userData = getUserDataFromAuthResponse(response);
        commit('saveSession', userData);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
