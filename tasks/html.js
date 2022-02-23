const { src, dest } = require("gulp");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileInclude = require("gulp-file-include");

const html = () => {
  return src("./src/html/*.html")
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(fileInclude())
    .pipe(dest("./public"));
};

module.exports = html;
