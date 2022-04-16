const { watch, series, parallel } = require("gulp");

const app = require("./config/app");
const paths = require("./config/paths");

// Plugins
const browserSync = require("browser-sync").create();

// Tasks
const html = require("./tasks/html");
const clear = require("./tasks/clear");
const scss = require("./tasks/scss");
const js = require("./tasks/js");
const img = require("./tasks/img");

// Watcher
const watcher = () => {
  watch(paths.html.watch, html).on("all", browserSync.reload);
  watch(paths.scss.watch, scss).on("all", browserSync.reload);
  watch(paths.js.watch, js).on("all", browserSync.reload);
  watch(paths.img.watch, img).on("all", browserSync.reload);
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
exports.scss = scss;
exports.js = js;
exports.img = img;

const build = series(clear, parallel(html, scss, js, img));

const dev = series(build, parallel(watcher, server));

exports.default = app.isProd ? build : dev;
