const fs = require('fs');
const path = require('path');
const ROOT_PATH = process.cwd();
const PAGE_PATH = path.resolve(ROOT_PATH, 'src/pages');
const { excludeEntries } = require('./index');
const isProd = process.env.NODE_ENV === 'production';

module.exports = (sync = false) => {
  const entries = {};
  
  fs.readdirSync(PAGE_PATH)
    .filter(el => isProd ? !excludeEntries.includes(el) : el)
    .forEach(key => {
      entries[key] = path.resolve(PAGE_PATH, `${key}`);
    });

  // 同步
  if (sync) return entries;

  // 异步
  return new Promise((resolve, reject) => {
    if (Object.keys(entries).length) {
      resolve(entries);
    } else {
      reject('src/pages: 找不到入口页面');
    }
  });
};
