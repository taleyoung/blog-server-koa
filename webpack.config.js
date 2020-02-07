const webpack = require("webpack");
module.exports = {
  entry: "./index.ts",
  output: "dist",
  mudule: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      }
    ]
  }
};
