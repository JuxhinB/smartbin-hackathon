const { override, addPostcssPlugins } = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = override([
  addPostcssPlugins([require('tailwindcss')]),
  function reset(config, env) {
    config = rewireReactHotLoader(config, env);
    return config;
  },
]);
