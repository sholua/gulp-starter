const { src, dest } = require("gulp");
const paths = require("../config/paths");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileInclude = require("gulp-file-include");

const html = () => {
  return src(paths.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "HTML",
          message: error.message,
        })),
      })
    )
    .pipe(fileInclude())
    .pipe(dest(paths.html.dest));
};

module.exports = html;
