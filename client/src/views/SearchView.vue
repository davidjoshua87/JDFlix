<template>
  <div>
    <div class="message">
      <div v-show="showResults">
        Results found for
        <span class="query">{{ query }}</span>
        : {{ totalResults }}
      </div>
    </div>
    <div v-show="showMessage">
        <h2 class="title">
          <font-awesome-icon icon="film" size="1x" />&nbsp;
          Result Search
        </h2>
      </div>

    <ItemList :results="results" :type="type[0]"
    @item-load="loadData"
    @item-clicked="viewDetailInfo" />
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
      numItems: 5,
      searching: false,
      loading: false,
      showResults: false,
      error: '',
      results: [],
      type: ['movie', 'tv'],
      totalResults: null,
      totalPages: null,
    };
  },
  computed: {
    ...mapState(['dataSearch']),
    loadMore() {
      return this.totalPages > this.page;
    },
    showMessage() {
      return !!(this.searching || this.error !== '');
    },
  },
  created() {
    this.fetchData('INIT');
  },
  methods: {
    loadData(num) {
      this.results = this.results.concat([this.dataSearch[num - 1]]);
      return this.results;
    },
    async fetchData(action) {
      if (action === 'INIT') {
        this.searching = true;
        this.results = [];
      } else {
        this.loading = true;
      }

      try {
        let dataMovies = [];
        AppServices.getMovieCollection(this.query)
          .then(response => {
            if (response.data.Response === 'True') {
              this.searching = true;
              this.showResults = true;
              dataMovies = response.data.Search;
              this.totalResults = dataMovies.length;
              dataMovies = this.sortData(dataMovies);
              this.$store.dispatch('getSearch', dataMovies);
              this.results = dataMovies.slice(0, (this.numItems));
            } else {
              this.error = response.data.Error;
              this.searching = false;
              this.showResults = false;
              this.totalResults = null;
              setTimeout(() => {
                delete this.query.param;
                this.$router.push('/');
              }, 3000);
            }
          });
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
    sortData(value) {
      const data = value.sort((a, b) => (b.vote_average > a.vote_average ? 1 : -1));
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.query {
  color: $color-primary;
  font-weight: bold;
  font-style: italic;
  text-transform: lowercase;
}
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
