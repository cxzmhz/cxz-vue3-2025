/* eslint "@typescript-eslint/no-require-imports": "off"  */
const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
// const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(morgan('tiny'));

// 企微页面进入客户详情页面，进行参数拦截
// app.get('/h5-v1/wcc/customer/detail', filterCustomerPageFrom);

app.use('/', express.static(path.resolve(__dirname, './dist/'), {}));
// app.use('/h5-v1/', express.static(path.resolve(__dirname, './static/'), {}));
// app.use('/h5-v1/wfw/', (req, res) => {
//   const html = fs.readFileSync(path.resolve(__dirname, './dist/h5-v1/wfw/index.html')).toString();
//   res.type('html');
//   res.send(html);
// });

// vite的原理
// app.get('/*.js', (req, res) => {
//   const reqPath = req.path;
//   const file = fs.readFileSync(path.resolve(__dirname, `.${reqPath}`), 'utf-8');
//   // 在这中间对代码处理
//   // 编译
//   // 插件处理
//   // esbuild 做编译
//   // swc 做编译
//   // rollup 做编译

//   // 产物处理
//   // 产物压缩
//   // 产物混淆

//   res.type('js');
//   res.send(file);
// });

app.use('/', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html')).toString();
  res.type('html');
  res.send(html);
});

// app.use('/joy', createProxyMiddleware({
//   // target: 'http://joydev.cd74ca19ae1504568b033139317176752.cn-shenzhen.alicontainer.com/', // 开发环境
//   target: 'http://10.79.21.128:9201/', // 测试环境
//   changeOrigin: true,
//   pathRewrite: path => path.replace(/^\/joy/, ''),
// }));

app.listen(3000, '0.0.0.0', () => {
  console.log('已启动本地web服务器，端口3000，直接访问 http://localhost:3000/');
});
