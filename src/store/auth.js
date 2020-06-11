import axiosAuth from '../axios-auth';

const state = {
  email: localStorage.getItem('email') || '',
  idToken: localStorage.getItem('idToken') || '',
  userId: localStorage.getItem('userId') || '',
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
    };
  },
  getUser() {
    return state.userId;
  },
};

const mutations = {
  saveSessionToStorage(context, userData) {
    localStorage.setItem('idToken', userData.idToken);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('email', userData.email);
  },
  saveSessionToStore(context, userData) {
    state.idToken = userData.idToken;
    state.userId = userData.userId;
    state.email = userData.email;
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
    };
    this.commit('saveSessionToStore', clearAuthData);
    this.commit('saveSessionToStorage', clearAuthData);
  },
};

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
        const userData = {
          idToken: response.data.authentication_token,
          userId: response.data.id,
          email: response.data.email,
        };
        commit('saveSession', userData);
      });
  },
  logIn({ commit }, formData) {
    return new Promise((resolve, reject) => {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const url = '/v1/sessions';
      axiosAuth.post(url, payload)
        .then((response) => {
          const userData = {
            idToken: response.data.authentication_token,
            userId: response.data.id,
            email: response.data.email,
          };
          commit('saveSession', userData);
          resolve();
        })
        .catch((error) => reject(error));
    });
  },
  sendPasswordRecovery(context, formData) {
    const payload = {
      email: formData.email,
    };
    const url = '/internal/v1/users/password';
    return axiosAuth.post(url, payload);
  },
  signOut({ commit }) {
    return new Promise((resolve) => {
      commit('clearAuthData');
      resolve();
    });
  },
  signUp({ commit }, formData) {
    return new Promise((resolve, reject) => {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const url = '/v1/users';
      axiosAuth.post(url, payload)
        .then((response) => {
          const userData = {
            idToken: response.data.authentication_token,
            userId: response.data.id,
            email: response.data.email,
          };
          commit('saveSession', userData);
          resolve();
        })
        .catch((error) => reject(error));
    });
  },
  tryToLoginFromStorage({ commit }) {
    const userData = this.getters.retrieveSessionFromStorage;
    if (userData) { commit('saveSessionToStore', userData); }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
