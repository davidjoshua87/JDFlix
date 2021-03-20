<template>
  <div>
    <h2 class="title">
      <font-awesome-icon
        icon="film"
        size="1x" />&nbsp;
      Top 10 rated Movies
    </h2>
    <ItemList :results="movies" :type="type[0]" @item-clicked="viewDetailInfo" />

    <h2 class="title">
      <font-awesome-icon
        icon="tv"
        transform="shrink-3"
        size="1x" />&nbsp;
        Top 10 rated TV shows
      </h2>
    <ItemList :results="tvs" :type="type[1]" @item-clicked="viewDetailInfo" />
  </div>
</template>

<script>
import AppServices from '../services/appServices';
import ItemList from '../components/ItemList.vue';

export default {
  name: 'TopsView',
  components: {
    ItemList,
  },
  data() {
    return {
      numItems: 25,
      resultsMovie: [],
      titleMovies: [],
      movies: [],
      resultsTv: [],
      titleTvs: [],
      tvs: [],
      type: ['movie', 'tv'],
      loading: true,
    };
  },
  created() {
    this.fetchTops();
  },
  methods: {
    async fetchTops() {
      try {
        const [responseMovie, responseTv] = await Promise.all([
          AppServices.getTop('movie'),
          AppServices.getTop('tv'),
        ]);

        this.resultsMovie = responseMovie.data.results;
        this.resultsTv = responseTv.data.results;

        this.resultsMovie.map(movie => {
          this.titleMovies.push(movie.title);
          return this.titleMovies;
        });

        this.resultsTv.map(tv => {
          this.titleTvs.push(tv.name);
          return this.titleTvs;
        });

        this.getMovies(this.titleMovies);
        this.getTvs(this.titleTvs);
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async getMovies(data) {
      try {
        data.map(title => AppServices.getMovieCollection(title)
          .then(response => {
            if (response.data.Response === 'True') {
              this.movies.push(response.data.Search[0]);
            }
          }));
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async getTvs(data) {
      try {
        data.map(title => AppServices.getMovieCollection(title)
          .then(response => {
            if (response.data.Response === 'True') {
              this.tvs.push(response.data.Search[0]);
            }
          }));
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    viewDetailInfo(id, type) {
      try {
        this.$store.dispatch('getItem', { id, type });
        this.$emit('open-modal');
      } catch (e) {
        this.error = e;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
margin-top: 20px;
  display: block;
  height: 100%;
  text-align: center;
  color: $color-text-primary;
  text-decoration: none;

  &:hover {
    color: $color-primary;
  }
}
</style>
