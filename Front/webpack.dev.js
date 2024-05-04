const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const devConfig = {
  mode: "development",
  devServer: {
    host: '127.0.0.1'
  }
};

module.exports = merge(commonConfig, devConfig);