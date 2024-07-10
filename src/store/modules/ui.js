import Vue from 'vue';

const state = {
  sidebarVisible: false,
  modalAccountVisible:true,
  showLoading: false,
  showTutorial: false,
  timestamp: new Date().getTime(),
  notifications: [],
};

const mutations = {
  toggleSidebarVisibility(_state) {
    Vue.set(_state, 'sidebarVisible', !_state.sidebarVisible);
  },
  toggleModalAccount(_state) {
    Vue.set(_state, 'modalAccountVisible', !_state.modalAccountVisible);
  },
  showLoading(_state) {
    Vue.set(_state, 'showLoading', true);
  },
  hideLoading(_state) {
    Vue.set(_state, 'showLoading', false);
  },
  showTutorial(_state) {
    Vue.set(_state, 'showTutorial', true);
  },
  hideTutorial(_state) {
    Vue.set(_state, 'showTutorial', false);
  },
  updateTimestamp(_state) {
    Vue.set(_state, 'timestamp', new Date().getTime());
  },
  notify(_state, payload) {
    const timestamp = parseInt(new Date().getTime() / 1000);
    _state.notifications.push({ ...payload, timestamp });
  },
};

const actions = {
  toggleSidebarVisibility({ commit }) {
    commit('toggleSidebarVisibility');
  },
  toggleModalAccount({ commit }) {
    commit('toggleModalAccount');
  },
  showLoading({ commit }) {
    commit('showLoading');
  },
  hideLoading({ commit }) {
    commit('hideLoading');
  },
  showTutorial({ commit }) {
    commit('showTutorial');
  },
  hideTutorial({ commit }) {
    commit('hideTutorial');
  },
  updateTimestamp({ commit }) {
    commit('updateTimestamp');
  },
  notify({ commit }, payload) {
    commit('notify', payload);
  },
};

export default {
  state,
  mutations,
  actions,
};
