const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // Thay đổi đường dẫn đến file entry của bạn
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Thay đổi đường dẫn đến thư mục output của bạn
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      // Các loader khác nếu cần
    ],
  },
};
