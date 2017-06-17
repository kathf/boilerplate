const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src')
  },
  module: {
    rules: [
      {test: /\.txt$/, use: 'raw-loader'},
      {test: /\.css$/, use: 'css-loader'}
    ]
  },
  devServer: {
    contentBase: __dirname,
    hot: true,
    publicPath: "/"
  }
};
