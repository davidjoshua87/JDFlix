import Vue from 'vue';
import Router from 'vue-router';
import SearchView from '../views/SearchView.vue';
import DataNotFoundView from '../views/DataNotFoundView.vue';
import TopsView from '../views/TopsView.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'tops' },
    },
    {
      path: '/tops',
      name: 'tops',
      component: TopsView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/data-not-found',
      name: 'data-not-found',
      component: DataNotFoundView,
    },
  ],
});
