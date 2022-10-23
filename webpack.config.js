const path = require('path');
const webpack = require("webpack");
const fs = require("fs");

module.exports = {
  entry: './src/main.ts',
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^leaflet$/,
      "leaflet/dist/leaflet.js"
    )
  ]
};
