/* eslint-disable */
const path = require('path');

module.exports = function(env) {
    if (env === 'development') {
        return require(path.resolve(__dirname, 'webpack', 'dev.conf.js'))();
    }
}