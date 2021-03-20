module.exports = {
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
