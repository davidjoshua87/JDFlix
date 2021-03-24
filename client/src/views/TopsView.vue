<template>
  <div>
    <loading
        :show="show"
        :label="label">
    </loading>
    <h2 class="title">
      <font-awesome-icon
        icon="film"
        size="1x" />&nbsp;
      Top Rated Movies
    </h2>
    <ItemList :results="movies" :type="type[0]"
    @item-load="loadData"
    @item-clicked="viewDetailInfo" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import loading from 'vue-full-loading';
import AppServices from '../services/appServices';
import ItemList from '../components/ItemList.vue';

export default {
  name: 'TopsView',
  components: {
    ItemList,
    loading,

  },
  data() {
    return {
      numItems: 5,
      resultsMovie: [],
      titleMovies: [],
      movies: [],
      resultsTv: [],
      titleTvs: [],
      tvs: [],
      type: ['movie', 'tv'],
      show: false,
      label: 'Loading...',
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
        data.map(d => AppServices.getMovieCollection(d.title)
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
                  this.movies = dataMovies;
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
$purple: #5c4084;

body {
  background-color: $purple;
  padding: 50px;
}
.container {
  padding: 40px 80px 15px 80px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 800px;
}
.heading {
  text-align: center;
  h1 {
    background: -webkit-linear-gradient(#fff, #999);
    -webkit-text-fill-color: transparent;
    // -webkit-background-clip: text;
    text-align: center;
    margin: 0 0 5px 0;
    font-weight: 900;
    font-size: 4rem;
    color: #fff;
  }
  h4 {
    color: lighten(#5c3d86,30%);
    text-align: center;
    margin: 0 0 35px 0;
    font-weight: 400;
    font-size: 24px;
  }
}

.list-group-wrapper {
  position: relative;
}
.list-group {
  overflow: auto;
  height: 50vh;
  border: 2px solid #dce4ec;
  border-radius: 5px;
}
.list-group-item {
  margin-top: 1px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid #dce4ec;
}
.loading {
  text-align: center;
  position: absolute;
  color: #fff;
  z-index: 9;
  background: $purple;
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
