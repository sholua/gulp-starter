const { watch, series, parallel } = require("gulp");

const paths = require("./config/paths");

// Plugins
const browserSync = require("browser-sync").create();

// Tasks
const html = require("./tasks/html");
const clear = require("./tasks/clear");

// Watcher
const watcher = () => {
  watch(paths.html.watch, html).on("all", browserSync.reload);
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
exports.watch = watcher;
exports.clear = clear;

exports.dev = series(clear, html, parallel(watcher, server));
