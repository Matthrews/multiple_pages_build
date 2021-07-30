const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ROOT_PATH = process.cwd();
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');
const CUBE_UI_PATH = path.resolve(ROOT_PATH, 'node_modules/cube');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const { NODE_ENV, BUILD_ENV } = process.env;
const parseCSSRules = require('./getCSSRules')(NODE_ENV);
let environment = BUILD_ENV;

if (environment === 'pro') {
  environment = 'prod';
}

module.exports = {
  output: {
    path: BUILD_PATH,
  },
  node: {
    fs: 'empty'
  },
  stats: {
    children: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'assets': path.resolve(ROOT_PATH, '../../src/assets'),
      'pages': path.resolve(ROOT_PATH, '../../src/pages'),
      'components': path.resolve(ROOT_PATH, '../../src/components'),
      'utils': path.resolve(ROOT_PATH, '../../src/utils'),
      'services': path.resolve(ROOT_PATH, '../../src/services'),
      'cache': path.resolve(ROOT_PATH, '../../src/cache')
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: [NODE_MODULES_PATH],
        use: ['happypack/loader?id=babel'],
      },
      {
        test: /\.(css|less)$/,
        // exclude: [NODE_MODULES_PATH],
        use: ['happypack/loader?id=less-loader'],
      },
      {
        test: /\.(css|less)$/,
        include: [CUBE_UI_PATH],
        use: ['happypack/loader?id=less-loader'],
      },
      {
        test: /\.(png|svg||svga|jpg|gif|webp|ico)$/,
        loader: 'url-loader',
        options: {
          // limit: 8192,
          esModule: false
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf|mp3)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: process.env.NODE_ENV === 'development' ? '[path][name].[ext]' : '[contenthash].[ext]',
          },
        }],
        exclude: [path.resolve(ROOT_PATH, 'node_modules/katex')],
      },
      {
        test: /\.(eot|woff|woff2|ttf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          publicPath: 'https://statics-lib.zmlearn.com/tk-fonts/0.11.1/',
          name: '[name].[ext]',
          emitFile: false,
        },
        include: [path.resolve(ROOT_PATH, 'node_modules/katex')],
      }
    ]
  },
  externals: {
    katex: 'katex',
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      loaders: [{
        loader: 'babel-loader',
      }],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new HappyPack({
      id: 'less-loader',
      use: parseCSSRules,
    }),
    new HappyPack({
      id: 'file-loader',
      loaders: ['file-loader']
    }),
    new HappyPack({
      id: 'eslint-loader',
      loaders: [{
        loader: 'eslint-loader',
        options: {
          quiet: true
        }
      }]
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV),
        'BUILD_ENV': JSON.stringify(BUILD_ENV),
        'environment': JSON.stringify(environment), 
      }
    }),
    new FriendlyErrorsWebpackPlugin(),
  ]
};
