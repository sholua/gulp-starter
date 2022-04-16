const js = () => {
  return $.gulp
    .src($.paths.js.src, { sourcemaps: $.app.isDev })
    .pipe(
      $.gp.plumber({
        errorHandler: $.gp.notify.onError((error) => ({
          title: "JS",
          message: error.message,
        })),
      })
    )
    .pipe($.gp.babel())
    .pipe($.webpack($.app.webpack))
    .pipe($.gulp.dest($.paths.js.dest, { sourcemaps: $.app.isDev }))
    .pipe($.browserSync.stream());
};

module.exports = js;
