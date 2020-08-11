import axiosAuth from '../axios-auth';
import { findBankByCode } from '../banks-helper';

const state = {
  userLinks: [],
};

const getters = {
  userLinks() {
    return state.userLinks;
  },
};

const mutations = {
  updateUserLinks(context, userLinks) {
    state.userLinks = userLinks.map((link) => ({
      bank: findBankByCode(link.institution.id),
      holderType: link.holder_type,
      holderId: link.holder_id,
      rut: link.username,
      numberOfAccounts: link.accounts_count,
      linkId: link.id,
      mode: link.mode,
    }));
  },
};

const actions = {
  getUserLinks({ commit }) {
    return new Promise((resolve, reject) => {
      const url = '/v1/links';
      axiosAuth.get(url, { headers: this.getters.authHeaders })
        .then((response) => {
          commit('updateUserLinks', response.data);
          resolve();
        })
        .catch((error) => reject(error));
    });
  },
  destroyUserLink(context, linkId) {
    const url = `/v1/links/${linkId}`;
    axiosAuth.delete(url, { headers: this.getters.authHeaders })
      .then(() => {
        // TODO: notify link deletion.
        this.dispatch('getUserLinks');
      })
      .catch((error) => console.log(error));
  },
  createUserLinkFromWidget(context, payload) {
    const url = 'internal/v1/links/widget';
    return axiosAuth.post(url, payload.formData, { headers: { ...payload.headers } });
  },
  createUserLinkFromDashboard(context, payload) {
    const url = 'internal/v1/links/dashboard';
    return axiosAuth.post(url, payload.formData, { headers: { ...payload.headers } })
      .then((response) => {
        this.dispatch('getUserLinks');
        return response;
      });
  },
  sendNewLinkRequest(context, formData) {
    return new Promise((resolve, reject) => {
      const url = '/v1/user_credentials';
      axiosAuth.post(url, formData, { headers: this.getters.authHeaders })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
