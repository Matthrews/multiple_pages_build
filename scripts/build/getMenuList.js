/**
 * 读取src/pages/home/menuList.json 文件获取配置
 */
 const fs = require('fs');
 const path = require('path');
 const ROOT_PATH = process.cwd();
 const MENU_LIST_PATH = path.join(ROOT_PATH, 'src/pages/home/menuList.json');
 
 module.exports = () => {
   return new Promise((resolve, reject) => {
     try {
       const menuFile = fs.readFileSync(MENU_LIST_PATH, function(err) {
         if (err) showError(err);
       });
       const menuList = menuFile.length ? JSON.parse(menuFile) : [];
 
       resolve(menuList);
     } catch (e) {
       reject(e);
     }
   });
 };
 
 
 