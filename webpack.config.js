const path = require('path');
const webpack = require("webpack");
const fs = require("fs");

module.exports = {
  entry: {
    'all_locations': './src/pages/all_locations.js',
    'analysis': './src/pages/analysis.js'
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^leaflet$/,
      "leaflet/dist/leaflet.js"
    )
  ]
};
