<template>
  <div class="list-group-wrapper">
    <transition name="fade">
      <div class="loading" v-show="loading">
        <span class="fa fa-spinner fa-spin"></span> Loading
      </div>
    </transition>
    <ul>
      <ItemCard
      v-for="(item, index) in results" :key="index" :items="item" :type="type"
      v-on='$listeners' />
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ItemCard from './ItemCard';

export default {
  name: 'ItemList',
  props: ['results', 'type'],
  components: {
    ItemCard,
  },
  data() {
    return { num: 5, loading: false };
  },
  created() {
  },
  computed: { ...mapState(['dataMovies']) },
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
          let numberAdd = 0;
          numberAdd = this.dataMovies.length % 5;
          if (this.dataMovies.length - this.num === numberAdd) {
            this.$emit('item-load', this.num + numberAdd);
          } else {
            this.$emit('item-load', this.num += 5);
          }
        }

        if (document.documentElement.scrollTop === 0) {
          this.num = 5;
          this.$emit('item-load', this.num);
        }
      };
    },
    loadData3() {
      let listElm = '';
      listElm = document.querySelector('#infinite-list');
      listElm.addEventListener('scroll', () => {
        if (listElm.scrollTop + listElm.clientHeight > listElm.scrollHeight) {
          this.$emit('item-load3', this.num += 1);
        }
      });
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
    color: #fff;
    z-index: 9;
    background: purple;
    padding: 8px 18px;
    border-radius: 5px;
    left: calc(50% - 45px);
    top: calc(50% - 18px);
  }
</style>
