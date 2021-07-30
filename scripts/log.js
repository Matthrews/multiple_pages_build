/**
 * log方式封装，只支持一个类型为字符串的参数
 */
 const chalk = require('chalk');
 const log = console.log;
 
 module.exports = {
   info(msg) {
     log(chalk.bold.green(msg));
   },
   warn(msg) {
     log();
     log(chalk.yellow(msg));
   },
   error(msg) {
     log(chalk.bold.red(msg));
   }
 };
 