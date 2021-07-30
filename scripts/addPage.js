const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const inquirer = require('inquirer');
const promptForAddPage = require('./prompt/addPage');
const { error: showError, info, warn } = require('./log');
const TARGET_DIR_PATH = path.join(process.cwd(), 'src', 'pages');
const MENU_LIST_PATH = path.join(TARGET_DIR_PATH, 'home/menuList.json');
const TMPL_DIR_PATH = path.join(process.cwd(), 'scripts', 'templates');

fs.stat(TARGET_DIR_PATH, function(err, stats) {
  if(err){
    errorLog(err);
    return false;
  }

  if (stats.isDirectory()) {
    inquirer.prompt(promptForAddPage)
      .then(answers => {
        const { pageName, pageTitle, pageAppId, subPath } = answers;

        // 1. 创建新目录
        if (pageName) {
          fs.mkdir(`${TARGET_DIR_PATH}/${pageName}`, function(err){
            if(err){
              errorLog(err);
              return false;
            }

            // 2. 写入模板
            writeFilesToPageDir(pageName, pageTitle, pageAppId);

            // 3. 同步到入口菜单
            syncToMenuList(pageName, pageTitle, pageAppId, subPath);
          })
        }
      })
  }
})


function getTmplFileData(name, title, appId) {
  return Promise.all([
    ejs.renderFile(`${TMPL_DIR_PATH}/html.ejs`, { name, title, appId }, { async: true }),
    ejs.renderFile(`${TMPL_DIR_PATH}/entrance.ejs`, { name }, { async: true }),
    ejs.renderFile(`${TMPL_DIR_PATH}/main.ejs`, {}, { async: true }),
    ejs.renderFile(`${TMPL_DIR_PATH}/style.ejs`, {}, { async: true })
  ]);
}

function writeFile(filename, str, name) {
  fs.writeFile(`${TARGET_DIR_PATH}/${name}/${filename}`, str, 'utf8', function(err) {
    if(err){
      errorLog(err);
      return false;
    }
  });
}

async function writeFilesToPageDir(name, title, appId) {
  const [html, entrance, main, style] = await getTmplFileData(name, title, appId);

  // components dir
  fs.mkdir(`${TARGET_DIR_PATH}/${name}/components`, function (err){
    if (err) showError(err); return false;
  });

  // typings dir
  fs.mkdir(`${TARGET_DIR_PATH}/${name}/typings`, function (err){
    if (err) showError(err); return false;
  });

  // index.html
  writeFile('index.html', html, name);

  // index.tsx
  writeFile('index.tsx', entrance, name);

  // App.tsx
  writeFile('App.tsx', main, name);

  // app.less
  writeFile('app.less', style, name);

  info(`页面：${name} 添加成功`);

  // tips for no-bind-appId 
  if (!appId) {
    noAppIdTips(name);
  }
}

function syncToMenuList(name, title, appId, subPath) {
  try {
    const menuFile = fs.readFileSync(MENU_LIST_PATH, function(err) {
      if (err) showError(err);
    });
    const menuList = menuFile.length ? JSON.parse(menuFile) : [];    
    
    menuList.push({
      name,
      title,
      appId,
      chunks: [],
      subPath,
    });
    
    fs.writeFile(MENU_LIST_PATH, JSON.stringify(menuList, null, 2), 'utf8', function(err) {
      if(err){
        errorLog(err);
        return false;
      }
    });

  } catch (e) {
    showError(e);
  }
}

function noAppIdTips(pageName) {
  warn('###### 你还没有绑定appId， 请手动修改以下两个文件完成绑定 ######');
  warn('1. src/pages/home/menuList.json');
  warn(`2. src/pages/${pageName}/index.html`);
}

function errorLog(err) {
  showError(err.message || JSON.stringify(err));
}
