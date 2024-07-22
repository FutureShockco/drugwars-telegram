import Vue from 'vue';

const state = {
  sidebarVisible: false,
  modalAccountVisible: false,
  modalVideoVisible: false,
  modalPaymentVisible: false,
  currentVideo: null,
  showLoading: true,
  loadingPercentage: 0,
  showTutorial: false,
  timestamp: new Date().getTime(),
  notifications: [],
  currentPayment: null
};

const mutations = {
  toggleSidebarVisibility(_state) {
    Vue.set(_state, 'sidebarVisible', !_state.sidebarVisible);
  },
  toggleModalAccount(_state) {
    Vue.set(_state, 'modalAccountVisible', !_state.modalAccountVisible);
  },
  toggleModalVideo(_state) {
    Vue.set(_state, 'modalVideoVisible', !_state.modalVideoVisible);
  },
  toggleModalPayment(_state) {
    Vue.set(_state, 'modalPaymentVisible', !_state.modalPaymentVisible);
  },
  closeModalVideo(_state) {
    Vue.set(_state, 'modalVideoVisible', false);
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
  setLoadingPercentage(_state, payload) {
    Vue.set(_state, 'loadingPercentage', payload);
  },
  setCurrentPayment(_state, payload) {
    Vue.set(_state, 'currentPayment', payload);
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
  toggleModalVideo({ commit }) {
    commit('toggleModalVideo');
  },
  toggleModalPayment({ commit }) {
    commit('toggleModalPayment');
  },
  closeModalVideo({ commit }) {
    commit('closeModalVideo');
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
  setLoadingPercentage({ commit }, payload) {
    commit('setLoadingPercentage', payload);
  },
  setCurrentPayment({ commit }, payload) {
    commit('setCurrentPayment', payload);
  },
};

export default {
  state,
  mutations,
  actions,
};
