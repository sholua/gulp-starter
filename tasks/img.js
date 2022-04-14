const { src, dest } = require("gulp");
const app = require("../config/app");
const paths = require("../config/paths");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");

const img = () => {
  return src(paths.img.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "Image",
          message: error.message,
        })),
      })
    )
    .pipe(newer(paths.img.dest))
    .pipe(imagemin(app.imagemin))
    .pipe(dest(paths.img.dest));
};

module.exports = img;
