// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: './src/popup.jsx',
    loginForm: './src/LoginForm.jsx',
    dashboard: './src/dashboard.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],  
  }),
  new HtmlWebpackPlugin({
    template: './src/dashboard.html', 
    filename: 'dashboard.html', 
    chunks: ['dashboard'], 
  }),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};
