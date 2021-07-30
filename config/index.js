module.exports = {
    appId: '12477',
    port: '8080',
    publicPath: 'qb-webapp-m',
    isMock: false,
    cdnEnv: ['fat', 'uat', 'pro'],
    excludeEntries: ['home'],
    dllCdnUrls: {
      react: '//statics-lib.zmlearn.com/react/16.13.1/umd/react.production.min.js',
      reactDom: '//statics-lib.zmlearn.com/react-dom/16.13.1/umd/react-dom.production.min.js',
      // zmJSSDk: '//statics-lib.zmlearn.com/zm-jssdk/stable/zm-jssdk.js',
      // tkMonitor: '//web-data.zmlearn.com/config/cLzZtf9PCeYM8KcsoqNBnj/tkMonitor-0.0.1.min.js',
      // encryptLib: '//statics-lib.zmlearn.com/zm-qb-encrypt/1.0.0/-_-.2018-09-01.js',
      // encryptKey: '//statics-lib.zmlearn.com/zm-qb-encrypt/1.0.0/_-_.2018-09-01.js',
      // katexJS: '//statics-lib.zmlearn.com/katex/0.11.0/katex.min.js',
      // katexCSS: '//statics-lib.zmlearn.com/katex/0.11.0/katex.min.css',
    },
  }
  