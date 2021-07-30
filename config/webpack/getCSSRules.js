const path = require('path');
const ROOT_PATH = process.cwd();

module.exports = (env) => {
  const isDev = env === 'development';
  const styleLoader = {
    loader: 'style-loader',
  };
  const rules = [
    {
      loader: 'css-loader',
      options: {
        import: true,
        // modules: true,
        // localIdentName: '[name]__[local]___[hash:base64:5]',
        importLoaders: 2
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        config: {
          path: path.resolve(ROOT_PATH, 'postcss.config.js')
        }
      }
    },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
        // modules: true,
        // localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    },
  ];

  if (isDev) {
    rules.unshift(styleLoader);
  }

  return rules;
}
