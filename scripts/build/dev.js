/**
 * NODE_ENV=development 可指定启动单个项目(appId)
 */

 const path = require('path');
 const { spawn } = require('child_process');
 const ROOT_PATH = process.cwd();
 const WEBPACK_DEV_CONFIG = path.join(ROOT_PATH, 'config/webpack/dev_config.js');
 const getTargetEntries = require('./getTargetEntries');
 const { info } = require('../log');
 
 getTargetEntries().then(({ appId, targetEntries }) => {
   build(appId, targetEntries);
 });
 
 
 function build(id, entries) {
   info(`[appId: ${id}]项目页面开始打包`);
 
   // webpack build
   spawn(
     'node',
     [
       'node_modules/webpack-dev-server/bin/webpack-dev-server.js',
       `--config`,
       WEBPACK_DEV_CONFIG,
       '--hot',
       `--entries=${JSON.stringify(entries)}`
     ],
     {
       stdio: 'inherit'
     }
   );
 }
 
 
 