import Vue from 'vue';
import Promise from 'bluebird';
import client from '@/helpers/client';
import store from '@/store';
import dwsocial from '@/helpers/dwsocial';


const dealerSteemUsername = process.env.VUE_APP_DEALER_STEEM_USERNAME;
const defaultErrorMessage = 'Oops something went wrong';

const handleError = (dispatch, error, message = defaultErrorMessage) => {
  dispatch('notify', {
    type: 'error',
    message: error.error_description || error.error || message,
  });
  console.error(error);
};

const state = {
  prizeProps: null,
  user: null,
  fights: [],
  stations: [],
  transports: [],
  gang_buildings: [],
  chat: false,
  isconnected: null,
  base: null,
  mainbase: null,
  steemengine: null,
  force_sent_fights_refresh: true,
  server: JSON.parse(localStorage.getItem('server')) || { api: process.env.VUE_APP_API, name: 'Chicago', number: 1 },
  tutoDetail: 0
};

const mutations = {
  savePrizeProps(_state, payload) {
    Vue.set(_state, 'prizeProps', payload);
  },
  saveServer(_state, payload) {
    Vue.set(_state, 'server', payload);
  },
  saveUser(_state, payload) {
    Vue.set(_state, 'user', payload);
  },
  saveFights(_state, payload) {
    Vue.set(_state, 'inc_fights', payload);
  },
  saveSentFights(_state, payload) {
    Vue.set(_state, 'sent_fights', payload);
  },
  saveSentGangFights(_state, payload) {
    Vue.set(_state, 'sent_gangfights', payload);
  },
  saveSentFightsRefresh(_state, payload) {
    Vue.set(_state, 'force_sent_fights_refresh', payload);
  },
  saveFightsCount(_state, payload) {
    Vue.set(_state, 'fights_count', payload);
  },
  saveTransports(_state, payload) {
    Vue.set(_state, 'transports', payload);
  },
  saveTransportsCount(_state, payload) {
    Vue.set(_state, 'transports_count', payload);
  },
  saveStationsCount(_state, payload) {
    Vue.set(_state, 'stations_count', payload);
  },
  saveStations(_state, payload) {
    Vue.set(_state, 'stations', payload);
  },
  saveGangBuildings(_state, payload) {
    Vue.set(_state, 'gang_buildings', payload);
  },
  saveGangEvents(_state, payload) {
    Vue.set(_state, 'gang_events', payload);
  },
  saveUserRewardHistory(_state, payload) {
    Vue.set(_state, 'user_reward_history', payload);
  },
  saveConnected(_state, payload) {
    Vue.set(_state, 'isconnected', payload);
  },
  saveBase(_state, payload) {
    Vue.set(_state, 'base', payload);
  },
  saveMainBase(_state, payload) {
    Vue.set(_state, 'mainbase', payload);
  },
  saveSE(_state, payload) {
    Vue.set(_state, 'steemengine', payload);
  },
  setTutoDetail(_state, payload) {
    Vue.set(_state, 'tutoDetail', payload);
  },
};

let registeredUser = null;
const authToken = function () {
  return registeredUser;
};

