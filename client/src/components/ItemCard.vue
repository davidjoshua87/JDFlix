<template>
  <li class="card">
    <div>
      <a href="#" @click.prevent="viewDetail">
        <figure>
          <img :src="urlImg" />
        </figure>
        <span class="icon-container">
          <font-awesome-icon
            :icon="icon"
            size="1x"
            class="icon" />
        </span>
        <span class="card-title">{{ title }}</span>
      </a>
    </div>
  </li>
</template>

<script>
import noImage from '../assets/poster-not-available.png';

export default {
  name: 'ItemCard',
  props: ['items', 'type'],
  computed: {
    urlImg() {
      return this.items.Poster !== 'N/A'
        ? `${this.items.Poster}`
        : `${noImage}`;
    },
    mediaType() {
      return this.type === 'movie' ? this.items.Type : this.type;
    },
    title() {
      return this.items.Title;
    },
    icon() {
      return this.mediaType === 'movie' ? 'film' : 'tv';
    },
  },
  mounted() {
  },
  methods: {
    viewDetail() {
      this.$emit('item-clicked', this.items.imdbID, this.mediaType, this.items.Rating);
    },
  },
};
</script>

<style lang="scss" scoped>
figure {
  margin: 0 0 10px;
  padding: 0;
}
img {
  width: 100%;
  max-height: 100%;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px $poster-shadow;
  box-sizing: border-box;
}
span {
  padding: 2px;
  color: $color-text-primary;
  font-size: .9em;

  &.icon-container{
    float:left;
    margin-right: 5px;
    padding-bottom:5px;
  }
}
i{
  display: inline-block;
  padding-top: 4px;
}
a {
  color: #333;
  text-decoration: none;
  &:hover {
    img {
      box-shadow: 0px 1px 5px 0px $poster-shadow-active;
    }
    span.card-title {
      color: $color-text-secondary;
      background-color: $color-primary;
    }
  }
}
.card {
  list-style: none;
  margin-bottom: 10px;
  padding: 0;
  width: 100%;

  div {
    padding: 20px 20px;
  }
}

.icon{
  display: inline;
  color: #fff;
}
@include sm {
  .card {
    width: 33%;
  }
}
@include md {
  .card {
    width: 25%;
  }
}
@include lg {
  .card {
    width: 20%;
  }
}
</style>
