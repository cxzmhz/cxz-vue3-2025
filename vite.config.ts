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
import Critters from 'critters';

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
    // 内联字体
    {
      name: 'critters-inline',
      transformIndexHtml(html) {
        const critter = new Critters({
          inlineFonts: true,
          preload: 'swap',
          pruneSource: true,
        });
        return critter.process(html);
      },
    },
    // visualizer({ open: true }), // 自动打开分析页面
    // chunkSplitPlugin({
    //   strategy: 'single-vendor', // 默认策略
    //   customChunk: (args) => {
    //     const [file, id, moduleId, root] = args;
    //     // 根据文件路径或大小自定义拆分规则
    //     if (file.endsWith('.js') && file.includes('node_modules')) {
    //       return 'vendors'; // 拆分到 vendors chunk
    //     }
    //     return null;
    //   },
    //   customSplitting: {
    //     // 根据文件大小拆分示例（需结合 Rollup 配置）
    //     'large-chunk': [/src\/large-module/], // 拆分特定路径的模块
    //   }
    // })
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
  // 静态资源处理
  assetsInclude: ['**/*.gltf', '**/*.glb'], // 用于 ​​定义 Vite 应视为静态资源的文件类型，​​默认情况下，Vite 已内置常见资源类型（如 .png, .jpg, .svg），但若项目中需要处理非标准文件（如 .csv, .xml）时，需通过此配置显式声明
  build: {
    target: 'esnext', // 使用现代浏览器的最新语法
    sourcemap: true,
    minify: 'esbuild', // 默认是esbuild，terser能够提供更高的压缩比，而esbuild压缩速度更快
    assetsInlineLimit: 4096, // 小于 4KB 的资源内联为 Base64
    // 可以通过这种方式配置多个html入口
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, 'index.html'),
    //     nested: resolve(__dirname, 'nested/index.html'),
    //   },
    // },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 手动拆分大文件（例如超过50KB）
          if (id.includes('node_modules')) {
            return 'vendors';
          }
          if (id.includes('src/workers/worker.ts')) {
            return 'worker';
          }
        },
        // manualChunks: {
        //   worker: ['./src/workers/worker.ts'],
        // // vue: ['vue', 'vue-router', 'pinia'],
        // // element: ['element-plus'],
        // // axios: ['axios'],
        // // echarts: ['echarts'],
        // // lodash: ['lodash'],
        // // dayjs: ['dayjs'],
        // },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
  optimizeDeps: {
    include: ['axios'], // 强制预构建的依赖
    // force: true, // 强制重新预构建并更新缓存，一般是本地开发依赖包的时候使用（这个时候，依赖包的代码改变了，但是版本号都没有变化），可以直接在vite命令的后面加上--force也能实现一样的效果
  },
});
