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
      const parsedData = window.Telegram.Utils.urlParseQueryString(data)
      let user = JSON.parse(parsedData.user)

      if (parsedData && user && user.id) {
        client
          .requestAsync('login', { parsedData })
          .then(result => {
            commit('saveAccount', data)
            commit('saveUsername', user.id.toString());
            if(user.username)
            commit('saveNickname', user.username.toString());
            else commit('saveNickname', user.id.toString());
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
    updateNickname: async ({ commit },  data ) =>
      new Promise(resolve => {
        console.log(data)
        const parsedData = window.Telegram.Utils.urlParseQueryString(data.user)
        let user = JSON.parse(parsedData.user)
        if (parsedData && user && user.id) {
          client
            .requestAsync('update_nickname', { user })
            .then(result => {
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
