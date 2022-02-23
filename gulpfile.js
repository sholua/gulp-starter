const { src, dest, watch, series, parallel } = require("gulp");

// Plugins
const fileInclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();

// HTML processing
const html = () => {
  return src("./src/html/*.html")
    .pipe(fileInclude())
    .pipe(dest("./public"))
    .pipe(browserSync.stream());
};

// Watcher
const watcher = () => {
  watch("./src/html/*.html", html);
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

exports.dev = series(html, parallel(watcher, server));
