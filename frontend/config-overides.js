const path = require('path');

module.exports = {
  webpack: function (config, env) {
    // Customize the webpack configuration here
    config.resolve = {
      ...config.resolve,
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    };

    return config;
  },
};
