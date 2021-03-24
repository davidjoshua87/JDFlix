module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
    allowImportExportEverywhere: true,
  },
  plugins: [
    'vue',
  ],
  rules: {
    'linebreak-style': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'one-var': 'off',
    'arrow-parens': 'off',
    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-const': ['error', {
      destructuring: 'all',
      ignoreReadBeforeAssign: false,
    }],
    // allow console.log during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
  },
};
