const clear = () => {
  return $.del($.paths.root);
};

module.exports = clear;
