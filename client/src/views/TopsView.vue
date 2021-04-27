<template>
  <div class="container">
    <div class="title">
      <h2>
        <font-awesome-icon
          icon="film"
          size="1x" />&nbsp;
        Top Rated Movies
      </h2>
    </div>
    <ItemList :results="movies" :type="type[0]" source="top"
    @item-load="loadData"
    @item-clicked="viewDetailInfo" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppServices from '../services/appServices';
import ItemList from '../components/ItemList.vue';

export default {
  name: 'TopsView',
  components: {
    ItemList,
  },
  data() {
    return {
      numItems: 10,
      resultsMovie: [],
      titleMovies: [],
      movies: [],
      resultsTv: [],
      titleTvs: [],
      tvs: [],
      type: ['movie'],
      show: false,
    };
  },
  created() {
    this.fetchTops();
  },
  computed: { ...mapState(['dataMovies']) },
  methods: {
    loadData(num) {
      if (this.dataMovies.length >= num) {
        this.movies = this.dataMovies.slice(0, num);
      }
      return this.movies;
    },
    async fetchTops() {
      try {
        const [responseMovie, responseTv] = await Promise.all([
          AppServices.getTop('movie'),
          AppServices.getTop('tv'),
        ]);

        this.resultsMovie = responseMovie.data.results;
        this.resultsTv = responseTv.data.results;

        this.resultsMovie = this.sortData(this.resultsMovie);
        this.resultsTv = this.sortData(this.resultsTv);

        this.resultsTv.map(tv => {
          tv.title = tv.name;
          return tv;
        });

        this.resultsMovie = this.resultsMovie.concat(this.resultsTv);

        this.resultsMovie.map(movie => {
          this.titleMovies.push({ title: movie.title, rating: movie.vote_average });
          return this.titleMovies;
        });

        this.getMovies(this.titleMovies);
      } catch (e) {
        this.error = e;
      } finally {
        this.show = true;
      }
    },
    async getMovies(data) {
      try {
        let datas = [];
        let movies = [];
        let dataMovies = [];
        await data.map(d => AppServices.getMovieCollection(d.title)
          .then(response => {
            if (response.data.Response === 'True') {
              datas = response.data.Search;
              movies = movies.concat(datas);
              movies.map(movie => {
                if (d.title.toLowerCase() === movie.Title.toLowerCase()) {
                  movie.Rating = d.rating;
                  dataMovies.push(movie);
                }

                dataMovies = this.sortDataRating(dataMovies);
                this.$store.dispatch('getMovies', dataMovies);
                setTimeout(() => {
                  this.movies = dataMovies.slice(0, (this.numItems));
                  this.show = false;
                }, 3000);
                return this.movies;
              });
            }
          }));
      } catch (e) {
        this.error = e;
      } finally {
        this.show = true;
      }
    },
    viewDetailInfo(id, type, rating) {
      try {
        this.$store.dispatch('getItem', { id, type, rating });
        this.$emit('open-modal');
      } catch (e) {
        this.error = e;
      }
    },
    sortData(value) {
      const data = value.sort((a, b) => (b.vote_average > a.vote_average ? 1 : -1));
      return data;
    },
    sortDataRating(value) {
      const data = value.sort((a, b) => (b.Rating > a.Rating ? 1 : -1));
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.title h2 {
  display: block;
  text-align: center;
  color: $color-text-primary;
  margin-top: 30px;

  &:hover {
    color: $color-primary;
  }
}
</style>
