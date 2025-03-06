import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import viteCompression from 'vite-plugin-compression'; // 用于 gzip 压缩
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

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
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // 开发服务器配置
  server: {
    host: '0.0.0.0',
    port: 3000, // 指定开发服务器端口
    open: true, // 自动打开浏览器
    proxy: {
      '/api': {
        target: 'https://cnodejs.org/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      overlay: false, // 禁用错误的全屏覆盖提示
    },
  },
  build: {},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // optimizeDeps: {
  //   force: true, // 强制重新预构建并更新缓存，一般是本地开发依赖包的时候使用（这个时候，依赖包的代码改变了，但是版本号都没有变化），可以直接在vite命令的后面加上--force也能实现一样的效果
  // },
});
