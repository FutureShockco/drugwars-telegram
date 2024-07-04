import Vue from 'vue';
import client from '@/helpers/client';

const state = {
  username: null,
  account: null,
  auth_type: null
};

const mutations = {
  saveUsername(_state, payload) {
    Vue.set(_state, 'username', payload);
  },
  saveAccount(_state, payload) {
    Vue.set(_state, 'account', payload);
  },
  logout(_state) {
    Vue.set(_state, 'username', null);
  },
};


const actions = {
  login: async ({ commit }) =>
    new Promise(resolve => {
      if (this.TWA && this.TWA.initDataUnsafe && this.TWA.initDataUnsafe.user) {
        client
          .requestAsync('login', { user: this.TWA.initDataUnsafe.user })
          .then(result => {
            commit('saveUsername', result.name);
            resolve();
          })
          .catch(e => {
            console.log(e);
            window.location = '/';
            resolve(e);
          });
      } else {
        console.log('no access token');
        resolve();
      }
    }),

  logout: () => {

    window.location = '/';
  },
};

export default {
  state,
  mutations,
  actions,
};
