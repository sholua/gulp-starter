const { src, dest } = require("gulp");
const paths = require("../config/paths");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const groupCssMediaQueries = require("gulp-group-css-media-queries");

const css = () => {
  return src(paths.css.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(concat("main.css"))
    .pipe(shorthand())
    .pipe(groupCssMediaQueries())
    .pipe(autoprefixer())
    .pipe(dest(paths.css.dest, { sourcemaps: true }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(size({ title: "main.css" }))
    .pipe(csso())
    .pipe(size({ title: "main.min.css" }))
    .pipe(dest(paths.css.dest, { sourcemaps: true }));
};

module.exports = css;