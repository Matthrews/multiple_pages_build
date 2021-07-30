const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common_config.js');
const { port } = require('../index');
const { entries, htmlTemplates } = require('../getEntriesFromArgv');
const pageNames = Object.keys(entries);
const showMenu = pageNames.includes('home');
const indexPage = showMenu ? 'home.html' : `${pageNames[0]}.html`;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  entry: entries,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  // 服务器配置
  devServer: {
    host: '0.0.0.0',
    port,
    useLocalIp: true,
    historyApiFallback: true,
    contentBase: '../../dist',
    open: true,
    // hot: true,
    quiet: true,
    overlay: true,
    index: indexPage,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    ...htmlTemplates,
  ]
});
