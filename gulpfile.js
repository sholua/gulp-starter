const { src, dest, watch, series, parallel } = require("gulp");

// Plugins
const fileInclude = require("gulp-file-include");

// HTML processing
const html = () => {
  return src("./src/html/*.html").pipe(fileInclude()).pipe(dest("./public"));
};

// Watcher
const watcher = () => {
  watch("./src/html/*.html", html);
};

// Takss
exports.html = html;
exports.watch = watcher;

exports.dev = series(html, watcher);
