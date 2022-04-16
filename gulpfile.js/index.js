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
const tasks = require("require-dir")("./tasks", { recurse: true });
// const server = require("./tasks/server");
// const html = require("./tasks/html");
// const clear = require("./tasks/clear");
// const scss = require("./tasks/scss");
// const js = require("./tasks/js");
// const img = require("./tasks/img");

// Watcher
const watcher = () => {
  $.gulp.watch($.paths.html.watch, tasks.html);
  $.gulp.watch($.paths.scss.watch, tasks.scss);
  $.gulp.watch($.paths.js.watch, tasks.js);
  $.gulp.watch($.paths.img.watch, tasks.img);
};

// Tasks
exports.clear = tasks.clear;
exports.html = tasks.html;
exports.scss = tasks.scss;
exports.js = tasks.js;
exports.img = tasks.img;

const build = $.gulp.series(
  tasks.clear,
  $.gulp.parallel(tasks.html, tasks.scss, tasks.js, tasks.img)
);

const dev = $.gulp.series(build, $.gulp.parallel(watcher, tasks.server));

exports.default = $.app.isProd ? build : dev;
