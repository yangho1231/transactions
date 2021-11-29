/* istanbul ignore file */

// Load all `index.js` files within their module directories under the current directory as properties
//  i.e., `User/index.js` will become `exports['User']` or `exports.User`
const allExports = {};
require("fs")
  .readdirSync(__dirname + "/")
  .forEach((name) => {
    if (name !== "index.js") {
      allExports[name] = require("./" + name);
    }
  });

module.exports = allExports;
