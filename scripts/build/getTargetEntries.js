/**
 * 选择appId打包页面
 * 1. dev模式下
 * 2. prod --local模式下
 */

 const inquirer = require('inquirer');
 const promptForDev = require('../prompt/dev');
 const allEntries = require('../../config/getEntries')(true);
 const getMenuList = require('./getMenuList');
 const { error: showError } = require('../log');
 
 module.exports = () => {
   let objGroupByAppId = {};
 
   return new Promise((resolve) => {
     // 1. group by appId
     getMenuList().then(menuList => {
       menuList.forEach(menu => {     
         if (!objGroupByAppId[menu.appId]) {
           const pages = [];
   
           pages.push(menu.name);
           objGroupByAppId[menu.appId] = pages;
         } else {
           objGroupByAppId[menu.appId].push(menu.name);
         }
       });
 
       console.log('appId对应页面:\n', objGroupByAppId);
 
       // 2. inquirer
       const appIds = Object.keys(objGroupByAppId);
 
       inquirer.prompt(promptForDev(appIds)).then(({ appId }) => {
         // 3. get target entry by checkout appId
         const pageNames = objGroupByAppId[appId];
         let targetEntries = {};
 
         if (appId === '00000') {
           targetEntries = allEntries;
         } else {
           for (let name in allEntries) {
             if (pageNames.includes(name)) {
               targetEntries[name] = allEntries[name];
             }
           }
         }
 
         resolve({
           appId,
           targetEntries,
         });
       });
     }).catch(err => showError(err))  
   });
 };
 