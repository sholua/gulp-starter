const { src, dest } = require("gulp");
const app = require("../config/app");
const paths = require("../config/paths");

// Plugins
const gp = require("gulp-load-plugins")();

const css = () => {
  return src(paths.css.src, { sourcemaps: app.isDev })
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError((error) => ({
          title: "CSS",
          message: error.message,
        })),
      })
    )
    .pipe(gp.concat("main.css"))
    .pipe(gp.shorthand())
    .pipe(gp.groupCssMediaQueries())
    .pipe(gp.webpCss())
    .pipe(gp.autoprefixer())
    .pipe(dest(paths.css.dest, { sourcemaps: app.isDev }))
    .pipe(gp.rename({ suffix: ".min" }))
    .pipe(gp.size({ title: "main.css" }))
    .pipe(gp.csso())
    .pipe(gp.size({ title: "main.min.css" }))
    .pipe(dest(paths.css.dest, { sourcemaps: app.isDev }));
};

module.exports = css;
