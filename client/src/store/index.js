import Vue from 'vue';
import Vuex from 'vuex';
import AppServices from '../services/appServices';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: '',
    itemInfo: {},
  },
  getters: {
    // imgPath: (state) => `${state.baseUrl}w370_and_h556_bestv2`,
    // backgroundPath: state => `${state.baseUrl}w1400_and_h450_face`
  },

  mutations: {
    LOAD_CONF: (state, baseUrl) => {
      Vue.set(state, 'baseUrl', baseUrl);
    },
    RESET_ITEM: (state) => {
      Vue.set(state, 'itemInfo', {});
    },
    GET_ITEM: (state, { type, info }) => {
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
        imdbRating: info.imdbRating,
        totalVote: info.imdbVotes,
      };
      Vue.set(state, 'itemInfo', itemInfo);
    },
  },

  actions: {
    getInitialData: async ({ commit }) => {
      const response = await AppServices.getConfiguration();
      commit('LOAD_CONF', response.data.images.secure_base_url);
    },
    getItem: async ({ commit }, { id, type }) => {
      commit('RESET_ITEM');
      const [responseData] = await Promise.all([
        AppServices.getSingleMovie(id),
      ]);
      commit('GET_ITEM', {
        type,
        info: responseData.data,
      });
    },
  },
});
