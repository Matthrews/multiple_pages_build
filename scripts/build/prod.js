/**
 * NODE_ENV=production 下打包前，根据appId 动态分配entry
 */

 const path = require('path');
 const { spawn } = require('child_process');
 const ROOT_PATH = process.cwd();
 const WEBPACK_PROD_CONFIG = path.join(ROOT_PATH, 'config/webpack/prod_config.js');
 const allEntries = require('../../config/getEntries')(true);
 const regRex = /\/(\d+)\//;
 const { error: showError, info, warn } = require('../log');
 const cd = require(path.resolve(ROOT_PATH, 'cd.json'));
 const cndPath  = cd['cdn-path'];
 const getTargetEntriesFromLocal = require('./getTargetEntries');
 const getMenuList = require('./getMenuList');
 let appId = '';
 
 // 1. valid
 if (!cndPath) {
   showError('[property: cdn-path] is empty in cd.json');
 
   // local mode
   info('prod本地模式开启，请选择appId');
 
   getTargetEntriesFromLocal().then(({ targetEntries: localEntries, appId: id }) => {
 
     appId = id;
 
     // 2.1 build by localEntries
     build(localEntries);
   });
 } else {
   try {
     let targetEntries = {};
 
     appId = cndPath.match(regRex)[1];
 
     // 2.2.1 get targetEntries from CD
     findPageNamesByAppId(appId).then(({ pageNames, subPath }) => {
       Object.keys(allEntries).forEach(key => {
         if (pageNames.includes(key)) {
           targetEntries[key] = allEntries[key];
         }
       });
   
       // 2.2.2 build by targetEntries
       build(targetEntries, subPath);
     })
   } catch (e) {
     showError(e);
     return;
   }
 }
 
 function findPageNamesByAppId(id) {
   return getMenuList().then(menuList => {
     let pageNames = [];
     let subPath = '';
 
     menuList.forEach(menu => {
       if (menu.appId === id) {
         pageNames.push(menu.name);
         subPath = menu.subPath;
       }
     });
 
     return { pageNames, subPath };
   }).catch(err => showError(err))
 }
 
 function build(entries, path) {
   const pages = Object.keys(entries);
   const len = pages.length;
   const pageStr = pages.join('、');
 
   if (!len) {
     showError('没有匹配到对应的页面!');
     return;
   }
 
   // mark build start
   formatLog(`页面${pageStr} (appId: ${appId}) 打包开始...`);
 
   // webpack build
   spawn(
     'node',
     [
       'node_modules/webpack/bin/webpack.js',
       `--config`,
       WEBPACK_PROD_CONFIG,
       `--entries=${JSON.stringify(entries)}`,
       `--subpath=${path}`,
     ],
     {
       stdio: 'inherit'
     }
   ).on('close', (code) => {
     if (code == 0) {
       // mark build end
       formatLog(`页面${pageStr} (appId: ${appId}) 打包完成。`);
     } else {
       warn(`child process exited with code ${code}`);
     }
   });
 }
 
 function formatLog(msg) {
   info('');
   info(msg);
   info('');
 }
 