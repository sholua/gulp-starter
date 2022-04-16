const isProd = process.argv.includes("--production");

module.exports = {
  isProd,
  isDev: !isProd,

  webpack: {
    mode: isProd ? "production" : "development",
  },

  imagemin: {
    verbose: true,
  },
};
