/* eslint-disable */
const path = require('path');

module.exports = function () {
  return {
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
          src: path.resolve(__dirname, '../src')
      }
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};
