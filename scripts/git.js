const { spawn } = require('child_process');
const inquirer = require('inquirer');
const { info, warn } = require('./log');
function checkoutB(branchName, projectName = '') {
  if (!branchName) {
    warn('请输入分支名')
    return
  }
  return new Promise((resolve, reject) => {
    spawn(
      'git',
      [
        'checkout',
        '-b',
        branchName
      ],
      {
        stdio: 'inherit'
      }
    ).on('close', (code) => {
      if (code == 0) {
        // mark build end
        info(`创建${projectName}-${branchName}分支成功`);
        resolve()
      } else {
        warn(`child process exited with code ${code}`);
        reject()
      }
    });
  })

}
inquirer
  .prompt([
    {
      type: 'input',
      name: 'newBranchName',
      message: '请输入新的分支名:'
    }
  ])
  .then(answers => {
    const branchName = answers.newBranchName
    checkoutB(branchName, 'spider-man').then(() => {
      try {
        process.chdir('./shared-powers');
        checkoutB(branchName, 'shared-powers')
      } catch (err) {
        warn(`chdir: ${err}`);
      }
    })
  })