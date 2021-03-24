import BASE from './api';

const key = process.env.VUE_APP_KEY_MOVIE_DB_1;
const language = 'en-US';
const includeAdult = 'false';

export default {
  getMovieCollection (name) {
    return BASE.API_2.get(`&s=${name}`);
  },
  getSingleMovie (id) {
    return BASE.API_2.get(`&i=${id}`);
  },
  getConfiguration() {
    return BASE.API_1.get(`configuration?api_key=${key}`);
  },
  getsearch(query) {
    const url = `search/multi?api_key=${key}&language=${language}&query=${query}&page=1&include_adult=${includeAdult}`;
    return BASE.API_1.get(url);
  },
  getTop(type) {
    const url = `${type}/top_rated?api_key=${key}&language=${language}&page=1`;
    return BASE.API_1.get(url);
  },
};
