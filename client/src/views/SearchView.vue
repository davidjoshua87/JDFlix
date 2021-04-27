<template>
  <div class="container">
    <div class="title" v-show="showMessage">
      <h2>
        <font-awesome-icon icon="film" size="1x" />&nbsp;
        Result Search
      </h2>
    </div>
    <ItemList :results="results" :type="type[0]" source="search"
    @item-load="loadData"
    @item-clicked="viewDetailInfo"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ItemList from '../components/ItemList';
import AppServices from '../services/appServices';

export default {
  name: 'SearchView',
  components: {
    ItemList,
  },
  data() {
    return {
      query: this.$route.query.q,
      numItems: 10,
      searching: false,
      loading: false,
      showResults: false,
      error: '',
      results: [],
      resultsMovie: [],
      titleMovies: [],
      type: ['movie'],
      totalResults: null,
      totalPages: null,
      show: false,
      label: 'Loading...',
    };
  },
  computed: {
    ...mapState(['dataSearch']),
    showMessage() {
      return !!(this.searching || this.error !== '');
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    loadData(num) {
      if (this.dataSearch.length >= num) {
        this.results = this.dataSearch.slice(0, num);
      }
      return this.results;
    },
    async fetchData() {
      try {
        const [responseMovie] = await Promise.all([
          AppServices.getsearch(this.query),
        ]);

        this.resultsMovie = responseMovie.data.results;

        this.resultsMovie = this.sortData(this.resultsMovie);

        this.resultsMovie.map(movie => {
          if (movie.media_type === 'tv') {
            movie.title = movie.name;
          }
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
        let movies = [];
        let dataMovies = [];
        await data.map(d => AppServices.getMovieCollection(d.title)
          .then(response => {
            if (response.data.Response === 'True') {
              this.searching = true;
              this.showResults = true;
              movies = response.data.Search;
              movies.map(movie => {
                if (d.title !== undefined && movie.Title !== undefined) {
                  if (d.title.toLowerCase() === movie.Title.toLowerCase()) {
                    movie.Rating = d.rating;
                    dataMovies.push(movie);
                  }
                  dataMovies = this.sortDataRating(dataMovies);
                  this.totalResults = dataMovies.length;
                  this.$store.dispatch('getSearch', dataMovies);
                  setTimeout(() => {
                    this.results = dataMovies.slice(0, (this.numItems));
                    this.show = false;
                  }, 3000);
                }
                return this.results;
              });
            } else {
              this.error = response.data.Error;
              this.searching = false;
              this.showResults = false;
              this.show = false;
              this.totalResults = null;
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
