const html = () => {
  return $.gulp
    .src($.paths.html.src)
    .pipe(
      $.gp.plumber({
        errorHandler: $.gp.notify.onError((error) => ({
          title: "HTML",
          message: error.message,
        })),
      })
    )
    .pipe($.gp.fileInclude())
    .pipe($.gp.webpHtml())
    .pipe($.gulp.dest($.paths.html.dest))
    .pipe($.browserSync.stream());
};

module.exports = html;
