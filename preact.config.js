const preactCliLodash = require('preact-cli-lodash');
 
export default function (config, env, helpers) {
  preactCliLodash(config);
  
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
  rule.options.plugins.push('transform-regenerator');
  rule.options.plugins.push(["transform-runtime", {
    "helpers": false,
    "polyfill": false,
    "regenerator": true
  }]);
}