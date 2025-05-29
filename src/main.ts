import './assets/main.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.config.errorHandler = (err) => {
  console.log('..........err', err);
};

app.mount('#app');
// 当 Vite 加载动态导入失败时，会触发 vite:preloadError 事件，比如生产重新部署的时候，因为资源都更新了，旧页面无法加载到旧的资源，就会触发这个错误
window.addEventListener('vite:preloadError', () => {
  window.location.reload(); // 例如，刷新页面
});
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('..........entry', entry);
    // if (entry.name === 'first-paint') {
    //   console.log('FP:', entry.startTime); // 首次绘制时间
    // }
    // if (entry.name === 'first-contentful-paint') {
    //   console.log('FCP:', entry.startTime); // 首次内容绘制时间
    // }
  });
});
observer.observe({ entryTypes: ['paint'], buffered: true });

const lcpObserver = new PerformanceObserver((list) => {
  console.log('...list', list);
  // const entries = list.getEntries();
  // const lcpEntry = entries[entries.length - 1]; // 最后一个元素为最终LCP[4](@ref)
  // console.log('LCP元素:', entries);
});
lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

// let clsValue = 0;
const clsObserver = new PerformanceObserver((list) => {
  console.log('...list', list);
  // list.getEntries().forEach((entry) => {
  //   if (!entry.hadRecentInput) {
  //     // 排除用户交互导致的偏移[5](@ref)
  //     clsValue += entry.value;
  //   }
  // });
  // console.log('.........clsValue', clsValue);
});
clsObserver.observe({ type: 'layout-shift', buffered: true });

const resourceObserver = new PerformanceObserver((list) => {
  console.log('...list', list);
  // list.getEntries().forEach((entry) => {
  //   console.log('.......entry', entry, entry.responseEnd - entry.startTime);
  // });
});

// resourceObserver.observe({ entryTypes: ['resource'], buffered: true });
resourceObserver.observe({ type: 'resource', buffered: true });
