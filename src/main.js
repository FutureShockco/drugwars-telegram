import '@/styles.less';
import '@/less/form.less';
import '@/css/bootstrap.css';
import '@/css/style.css';
import '@/css/highlights/yellow.css';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueUi from '@vue/ui';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import prettyMs from 'pretty-ms';
import moment from 'moment';
import numeral from 'numeral';
import client from '@/helpers/client';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import messages from '@/translation.json';
import numberFormats from '@/number.json';


if (window.Telegram && window.Telegram.WebApp)
  Vue.prototype.TWA = window.Telegram.WebApp
if (process.env.VUE_APP_DEV && process.env.VUE_APP_DATA) {
  Vue.prototype.TWA = { ready: true, initData: process.env.VUE_APP_DATA }
  function ready() { return true };
  Vue.prototype.TWA.ready = ready;
}

const requireComponent = require.context('./components', true, /[\w-]+\.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));
  Vue.component(componentName, componentConfig.default || componentConfig);
});

setInterval(() => client.request('heartbeat', null), 10 * 1000);

Vue.filter('date', value => moment(value, 'YYYY-MM-DD').format('MMM D, YYYY'));
Vue.filter('ms', value => prettyMs(parseInt(value / 1000) * 1000));
Vue.filter('amount', value => numeral(value).format('0.[00]a'));
Vue.filter('tonamount', value => numeral(value).format('0.[0000]a'));
Vue.filter('round', value => numeral(value).format('0a'));
Vue.filter('million', value => numeral(value).format('0,0.0000'));
Vue.filter('decimal', value => numeral(value).format('0.[00000]'));

Vue.filter('dateparse', value =>
  moment(new Date(value * 1000), 'YYYY-MM-DD').format('MMMM Do YYYY, h:mm:ss a'),
);
Vue.filter('fromnow', value => moment(new Date(value * 1000), 'YYYY-MM-DD ').fromNow());

Vue.filter('end', value => {
  const now = moment();
  const future = moment(value);
  const duration = moment.duration(future.diff(now));
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  let a = 'End in '
  if (hours > 0)
    a += `${hours}h `
  if (minutes > 0)
    a += `${minutes}m `
  return a += `${seconds}s`;

})



Vue.directive('lowercase', {
  update: el => {
    el.value = el.value.toLowerCase(); // eslint-disable-line no-param-reassign
  },
});

Vue.directive('uppercase', {
  update: el => {
    el.value = el.value.toUpperCase(); // eslint-disable-line no-param-reassign
  },
});

Vue.use(VueUi);
Vue.use(VueI18n);

store.dispatch('loadSettings');

const language =
  (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const languageWithoutRegionCode = 'en';

// if (messages[language.toLowerCase().split(/[_-]+/)[0]])
//   languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const i18n = new VueI18n({
  locale: languageWithoutRegionCode,
  messages,
  numberFormats,
});

Vue.filter(
  'translate',
  value =>
    i18n.messages[i18n.locale][value.split('.')[0]] &&
      i18n.messages[i18n.locale][value.split('.')[0]][value.split('.')[1]]
      ? i18n.messages[i18n.locale][value.split('.')[0]][value.split('.')[1]]
      : i18n.messages.en[value.split('.')[0]][value.split('.')[1]],
);

Vue.config.productionTip = false;


new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
