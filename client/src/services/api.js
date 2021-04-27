import axios from 'axios';

const key = process.env.VUE_APP_KEY_MOVIE_DB_2;
const API_1 = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});
const API_2 = axios.create({
  baseURL: `https://www.omdbapi.com/?apikey=${key}&page=1&type=movie&Content-Type=application/json`,
});

export default { API_1, API_2 };
