<template>
  <div class="container">
    <div class="title" v-show="showMessage">
      <h2>
        <font-awesome-icon icon="film" size="1x" />&nbsp;
        Data Not Found
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataNotFoundView',
  components: {
  },
  data() {
    return {
      searching: false,
      showResults: false,
    };
  },
  computed: {
    showMessage() {
      return true;
    },
  },
  created() {
  },
  methods: {
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
