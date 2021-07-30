/**
 * for add page
 * @param pageName
 * @param pageTitle 仅首页入口显示，测试用
 * @param pageAppId 理论上每个业务页面绑定一个appId, 也可复用之前的，具体问题具体分析。
 */

 const inputReg = /^[a-z\-]+$/g; // 小写中划线命名 校验
 const validInput = function(val) {
   if((inputReg.test(val))) {
     return true;
   }
   return 'lowercase letters, can connect with `-`';
 };
 
 module.exports = [
   {
     type: 'input',
     message: 'Please input name of page',
     name: 'pageName',
     validate: validInput,
   },
   {
     type: 'input',
     message: 'Please input title of page(show for home page)',
     name: 'pageTitle',
     validate: function(val) {
       if(val && val.length < 10) {
         return true;
       }
       return 'required and it‘s length < 10 ';
     }
   },
   {
     type: 'input',
     message: 'Please input appId of page',
     name: 'pageAppId',
   },
   {
     type: 'input',
     message: 'Please input subPath of page(qb-webapp-m/${subPath})',
     name: 'subPath',
     validate: validInput,
   }
 ]
 