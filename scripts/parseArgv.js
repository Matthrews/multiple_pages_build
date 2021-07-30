const { error } = require('./log');
const argv = process.argv.slice(2) || [];
let pages = [];
try {
  const str = argv.filter(p => p.indexOf('entries') > -1)[0];
  pages = str ? str.split('=')[1].split(',') : [];
} catch (e) {
  error(e);
  pages = [];
}

module.exports = {
  pages,
  dirName: `${pages[0]}-static`
};
