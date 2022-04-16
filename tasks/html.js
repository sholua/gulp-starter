const { src, dest } = require("gulp");
const paths = require("../config/paths");

const gp = require("gulp-load-plugins")();

const html = () => {
  return src(paths.html.src)
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError((error) => ({
          title: "HTML",
          message: error.message,
        })),
      })
    )
    .pipe(gp.fileInclude())
    .pipe(gp.webpHtml())
    .pipe(dest(paths.html.dest));
};

module.exports = html;
