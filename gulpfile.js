const { watch, series, parallel } = require("gulp");

const paths = require("./config/paths");

// Plugins
const browserSync = require("browser-sync").create();

// Tasks
const html = require("./tasks/html");
const clear = require("./tasks/clear");
const css = require("./tasks/css");

// Watcher
const watcher = () => {
  watch(paths.html.watch, html).on("all", browserSync.reload);
  watch(paths.css.watch, css).on("all", browserSync.reload);
};

// Server
const server = () => {
  browserSync.init({
    server: {
      baseDir: paths.root,
    },
  });
};

// Tasks
exports.html = html;
exports.clear = clear;
exports.css = css;

exports.dev = series(clear, parallel(html, css), parallel(watcher, server));
