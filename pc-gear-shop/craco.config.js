module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          crypto: false,
          stream: false,
          process: false, // Thêm nếu gặp lỗi liên quan đến `process`
        };
        return webpackConfig;
      },
    },
  };
  