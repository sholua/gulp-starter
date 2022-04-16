const scss = () => {
  return $.gulp
    .src($.paths.scss.src, { sourcemaps: $.app.isDev })
    .pipe(
      $.gp.plumber({
        errorHandler: $.gp.notify.onError((error) => ({
          title: "SCSS",
          message: error.message,
        })),
      })
    )
    .pipe($.gp.sass())
    .pipe($.gp.webpCss())
    .pipe($.gp.shorthand())
    .pipe($.gp.groupCssMediaQueries())
    .pipe($.gp.autoprefixer())
    .pipe($.gulp.dest($.paths.scss.dest, { sourcemaps: $.app.isDev }))
    .pipe($.gp.rename({ suffix: ".min" }))
    .pipe($.gp.size({ title: "main.css" }))
    .pipe($.gp.csso())
    .pipe($.gp.size({ title: "main.min.css" }))
    .pipe($.gulp.dest($.paths.scss.dest, { sourcemaps: $.app.isDev }));
};

module.exports = scss;
