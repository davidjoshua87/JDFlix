<template>
  <div class="modal">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal_content">
      <div class="item_content clearfix">
        <template v-if="showItemInfo">
          <aside class="poster">
            <figure>
              <img :src="urlImg" />
            </figure>
            <p class="rating">Install Application</p>
          </aside>
          <section class="info">
            <div class="label">
              <h4>Add to Home Screen</h4>
            </div>
            <h1>JDsFlix</h1>
            <p class="web">
              <a href="https://jdsflix.web.app/">jdsflix.web.app</a>
            </p>
          </section>
        </template>
      </div>
      <button title="Close" class="close_modal" @click="closeModal">
        <font-awesome-icon icon="times" transform="shrink-6" size="1x" />
      </button>
      <button title="Install" class="install_app" @click="install">
        <font-awesome-icon icon="download" transform="shrink-7" size="2x" />
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import logo from '../assets/logo.png';

export default {
  name: 'InstallModal',
  props: ['event'],
  components: {},
  data() {
    return { installEvent: this.event };
  },
  computed: {
    ...mapState(['dataMovies']),
    showItemInfo() {
      return !!Object.keys(this.dataMovies).length;
    },
    urlImg() {
      return logo;
    },
  },
  mounted () {
  },
  methods: {
    closeModal() {
      this.$emit('close-modal2');
    },
    async install() {
      this.installEvent.prompt();
      await this.installEvent.userChoice.then(() => {
        this.$workbox.messageSW({ type: 'SKIP_WAITING' });
        this.installEvent = null;
      });
      this.$emit('close-modal2');
    },
  },
};
</script>
<style lang="scss" scoped>
figure {
  margin: 0 0 0.7em;
}
img {
  width: 75%;
  border-radius: 5px;
}
.rating {
  padding-bottom: 30px;
}
h1 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.7em;
  color: $color-primary;
}
h4 {
  text-align: center;
  background-color: $color-tags;
  color: $color-text-secondary;
  font-size: 0.9em;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
li {
  display: inline;
  padding: 4px;
  margin-right: 5px;

  background-color: $color-tags;
  color: $color-text-secondary;
  font-size: 0.9em;
}
p {
  text-align: center;
  margin: 0;
  line-height: 1.4;
}
button {
  color: $color-text-secondary;
}
a {
  display: inline-block;
  color: $color-text-secondary;
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px dotted $color-text-secondary;

  &:hover {
    color: $color-primary;
  }
}
.item_content {
  padding: 2em;
}
.poster{
  display: block;
  margin-bottom: 0.5em;
  text-align: center;
}
.info {
  display: block;
}
.label {
  margin: 0.5em 0 0.1em;
  font-family: $font-secondary, sans-serif;
  color: $color-secondary;
  font-size: 1em;
  text-transform: uppercase;
}
.web a {
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.7em;
  text-overflow: ellipsis;
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 990;

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 995;
    background: $modal-background-overlay;
  }

  .modal_content {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $modal-background;
    box-shadow: 0 1px 5px $modal-color-shadow;
    text-align: left;
    border-radius: 5px;
    width: 425px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;

    .buttons_wrapper {
      padding: 20px;
    }

    &::-webkit-scrollbar {
      border-radius: 10px;
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: $scrollbar-color-thumb;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: $scrollbar-color-track;
    }
  }

  .install_app {
    position: absolute;
    right: 5px;
    bottom: 30px;
    cursor: pointer;
    font-size: 18px;
    background: none;
    border: none;
    transition: opacity 0.2s ease;

    &:hover {
      color: $color-primary;
    }
  }

  .close_modal {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    font-size: 18px;
    background: none;
    border: none;
    transition: opacity 0.2s ease;

    &:hover {
      color: $color-primary;
    }
  }
}

@include sm {
  .poster {
    float: left;
    margin: 0;
    width: 33%;
    text-align: center
  }
  .info{
    display: block;
    padding-left: 2em;
    margin-left: 33%;
  }
}
</style>
