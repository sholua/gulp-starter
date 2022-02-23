const { watch, series, parallel } = require("gulp");

// Plugins
const browserSync = require("browser-sync").create();

// Tasks
const html = require("./tasks/html");
const clear = require("./tasks/clear");

// Watcher
const watcher = () => {
  watch("./src/html/*.html", html).on("all", browserSync.reload);
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
exports.clear = clear;

exports.dev = series(clear, html, parallel(watcher, server));
