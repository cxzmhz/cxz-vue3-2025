import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import viteCompression from 'vite-plugin-compression'; // 用于 gzip 压缩
// 以下的3个插件是element-plus的按需引入使用，
// 其中AutoImport和Components都是处理自动导入的，只不过AutoImport是用来导入api的，如vue的api: ref reactive等，Components是用来处理自动导入vue的组件的，如el-button等组件，支持按需导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// import { visualizer } from 'rollup-plugin-visualizer';// 用于分析打包后的代码

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
    // visualizer({ open: true }), // 自动打开分析页面
  ],
  // 开发服务器配置
  server: {
    host: '0.0.0.0',
    port: 3000, // 指定开发服务器端口
    // open: true, // 自动打开浏览器
    // 这个接口不用代理也能访问
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
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          worker: ['./src/workers/worker.ts'],
          // vue: ['vue', 'vue-router', 'pinia'],
          // element: ['element-plus'],
          // axios: ['axios'],
          // echarts: ['echarts'],
          // lodash: ['lodash'],
          // dayjs: ['dayjs'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
  // optimizeDeps: {
  //   force: true, // 强制重新预构建并更新缓存，一般是本地开发依赖包的时候使用（这个时候，依赖包的代码改变了，但是版本号都没有变化），可以直接在vite命令的后面加上--force也能实现一样的效果
  // },
});
