const del = require("del");
const paths = require("../config/paths");

const clear = () => {
  return del(paths.root);
};

module.exports = clear;
