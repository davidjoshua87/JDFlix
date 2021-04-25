<template>
  <div>
    <div class="search-container">
      <button>
        <font-awesome-icon icon="search" transform="shrink-6" size="2x" class="icon-search" />
      </button>
      <input type="text" maxlength="20" v-model="search"
        @keypress.enter="getSearch"
        @input="validInput"
        placeholder="Search movie or TV show..."/>
      <span class="message" v-show="showResults">
        Results search keyword
        <span class="query">{{ query }}</span>
        : <span class="length">{{ dataSearch.length }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Swal from 'sweetalert2';

export default {
  name: 'SearchBar',
  data() {
    return {
      query: '',
      search: '',
      lastQuery: null,
      totalResults: null,
      valid: false,
      showResults: false,
    };
  },
  computed: {
    ...mapState(['dataSearch']),
  },
  methods: {
    getSearch(val) {
      if (val === true) {
        let path = '';
        path = this.$route.path;
        this.query = this.lastQuery;
        this.showResults = true;
        if (path !== `/search?q=${this.query}`) {
          this.$emit('show-loading');
          this.$router.push(`/search?q=${this.query}`);
        }
      } else {
        let path = '';
        path = this.$route.path;
        this.showResults = false;
        if (path !== '/data-not-found') {
          this.$emit('show-loading');
          this.$router.push('/data-not-found');
        }
      }
    },
    validInput() {
      setTimeout(() => {
        const Toast = Swal.mixin({
          toast: true,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        if (this.search.length >= 3) {
          if (this.search !== this.lastQuery || this.search === this.query) {
            this.lastQuery = this.search;
            this.$nextTick(() => {
              this.valid = true;
              this.getSearch(this.valid);
            });
            setTimeout(() => {
              Toast.fire({
                icon: 'success',
                title: 'Searched in Successfully',
              });
            }, 2000);
          }
        } else {
          this.$nextTick(() => {
            this.valid = false;
            this.getSearch(this.valid);
          });
          setTimeout(() => {
            Toast.fire({
              icon: 'error',
              title: 'Enter Keywords More Than 3 Characters!',
            });
          }, 2000);
        }
      }, 2000);
    },
    resetSearch() {
      this.query = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
}
.message {
  position: absolute;
  right: 25px;
  font-size: 0.8em;
  text-transform: capitalize;
}
.query {
  color: $color-text-primary;
  font-weight: bold;
  font-style: italic;
  text-transform: lowercase;
}
.length {
  color: $color-primary;
  font-weight: bold;
  text-transform: uppercase;
}
input {
  border: 0;
  padding: 2px 10px;
  width: calc(100% - 95px);
  font-size: 1.1em;
  outline: 0;
  color: $color-primary;
  background-color: $background-input;
  border-radius: 3px;
}
button {
  padding: 0 10px 0 20px;
  border: 0;
  outline: 0;
  background-color: transparent;

  .icon-search {
    color: $color-primary;
  }
}
@media (max-width: 576px) {
  .message {
    font-size: 0.6em;
  }
}
@include sm {
  input {
    padding: 5px 10px;
    font-size: 1.3em;
  }
}
</style>
