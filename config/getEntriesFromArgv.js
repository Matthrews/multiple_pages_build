/**
 * 1. 本地dev打包，根据选择的appId， 启动对应的页面
 * 2. 在CD中打包，自动识别appId, 根据menulist.json的配置动态下发 entry
 */

 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ROOT_PATH = process.cwd();
 const PAGE_PATH = path.resolve(ROOT_PATH, 'src/pages');
 const getChunksByEntry = require('./getChunksByEntry');
 const { NODE_ENV } = process.env;
 const argv = process.argv.slice(2) || [];
 let entries = {};
 let subPath = '';
 const htmlTemplates = [];
 
 try {
   const entrieStr = argv.filter(p => p.indexOf('entries') > -1)[0];
   const subPathStr = argv.filter(p => p.indexOf('subpath') > -1)[0];
 
   entries = entrieStr ? JSON.parse(entrieStr.split('=')[1]) : {};
   subPath = subPathStr ? subPathStr.split('=')[1] : '';
 } catch (e) {
   console.log('getEntriesFromArgv', e);
 }
 
 Object.keys(entries).forEach(v => {
   htmlTemplates.push(
     new HtmlWebpackPlugin({
       filename: `${v}.html`,
       title: v,
       template: path.resolve(PAGE_PATH, `${v}/index.html`),
       inject: true,
       chunks: [v, ...(getChunksByEntry(v))],
       minify: NODE_ENV === 'development' ? false : {
         removeComments: true,
         collapseWhitespace: true,
         removeAttributeQuotes: true
       },
       chunksSortMode: 'dependency',
     })
   );
 });
 
 module.exports = {
   entries,
   htmlTemplates,
   subPath,
 };
 