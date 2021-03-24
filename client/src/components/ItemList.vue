<template>
  <div class="list-group-wrapper">
    <transition name="fade">
      <div>
        <ul>
          <ItemCard v-for="(item, index) in results" :key="index"
          :items="item"
          :type="type"
          v-on='$listeners' />
        </ul>
        <p v-show="loading" class="loading-text">Loading...</p>
        <ring-loader
        class="loading"
        :loading="loading"
        :color="color"
        :size="size">
        </ring-loader>
        <p v-show="dataEnd" class="loading">End List Movie</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RingLoader from 'vue-spinner/src/PulseLoader.vue';
import ItemCard from './ItemCard';

export default {
  name: 'ItemList',
  props: ['results', 'type', 'source'],
  components: {
    ItemCard,
    RingLoader,

  },
  data() {
    return {
      num: 5,
      loading: false,
      dataEnd: false,
      color: 'white',
      size: '10px',
    };
  },
  created() {
  },
  computed: { ...mapState(['dataMovies', 'dataSearch']) },
  mounted () {
    this.scroll();
  },
  methods: {
    scroll () {
      window.onscroll = () => {
        let bottomOfWindow = null;
        bottomOfWindow = Math.ceil(document.documentElement.scrollTop + window.innerHeight)
        === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.dataEnd = false;
          if (this.dataEnd === false) {
            this.loading = true;
            let numberAdd = 0;
            let length = 0;
            if (this.source === 'top') {
              length = this.dataMovies.length;
              numberAdd = length % 5;
            } else {
              length = this.dataSearch.length;
              numberAdd = length % 5;
            }

            if (length - this.num === numberAdd) {
              setTimeout(() => {
                this.$emit('item-load', this.num + numberAdd);
                this.loading = false;
                if (length % 5 !== 0) {
                  this.dataEnd = true;
                }
              }, 1000);
            } else {
              setTimeout(() => {
                this.$emit('item-load', this.num += 5);
                this.loading = false;
              }, 1000);
            }
          } else {
            this.loading = false;
          }
        }

        if (document.documentElement.scrollTop === 0) {
          this.num = 5;
          this.$emit('item-load', this.num);
          this.loading = false;
          this.dataEnd = false;
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: auto;
    padding: 0;
  }

  .list-group-wrapper {
    position: relative;
  }

  .list-group {
    overflow: auto;
    height: 50vh;
    border: 2px solid $background-border;
    border-radius: 5px;
  }

  .loading {
    text-align: center;
    position: absolute;
    color: $color-text-primary;
    z-index: 9;
    background: $color-primary;
    padding: 5px;
    border-radius: 5px;
    left: calc(50% - 45px);
    // top: calc(50% - 18px);
  }
  .loading-text {
    text-align: center;
    color: $color-text-primary;
    font-family: $font-primary;
    left: calc(50% - 45px);
    // top: calc(50% - 18px);
  }
</style>
