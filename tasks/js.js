const { src, dest } = require("gulp");
const app = require("../config/app");
const paths = require("../config/paths");

// Plugins
const gp = require("gulp-load-plugins")();

const js = () => {
  return src(paths.js.src, { sourcemaps: app.isDev })
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError((error) => ({
          title: "JS",
          message: error.message,
        })),
      })
    )
    .pipe(gp.babel())
    .pipe(gp.webpack(app.webpack))
    .pipe(dest(paths.js.dest, { sourcemaps: app.isDev }));
};

module.exports = js;
