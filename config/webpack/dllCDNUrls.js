# dllCdnUrls

| name  | origin size | gzip size(dnamic) | remark |
| --- | --- | --- | --- |
| [react](https://statics-lib.zmlearn.com/react/16.13.1/umd/react.production.min.js) | 12.5kB | 5.1kB | - |
| [reactDom](https://statics-lib.zmlearn.com/react-dom/16.13.1/umd/react-dom.production.min.js) | 119kB | 38.3kB | - |
| [zmJSSDk](https://statics-lib.zmlearn.com/zm-jssdk/stable/zm-jssdk.js) | 130kB | 43.3kB | head scipts |
| [tkMonitor](https://web-data.zmlearn.com/config/cLzZtf9PCeYM8KcsoqNBnj/tkMonitor-0.0.1.min.js) | 1.7kB | 1.3kB | head scipts |
| [encryptLib](https://statics-lib.zmlearn.com/zm-qb-encrypt/1.0.0/-_-.2018-09-01.js) | 151kB  | 34.1kB | 加密脚本， 可异步 |
| [encryptKey](https://statics-lib.zmlearn.com/zm-qb-encrypt/1.0.0/_-_.2018-09-01.js) | 508B  | 700B | 解密key，可异步 |
| [katexJS](https://statics-lib.zmlearn.com/katex/0.11.0/katex.min.js) | 256kB  | 68.3kB | 公式渲染库 |
| [katexCSS](https://statics-lib.zmlearn.com/katex/0.11.0/katex.min.css) | 22.1kB  | 3.4kB | 公式渲染样式 |

---

### 有关`gzip`的两点说明
+ 多次压缩相同的内容，压缩后的大小并不是每次都一样， 依赖于在压缩时的顺序，顺序变了，大小较之前也会变。
+ 一个资源经压缩后未必一定会变小，很小的文件因为在压缩包里写入字段文件，反而变大了。
