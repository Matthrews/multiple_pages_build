# multiple_pages_build

多页面打包实践

## 特性

- 命令式快速添加模板页面

- 区分环境，指定应用`appId`打包

- 代码规范严格管控：ESLint+StyleLint+CommitLint+Husky

- 自带子模块`submodle`

## 常用脚本

_cd 只支持 npm,暂不支持 yarn，工程不维护 yarn.lock_

```bash
# 启动项目
npm start

# 本地打包测试
# 如模拟在CD上打包，则在cd.json的`cdn-path`赋值,例如www.abc.com/${appId}/20201217
npm run build

# 新增页面
npm run add:page

# 移除页面
# 移除add:page添加的页面
# 建议使用此方式移除页面, 此方式会检测测页面在测试站点是否有在使用
# !!! 一般情况下不建议手动从项目中移除
npm run remove:page

# js lint
npm run lint:js

# style lint
npm run lint:css

# analyz build report
npm run analyz

# 新建分支（submodule自动切同名分支）
npm run cb
```

## 目录结构

```bash
   |
   ├──config/                     * 工程配置
   │   │
   │   └──webpack                 * 构建配置
   ├──scripts/                    * 工程脚本
   │   │
   │   └──templates               * 页面模块
   ├──shared-powers/              * 跨端公用服务(submodule)
   │   │
   │   └──services                * 后端接口服务
   ├──src/                        * 主程序
   │   │
   │   │──assets                  * 所有静态资源
   |   │  └──common.less          * 公用less变量
   │   │
   │   └──cache                   * 封装Storage操作
   │   │
   │   └──components              * 跨页面的UI和业务组件
   │   │  │
   │   │  └──buz                  * 业务组件
   │   │  └──ui                   * UI组件(待抽取)
   │   │
   │   └──contstant               * 所有页面常量配置
   │   │
   │   └──pages                   * 所有页面
   │   │
   │   └──utils                   * 封装的工具
   │
   │──babel.config.js             * babel 配置
   │
   │──eslintrc.js                 * eslint配置
   │
   │──.gitmodules                 * submodule配置
   |
   │──cd.json                     * cd系统cdn发布配置
   │
   │──stylelintrc.js            * stylelint配置
   │
   │──commitlint.config.js        * commitlint配置
   │
   │──postcss.config.js           * postcss配置
   │
   └──tsconfig.json                 * tslint 配置
```

## 统一的错误承接页面 `/error-page.html`

页面参数:

|   name    |  defalut   | required |                   remark                   |
| :-------: | :--------: | :------: | :----------------------------------------: |
|   title   |  `出错了`  |    否    |                Navbar 标题                 |
|   info    |     -      |    否    |              异常主要说明文案              |
|   desc    |     -      |    否    |              异常次要说明文案              |
|  btnText  | `刷新试试` |    否    |                  按钮文案                  |
| actionUrl |     -      |    否    | 有的话，重定向到指定链接，否则退出 webview |

---

错误类型统计详见 [src/pages/error-page/README.md](./src/pages/error-page/README.md)

<br/>

# 备注

- submodule 的 URL 地址须为`ssh`地址，http(s)的地址 CI 打包的时候会报错，因为 jenkins 上 git 是 ssh 认证授权的。
