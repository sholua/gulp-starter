const { src, dest } = require("gulp");
const app = require("../config/app");
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
const webpCss = require("gulp-webp-css");

const css = () => {
  return src(paths.css.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "CSS",
          message: error.message,
        })),
      })
    )
    .pipe(concat("main.css"))
    .pipe(shorthand())
    .pipe(groupCssMediaQueries())
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(dest(paths.css.dest, { sourcemaps: app.isDev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(size({ title: "main.css" }))
    .pipe(csso())
    .pipe(size({ title: "main.min.css" }))
    .pipe(dest(paths.css.dest, { sourcemaps: app.isDev }));
};

module.exports = css;
