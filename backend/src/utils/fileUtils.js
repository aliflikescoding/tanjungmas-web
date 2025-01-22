const fs = require("fs");
const util = require("util");

const unlinkAsync = util.promisify(fs.unlink);

module.exports = { unlinkAsync };
