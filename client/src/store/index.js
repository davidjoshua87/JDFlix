import Vue from 'vue';
import Vuex from 'vuex';
import AppServices from '../services/appServices';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: '',
    dataMovies: [],
    dataTvs: [],
    dataSearch: [],
    itemInfo: {},
  },
  getters: {
  },

  mutations: {
    LOAD_CONF: (state, baseUrl) => {
      Vue.set(state, 'baseUrl', baseUrl);
    },
    RESET_ITEM: (state) => {
      Vue.set(state, 'itemInfo', {});
    },
    GET_ITEM: (state, { type, info, rating }) => {
      const itemInfo = {
        type,
        poster: info.Poster,
        title: info.Title,
        homepage: info.Website,
        genre: [info.Genre],
        year: info.Year,
        runtime: info.Runtime,
        overview: info.Plot,
        cast: info.Actors,
        director: info.Director,
        production: info.Production,
        imdbID: info.imdbID,
        imdbRating: rating,
        totalVote: info.imdbVotes,
      };
      Vue.set(state, 'itemInfo', itemInfo);
    },
    GET_MOVIES: (state, data) => {
      Vue.set(state, 'dataMovies', data);
    },
    GET_TVS: (state, data) => {
      Vue.set(state, 'dataTvs', data);
    },
    GET_SEARCH: (state, data) => {
      Vue.set(state, 'dataSearch', data);
    },
  },

  actions: {
    getInitialData: async ({ commit }) => {
      const response = await AppServices.getConfiguration();
      commit('LOAD_CONF', response.data.images.secure_base_url);
    },
    getItem: async ({ commit }, { id, type, rating }) => {
      commit('RESET_ITEM');
      const [responseData] = await Promise.all([
        AppServices.getSingleMovie(id),
      ]);
      commit('GET_ITEM', {
        type,
        info: responseData.data,
        rating,
      });
    },
    getMovies: async ({ commit }, data) => {
      commit('GET_MOVIES', data);
    },
    getTvs: async ({ commit }, data) => {
      commit('GET_TVS', data);
    },
    getSearch: async ({ commit }, data) => {
      commit('GET_SEARCH', data);
    },
  },
});
