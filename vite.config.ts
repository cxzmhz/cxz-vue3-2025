import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import viteCompression from 'vite-plugin-compression'; // 用于 gzip 压缩

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      algorithm: 'gzip', // 使用 gzip 压缩
      threshold: 10240, // 超过 10KB 的文件才会压缩
      ext: '.gz', // 压缩文件的扩展名
    }),
    vueJsx(),
    vueDevTools(),
  ],
  // 开发服务器配置
  server: {
    port: 3000, // 指定开发服务器端口
    open: true, // 自动打开浏览器
    hmr: {
      overlay: false, // 禁用错误的全屏覆盖提示
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
