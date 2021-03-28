const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/vuejs-pwa/' : '',

  configureWebpack: {
    plugins: [new GenerateSW()],
    performance: {
      hints: false,
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/app',
    dest: 'public',
    workboxPluginMode: 'InjectManifest',
    themeColor: '#42b983',
    msTileColor: '#42b983',
    appleMobileWebAppCache: 'yes',
    maximumFileSizeToCacheInBytes: 5000000,
    manifestOptions: {
      name: 'JDsFlix Movie Lists',
      short_name: 'JDsFlix',
      description: 'Application Movie Lists',
      display: 'standalone',
      theme_color: 'rgb(255, 102, 51)',
      background_color: '#1c202e',
      start_url: '.',
      icons: [{
        src: './img/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      }, {
        src: './img/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      }, {
        src: './img/icons/android-chrome-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      }, {
        src: './img/icons/android-chrome-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }, {
        src: './img/icons/android-icon-36x36.png',
        sizes: '36x36',
        type: 'image/png',
        density: '0.75',
      },
      {
        src: './img/icons/android-icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
        density: '1.0',
      },
      {
        src: './img/icons/android-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        density: '1.5',
      },
      {
        src: './img/icons/android-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        density: '2.0',
      },
      {
        src: './img/icons/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        density: '3.0',
      },
      {
        src: './img/icons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        density: '4.0',
      },
      ],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/scss/styles.scss"',
      },
      scss: {
        prependData: '@import "~@/scss/styles.scss";',
      },
      less: {
        globalVars: {
          primary: '#fff',
        },
      },
    },
  },
};
