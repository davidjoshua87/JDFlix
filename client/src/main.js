import Vue from 'vue';
import App from './App.vue';
import wb from './registerServiceWorker';
import router from './router';
import store from './store';

import { library } from '../node_modules/@fortawesome/fontawesome-svg-core';
import {
  faFilm,
  faTv,
  faSearch,
  faTimes,
  faStar,
  faDownload,
} from '../node_modules/@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/vue-fontawesome';

library.add(faFilm, faTv, faSearch, faTimes, faStar, faDownload);
Vue.prototype.$workbox = wb;
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
