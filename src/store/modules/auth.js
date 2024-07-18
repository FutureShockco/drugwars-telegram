import Vue from 'vue';
import client from '@/helpers/client';

const state = {
  username: null,
  nickname: null,
  account: null,
  auth_type: null
};

const mutations = {
  saveUsername(_state, payload) {
    Vue.set(_state, 'username', payload);
  },
  saveNickname(_state, payload) {
    Vue.set(_state, 'nickname', payload);
  },
  saveAccount(_state, payload) {
    Vue.set(_state, 'account', payload);
  },
  logout(_state) {
    Vue.set(_state, 'username', null);
  },
};


const actions = {
  login: async ({ commit }, { user }) =>
    new Promise(resolve => {
      user.id = user.id.toString()
      const parsedData = window.Telegram.Utils.urlParseQueryString(user)
      if (parsedData && user && user.id) {
        client
          .requestAsync('login', { parsedData })
          .then(result => {
            commit('saveUsername', user.id.toString());
            commit('saveNickname', user.username);
            resolve(result);
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
