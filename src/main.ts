import './assets/main.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
// 当 Vite 加载动态导入失败时，会触发 vite:preloadError 事件，比如生产重新部署的时候，因为资源都更新了，旧页面无法加载到旧的资源，就会触发这个错误
window.addEventListener('vite:preloadError', () => {
  window.location.reload(); // 例如，刷新页面
});
