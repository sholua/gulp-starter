const img = () => {
  return $.gulp
    .src($.paths.img.src)
    .pipe(
      $.gp.plumber({
        errorHandler: $.gp.notify.onError((error) => ({
          title: "Image",
          message: error.message,
        })),
      })
    )
    .pipe($.gp.newer($.paths.img.dest))
    .pipe($.gp.webp())
    .pipe($.gulp.dest($.paths.img.dest))
    .pipe($.gulp.src($.paths.img.src))
    .pipe($.gp.newer($.paths.img.dest))
    .pipe($.gp.if($.app.isProd, $.gp.imagemin($.app.imagemin)))
    .pipe($.gulp.dest($.paths.img.dest));
};

module.exports = img;
