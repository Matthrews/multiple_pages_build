const fs = require('fs');
const path = require('path');
const https = require('https');
const inquirer = require('inquirer');
const { info, error: showError, warn } = require('./log');
const getEntries = require('../config/getEntries');
const promptForRemove = require('./prompt/removePage');
const CANNOT_BE_REMOVED = ['home']; // 不可被删除目录
const TARGET_DIR_PATH = path.join(process.cwd(), 'src', 'pages');
const MENU_LIST_PATH = path.join(TARGET_DIR_PATH, 'home/menuList.json');

getEntries()
  .then(entries => {
    const choices = Object.keys(entries).filter(e => !CANNOT_BE_REMOVED.includes(e));

    inquirer.prompt(promptForRemove(choices))
      .then(answers => {
        const { pageName } = answers;

        // 1. valid addressable
        validIsAccess(pageName).then(isRemove => {
          info(isRemove);

          if (isRemove) {
            // 2. remove view dir
            delDir(`${TARGET_DIR_PATH}/${pageName}`);

            // 3. remove from menu
            removeFromMenuList(pageName);

            // 4. output log
            info(`页面: ${pageName} 已移除完毕`);
          } else {
            warn(`移除失败！检测到该页面在测试站点中有使用，请检查确认`);
            warn(`如真的要移除请联系 @石伟 确认`);
          }
        });
      });

  })

function validIsAccess(pageName) {
  const url = `https://x-chat-test.zmlearn.com/qb-webapp-m/${pageName}.html`;
  let isRemove = false;

  return new Promise((resolve, reject) => {
    https.get(url, (resp) => {
      let data = '';
  
      resp.on('data', chunk => {
        data += chunk;
      })
  
      resp.on('end', () => {
        isRemove = data.indexOf('404 Not Found') > -1;

        resolve(isRemove);
      });

    }).on('error', err => {
      reject(err);
    });
  });
}

function delDir(path){
  let files = [];

  if(fs.existsSync(path)){
    files = fs.readdirSync(path);

    files.forEach(file => {
      let curPath = path + "/" + file;

      if(fs.statSync(curPath).isDirectory()){
        delDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(path);
  }
}

function removeFromMenuList(name) {
  try {
    const menuFile = fs.readFileSync(MENU_LIST_PATH, function(err) {
      if (err) showError(err);
    });
    let menuList = menuFile.length ? JSON.parse(menuFile) : [];    
    
    menuList = menuList.filter(e => e.name !== name);
    
    fs.writeFile(MENU_LIST_PATH, JSON.stringify(menuList, null, 2), 'utf8', function(err) {
      if(err){
        showError(err);
      }
    });

  } catch (e) {
    showError(e);
  }
}
