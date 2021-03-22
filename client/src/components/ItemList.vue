<template>
  <div class="list-group-wrapper">
    <transition name="fade">
      <div class="loading" v-show="loading">
        <span class="fa fa-spinner fa-spin"></span> Loading
      </div>
    </transition>
    <ul class="list-group" id="infinite-list">
      <ItemCard v-for="(item, index) in results" :key="index" :items="item" :type="type"
      v-on='$listeners' />
    </ul>
  </div>
</template>

<script>
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
  mounted () {
    this.loadData();
    // this.loadData2();
    // this.loadData3();
  },
  methods: {
    loadData() {
      let listElm = '';
      listElm = document.querySelector('#infinite-list');
      listElm.addEventListener('scroll', () => {
        if (listElm.scrollTop + listElm.clientHeight > listElm.scrollHeight) {
          this.$emit('item-load', this.num += 1);
        }
      });
    },
    loadData2() {
      let listElm = '';
      listElm = document.querySelector('#infinite-list');
      listElm.addEventListener('scroll', () => {
        if (listElm.scrollTop + listElm.clientHeight > listElm.scrollHeight) {
          this.$emit('item-load2', this.num += 1);
        }
      });
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

  .list-group-item {
    margin-top: 1px;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 2px solid $background-border;
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }
</style>
