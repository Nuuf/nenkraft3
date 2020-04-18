/* eslint-disable */
const version = require('./package.json').version;

module.exports = function () {
  return [
    '/**',
    '* @package     Nenkraft3',
    "* @author      Gustav 'Nuuf' Åberg <gustavrein@gmail.com>",
    '* @version     ' + version,
    "* @copyright   (C) 2020 Gustav 'Nuuf' Åberg",
    '* @license     {@link https://github.com/Nuuf/nenkraft3/blob/master/LICENSE}',
    '*/',
  ].join('\n');
};
