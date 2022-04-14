const { src, dest } = require("gulp");
const paths = require("../config/paths");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const js = () => {
  return src(paths.js.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(paths.js.dest, { sourcemaps: true }));
};

module.exports = js;