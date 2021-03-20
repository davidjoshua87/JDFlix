<template>
  <ul>
    <ItemCard
      v-for="(item, index) in results"
      :key="index"
      :items="item"
      :type="type"
      v-on='$listeners'/>
  </ul>
</template>

<script>
import ItemCard from './ItemCard';

export default {
  name: 'ItemList',
  props: ['results', 'type'],
  components: {
    ItemCard,
  },

};
</script>

<style scoped>
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
