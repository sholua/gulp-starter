const { src, dest } = require("gulp");
const app = require("../config/app");
const paths = require("../config/paths");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const gulpIf = require("gulp-if");

const gp = require("gulp-load-plugins")();

const img = () => {
  return src(paths.img.src)
    .pipe(
      gp.plumber({
        errorHandler: gp.notify.onError((error) => ({
          title: "Image",
          message: error.message,
        })),
      })
    )
    .pipe(gp.newer(paths.img.dest))
    .pipe(gp.webp())
    .pipe(dest(paths.img.dest))
    .pipe(src(paths.img.src))
    .pipe(gp.newer(paths.img.dest))
    .pipe(gp.gulpIf(app.isProd, gp.imagemin(app.imagemin)))
    .pipe(dest(paths.img.dest));
};

module.exports = img;
