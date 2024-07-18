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
  login: async ({ commit },  data ) =>
    new Promise(resolve => {
      console.log(data)
      const parsedData = window.Telegram.Utils.urlParseQueryString(data)
      console.log(parsedData)
      let user = JSON.parse(parsedData.user)

      if (parsedData && user && user.id) {
        client
          .requestAsync('login', { parsedData })
          .then(result => {
            console.log(user)
            commit('saveUsername', user.id.toString());
            commit('saveNickname', user.username.toString());
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
