import axiosAuth from '../axios-auth';

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
      bankName: link.institution.name,
      holderType: link.holder_type,
      rut: link.username,
      numberOfAccounts: link.accounts.length,
      linkId: link.id,
    }));
  },
};

const actions = {
  destroyUserLink(context, linkId) {
    const url = `${process.env.VUE_APP_USER_LINKS_ROUTE}/${linkId}`;
    axiosAuth.delete(url, { headers: this.getters.authHeaders })
      .then(() => {
        // TODO: notify link deletion.
        this.dispatch('getUserLinks');
      })
      .catch((error) => console.log(error));
  },
  createUserLink(context, formData) {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_CREATE_USER_LINKS_ROUTE;
      axiosAuth.post(url, formData, { headers: this.getters.authHeaders })
        .then((response) => {
          this.dispatch('getUserLinks');
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },
  getUserLinks({ commit }) {
    const url = process.env.VUE_APP_USER_LINKS_ROUTE;
    axiosAuth.get(url, { headers: this.getters.authHeaders })
      .then((response) => { commit('updateUserLinks', response.data); })
      .catch((error) => console.log(error));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
