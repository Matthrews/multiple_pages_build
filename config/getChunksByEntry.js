const menuList = require('../src/pages/home/menuList.json');

module.exports = (entryName) => {
  const arr = menuList.filter(menu => menu.name === entryName);

  return arr[0] && arr[0].chunks || [];
}
