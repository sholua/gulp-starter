const { src, dest } = require("gulp");
const app = require("../config/app");
const paths = require("../config/paths");

// Plugins
const gp = require("gulp-load-plugins")({
  postRequireTransforms: {
    sass: function (sass) {
      return sass(require("sass"));
    },
  },
});

const scss = () => {
  return src(paths.scss.src, { sourcemaps: app.isDev })
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError((error) => ({
          title: "SCSS",
          message: error.message,
        })),
      })
    )
    .pipe(gp.sass())
    .pipe(gp.webpCss())
    .pipe(gp.shorthand())
    .pipe(gp.groupCssMediaQueries())
    .pipe(gp.autoprefixer())
    .pipe(dest(paths.scss.dest, { sourcemaps: app.isDev }))
    .pipe(gp.rename({ suffix: ".min" }))
    .pipe(gp.size({ title: "main.css" }))
    .pipe(gp.csso())
    .pipe(gp.size({ title: "main.min.css" }))
    .pipe(dest(paths.scss.dest, { sourcemaps: app.isDev }));
};

module.exports = scss;
