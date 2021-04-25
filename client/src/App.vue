<template>
  <div id="app">
    <header>
      <NavBar @show-loading="showLoading"/>
    </header>
    {{ }}
    <body>
      <div v-show="showing === true" class="loading-overlay">
        <ring-loader
          class="loading"
          :loading="showing"
          :color="color"
          :size="size">
        </ring-loader>
      </div>
      <section>
        <keep-alive>
          <router-view :key="$route.fullPath"
          @open-modal="toggleModal" />
        </keep-alive>
        <ItemModal v-if="showModal" @close-modal="toggleModal"></ItemModal>
        <InstallModal v-if="prompt" :event="installEvent"
        @close-modal2="toggleModal2"></InstallModal>
        <div class="update-dialog" v-if="dialog_update">
          <div class="overlay">
            <div class="modal_content">
              <div class="title">
                A new version is found. Update to load it?
              </div>
              <div class="update-dialog__actions">
                <button class="update-dialog__button update-dialog__button--confirm"
                @click="update">
                  Update
                </button>
                <button class="update-dialog__button update-dialog__button--cancel"
                @click="dialog_update = false">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import RingLoader from 'vue-spinner/src/PulseLoader.vue';
import ItemModal from './components/ItemModal.vue';
import InstallModal from './components/InstallModal.vue';
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'app',
  components: {
    NavBar,
    Footer,
    ItemModal,
    InstallModal,
    RingLoader,
  },
  data() {
    return {
      showModal: false,
      prompt: false,
      dialog_update: false,
      showing: false,
      installEvent: null,
      color: 'white',
      size: '10px',
    };
  },
  created() {
    if (this.$workbox) {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.installEvent = e;
      });
      this.$workbox.addEventListener('waiting', () => {
        this.dialog_update = true;
      });
    }
    this.loadInitialData();
  },
  computed: {
  },
  mounted() {
    this.showing = true;
  },
  methods: {
    async update() {
      this.dialog_update = false;
      await this.$workbox.messageSW({ type: 'SKIP_WAITING' });
    },
    loadInitialData() {
      try {
        setTimeout(() => {
          this.$store.dispatch('getInitialData');
          this.showing = false;
          this.prompt = true;
        }, 2000);
      } catch (e) {
        this.error = 'Error: configuration not loaded';
      }
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleModal2() {
      this.prompt = !this.prompt;
    },
    showLoading() {
      this.showing = !this.showing;
      if (this.showing === true) {
        setTimeout(() => {
          this.showing = false;
        }, 2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Ubuntu+Mono|Titillium+Web:200&display=swap);

body {
  margin: 0;
  padding: 0;
  background-color: $background-primary;
  font-size: 100%;
}
#app {
  background-color: $background-secondary;
  font-family: $font-primary, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-text-primary;
  padding: 0;
  font-size: 1em;
}
header{
  border-bottom: 1px solid $background-border;
  background-color: $background-secondary;
}
.loading-overlay {
  background: $modal-background-overlay;
  z-index: 9999;
  top: 0;
  left: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  position: fixed;
}
.loading {
  text-align: center;
  position: absolute;
  display: inline-block;
  color: $color-text-primary;
  background: $color-primary;
  padding: 5px;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  margin: 0;
  transform: translate(-50%, -50%);
}
section {
  display: block;
  min-height: 400px;
  max-width: 1000px;
  margin: 0 auto;
}
footer{
  margin-top: 2em;
  border-top: 1px solid $background-border;
  background-color: $background-secondary;
}
.title {
  margin: 1em 0 1em 20px;
  color: $color-primary;
  font-size: 1em;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.update-dialog {
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
    padding: 10px;
    margin-bottom: 10px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
  }

  &__actions {
    display: flex;
    margin-top: 8px;
  }
  &__button {
    margin-right: 10px;
    &--confirm {
      margin-left: auto;
    }
  }
}
</style>
