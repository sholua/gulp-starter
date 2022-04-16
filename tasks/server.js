const server = () => {
  $.browserSync.init({
    server: {
      baseDir: $.paths.root,
    },
  });
};

module.exports = server;
