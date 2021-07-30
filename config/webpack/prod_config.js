const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
const commonConfig = require('./common_config.js');
const { publicPath: subPath, cdnEnv, dllCdnUrls } = require('../index');
const ROOT_PATH = process.cwd();
const cd = require(path.resolve(ROOT_PATH, 'cd.json'));
const env = process.env.BUILD_ENV;
const { entries, htmlTemplates, subPath: pagePath } = require('../getEntriesFromArgv');

const webpackConfig = merge(commonConfig, {
  mode: 'production',
  entry: entries,
  output: {
    filename: `static/js/[name]_[contenthash].js`,
    chunkFilename: `static/js/[name]_[contenthash].chunk.js`,
    publicPath: (cdnEnv.includes(env) && cd['cdn-path']) ? cd['cdn-path'] : pagePath ? `${subPath}/${pagePath}` : subPath,
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        exclude: [path.resolve(ROOT_PATH, 'node_modules')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          }
        ]
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
            drop_console: env === 'fat' ? false : true,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: "all",
      name: true,
      automaticNameDelimiter: '_',
      cacheGroups: {
        default: false,
        vendors: false,
        ace: {
          test: /[\\/]node_modules[\\/]zm-tk-ace-m/,
          priority: 20, // 权重越大，打包优先级越高
          name: 'ace',
          reuseExistingChunk: true
        },
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `static/css/[name].css`,
      chunkFilename: `static/css/[name]_[id]_[hash].css`
    }),
    ...htmlTemplates,
    new AddAssetHtmlCdnWebpackPlugin(true, dllCdnUrls),
    new CopyWebpackPlugin(
      [{
        from: path.resolve(ROOT_PATH, 'src/asserts'),
        to: path.resolve(ROOT_PATH, `dist/static/asserts`),
        ignore: ['*.less']
      },
      {
        from: path.resolve(ROOT_PATH, 'favicon.ico'),
        to: path.resolve(ROOT_PATH, 'dist/')
      }
      ]),
  ]
});

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
