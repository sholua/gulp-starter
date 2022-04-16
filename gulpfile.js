global.$ = {
  gulp: require("gulp"),
  gp: require("gulp-load-plugins")({
    postRequireTransforms: {
      sass: function (sass) {
        return sass(require("sass"));
      },
    },
  }),
  browserSync: require("browser-sync").create(),
  del: require("del"),
  webpack: require("webpack-stream"),

  app: require("./config/app"),
  paths: require("./config/paths"),
};

// Tasks
const html = require("./tasks/html");
const clear = require("./tasks/clear");
const scss = require("./tasks/scss");
const js = require("./tasks/js");
const img = require("./tasks/img");

// Watcher
const watcher = () => {
  $.gulp.watch($.paths.html.watch, html).on("all", $.browserSync.reload);
  $.gulp.watch($.paths.scss.watch, scss).on("all", $.browserSync.reload);
  $.gulp.watch($.paths.js.watch, js).on("all", $.browserSync.reload);
  $.gulp.watch($.paths.img.watch, img).on("all", $.browserSync.reload);
};

// Server
const server = () => {
  $.browserSync.init({
    server: {
      baseDir: $.paths.root,
    },
  });
};

// Tasks
exports.html = html;
exports.clear = clear;
exports.scss = scss;
exports.js = js;
exports.img = img;

const build = $.gulp.series(clear, $.gulp.parallel(html, scss, js, img));

const dev = $.gulp.series(build, $.gulp.parallel(watcher, server));

exports.default = $.app.isProd ? build : dev;