const actions = {
  init: ({ commit, dispatch }, newUser) =>
    new Promise((resolve, reject) => {
      if (!newUser && registeredUser)
        newUser = registeredUser
      dispatch('login', newUser);
      registeredUser = newUser;
      let totalbases = 0;
      if (
        state.user &&
        state.user.buildings &&
        state.user.buildings.find(b => b.building === 'headquarters')
      ) {
        totalbases = state.user.buildings.find(b => b.building === 'headquarters').length;
      }
      if (registeredUser) {
        client
          .requestAsync('get_user', registeredUser)
          .then(user => {
            console.log(user)
            if (user && user.user && user.user.username) {
              if (user.user.tutorial < 15)
                store.dispatch('showTutorial')
              Promise.all([client.requestAsync('get_prize_props', null)]).then(([prizeProps]) => {
                commit('savePrizeProps', prizeProps);
                commit('saveUser', user);
                commit('saveConnected', true);
                commit(
                  'saveBase',
                  user.buildings.find(b => b.main === 1 && b.territory != 0 && b.base != 0),
                );
                if (
                  totalbases !== user.buildings.find(b => b.building === 'headquarters').length
                )
                  commit(
                    'saveMainBase',
                    user.buildings.find(
                      b =>
                        b.main === 1 &&
                        b.territory !== 0 &&
                        b.base !== 0 &&
                        b.building === 'headquarters',
                    ),
                  );
                dispatch('refresh_fights_count');
                //dispatch('refresh_transport_count');
                //dispatch('refresh_station_count');
                return resolve("success");
              });
            } else {
              console.log('signup')
              dispatch('signup').then(() => {
                Promise.delay(2000).then(() => {
                  // window.location = '/home';
                  resolve()
                });
              });
            }
          })
          .catch(err => {
            console.log(err);
            handleError(dispatch, err, 'Loading account failed');
            return reject(err);
          });
      }
    }),
  refresh_inc_fights: ({ commit, dispatch }, limit) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      let start = 0;
      let end = 25;
      if (limit) {
        start = limit.start;
        end = limit.end;
      }
      client
        .requestAsync('get_inc_fights', { token, start, end })
        .then(fights => {
          commit('saveFights', fights);
          return resolve(fights);
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading incoming fights failed');
          return reject(err);
        });
    }),
  refresh_fights_count: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {

      const { username } = authToken();
      client
        .requestAsync('get_fights_count', { username })
        .then(fights => {
          commit('saveFightsCount', fights);
          return resolve(fights);
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading incoming fights count failed');
          return reject(err);
        });
    }),
  refresh_sent_fights: ({ commit, dispatch }, limit) =>
    new Promise((resolve, reject) => {
      const { username } = authToken();
      let start = 0;
      let end = 25;
      if (limit) {
        start = limit.start;
        end = limit.end;
      }
      client
        .requestAsync('get_sent_fights', { username, start, end })
        .then(fights => {
          console.log(fights)
          commit('saveSentFights', fights);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading sent fights failed');
          return reject(err);
        });
    }),
  force_sent_fights_refresh: ({ commit, dispatch }, value) => {
    commit('saveSentFightsRefresh', value);
  },
  refresh_transport_count: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const { username } = authToken();
      client
        .requestAsync('get_transport_count', { username })
        .then(fights => {
          commit('saveTransportsCount', fights);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading transport count failed');
          return reject(err);
        });
    }),
  refresh_transports: ({ commit, dispatch }, limit) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      let start = 0;
      let end = 25;
      if (limit) {
        start = limit.start;
        end = limit.end;
      }
      client
        .requestAsync('get_transports', { token, start, end })
        .then(fights => {
          commit('saveTransports', fights);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading sent fights failed');
          return reject(err);
        });
    }),
  force_transports_refresh: ({ commit, dispatch }, value) => {
    commit('saveSentTransportsRefresh', value);
  },
  refresh_sent_gangfights: ({ commit, dispatch }, limit) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      const id = limit.id;
      let start = 0;
      let end = 25;
      if (limit) {
        start = limit.start;
        end = limit.end;
      }
      client
        .requestAsync('get_sent_gangfights', { token, id, start, end })
        .then(gangfights => {
          commit('saveSentGangFights', gangfights);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading sent gangfights failed');
          return reject(err);
        });
    }),
  force_sent_gangfights_refresh: ({ commit, dispatch }, value) => {
    commit('saveSentGangFights', value);
  },

  refresh_station_count: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const username = authToken();
      client
        .requestAsync('get_station_count', { username })
        .then(stations => {
          console.log(stations)
          commit('saveStationsCount', stations);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading inc stations count failed');
          return reject(err);
        });
    }),
  refresh_stations: ({ commit, dispatch }, limit) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      let start = 0;
      let end = 25;
      if (limit) {
        start = limit.start;
        end = limit.end;
      }
      client
        .requestAsync('get_stations', { token, start, end })
        .then(fights => {
          commit('saveStations', fights);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading sent fights failed');
          return reject(err);
        });
    }),
  signup: ({ rootState }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      console.log(username)
      const payload = {};
      payload.username = username.toString(); // eslint-disable-line no-param-reassign
      payload.referrer = localStorage.getItem('drugwars_referrer') || null; // eslint-disable-line no-param-reassign
      payload.type = 'dw-chars'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          Promise.delay(3000).then(() => {
            store.dispatch('init');
          });
          return resolve(result);
        }

        return reject();
      });
    }),

  upgradeBuilding: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-upgrades'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          console.log(result);
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  upgradeGangBuilding: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-gang-upgrades'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          console.log(result);
          store.dispatch('init');
          store.dispatch('refresh_gang_buildings');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  depositGangBuilding: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-gang-deposit'; // eslint-disable-line no-param-reassign
      payload.territory = state.mainbase.territory;
      payload.base = state.mainbase.base;
      return dwsocial(username, payload, result => {
        if (result) {
          console.log(result);
          store.dispatch('init');
          store.dispatch('refresh_gang_buildings');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }
        return reject();
      });
    }),
  upgradeTraining: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-trainings'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  recruitUnit: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-units'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  investHeist: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-heists'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  startFight: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          return resolve();
        }
        return reject();
      });
    }),
  transport: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'transport'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          console.log(result);
          store.dispatch('init');
          store.dispatch('refresh_sent_fights');
          store.dispatch('refresh_transport_count');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),

  send: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      // console.log(payload);
      return dwsocial(username, payload, result => {
        if (result) {
          if (result && result.type && result.type === 'error') {
            console.log('error');
          } else {
            store.dispatch('notify', {
              type: 'success',
              message: result,
            });
            Promise.delay(3000).then(() => {
              store.dispatch('init');
            });
          }
          return resolve(result);
        }
        return reject();
      });
    }),
  missions: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      return dwsocial(username, payload, result => {
        if (result) {
          if (result.type === 'error')
            store.dispatch('notify', {
              type: 'error',
              message: result.message,
              icon: 'stop',
            });

          return resolve(result);
        }
        return reject();
      });
    }),
  refresh_gang_buildings: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      client
        .requestAsync('get_gang_private', { token })
        .then(result => {
          commit('saveGangBuildings', result);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading gang buildings failed');
          return reject(err);
        });
    }),
  refresh_reward_history: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      client
        .requestAsync('get_user_reward_history', { token })
        .then(result => {
          commit('saveUserRewardHistory', result);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading user history failed');
          return reject(err);
        });
    }),
  requestPayment: ({ rootState, dispatch }, { memo, amount }) => {
    const url = `ton://transfer/UQDly7PmuRxpYft6dUKOc6Lpn5SbDKTknOsGb-vodwTcqwMF?amount=${amount}&text=${memo}`;
    const win = window.open(
      url.split('+').join('_'),
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=600',
    );
    win.focus();
    Promise.delay(15000).then(() => {
      dispatch('init');
    });

  },
  requestBuyBot: ({ rootState, dispatch }, { memo, amount }) => {
    const { username } = rootState.auth;
    if (window.steem_keychain && window.steem_keychain.current_id) {
      window.steem_keychain.requestTransfer(
        username,
        'drugwars',
        amount.split(' ')[0],
        JSON.stringify(memo),
        'STEEM',
        response => {
          if (response.success || response.error === 'user_cancel') {
            console.log('success');
            Promise.delay(1000).then(() => {
              dispatch('init');
            });
          } else {
            const url = `https://steemlogin.com/sign/transfer?from=${username}&to=drugwars&amount=${amount}&memo=${memo}`;
            const win = window.open(
              url.split('+').join('_'),
              '_blank',
              'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=600',
            );
            win.focus();
            Promise.delay(15000).then(() => {
              dispatch('init');
            });
          }
        },
      );
    } else {
      const url = `https://steemlogin.com/sign/transfer?from=${username}&to=drugwars&amount=${amount}&memo=${memo}`;
      const win = window.open(
        url.split('+').join('_'),
        '_blank',
        'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=600',
      );
      win.focus();
      Promise.delay(15000).then(() => {
        dispatch('init');
      });
    }
  },
  requestSellBot: ({ rootState, dispatch }, { memo, amount }) => {
    const { username } = rootState.auth;
    if (window.steem_keychain && window.steem_keychain.current_id) {
      window.steem_keychain.requestTransfer(
        username,
        'drugwars',
        amount.split(' ')[0],
        JSON.stringify(memo),
        'STEEM',
        response => {
          if (response.success || response.error === 'user_cancel') {
            console.log('success');
            Promise.delay(1000).then(() => {
              dispatch('init');
            });
          } else if (response.error) {
            const url = `https://steemlogin.com/sign/transfer?from=${username}&to=drugwars&amount=${amount}&memo=${memo}`;
            const win = window.open(
              url.split('+').join('_'),
              '_blank',
              'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=600',
            );
            win.focus();
            Promise.delay(15000).then(() => {
              dispatch('init');
            });
          }
        },
      );
    } else {
      const url = `https://steemlogin.com/sign/transfer?from=${username}&to=drugwars&amount=${amount}&memo=${memo}`;
      const win = window.open(
        url.split('+').join('_'),
        '_blank',
        'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=600',
      );
      win.focus();
      Promise.delay(15000).then(() => {
        dispatch('init');
      });
    }
  },

  setBase: ({ commit }, payload) => {
    // console.log(payload);
    commit('saveBase', payload);
  },
  setTutoDetail: ({ commit }, payload) => {
    // console.log(payload);
    commit('setTutoDetail', payload);
  },
  setMainBase: ({ commit }, payload) => {
    // console.log(payload);
    commit('saveMainBase', payload);
  },
  disconnect: ({ commit }) => {
    commit('saveConnected', false);
  },
  setServer: ({ commit }, payload) => {
    localStorage.setItem('server', JSON.stringify(payload))
    commit('saveServer', payload);
    client.reset
  },
};

export default {
  state,
  mutations,
  actions,
};
