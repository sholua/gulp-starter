const { src, dest, watch, series, parallel } = require("gulp");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileInclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();
const del = require("del");

// HTML processing
const html = () => {
  return src("./src/html/*.html")
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(fileInclude())
    .pipe(dest("./public"))
    .pipe(browserSync.stream());
};

// Watcher
const watcher = () => {
  watch("./src/html/*.html", html);
};

// Cleaner
const clean = () => {
  return del("./public");
};

// Server
const server = () => {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
  });
};

// Takss
exports.html = html;
exports.watch = watcher;

exports.dev = series(clean, html, parallel(watcher, server));
