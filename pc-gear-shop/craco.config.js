module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          crypto: false,
          stream: false,
          process: false,
        };
        return webpackConfig;
      },
    },
  };
  