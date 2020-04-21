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
  logIn({ commit }, formData) {
    return new Promise((resolve, reject) => {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const url = '/api/v1/sessions';
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
      const url = '/api/v1/users';
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
