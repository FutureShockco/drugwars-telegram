import Vue from 'vue';
import client from '@/helpers/client';
import sc from '@/helpers/steemlogin';

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
async function loadaccount(commit, username) {
  const account = "test";
  commit('saveAccount', account[0]);
}

const actions = {
  login: async ({ commit }) =>
    new Promise(resolve => {
      if (this.TWA && this.TWA.initDataUnsafe && this.TWA.initDataUnsafe.user) {
        client
          .requestAsync('login', { user: this.TWA.initDataUnsafe.user })
          .then(result => {
            commit('saveUsername', result.name);
            loadaccount(commit, result.name);
            resolve();
          })
          .catch(e => {
            console.log(e);
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('loggedIn');
            window.location = '/';
            resolve(e);
          });
      } else {
        console.log('no access token');
        resolve();
      }
    }),

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('loggedIn');
    window.location = '/';
  },
};

export default {
  state,
  mutations,
  actions,
};
