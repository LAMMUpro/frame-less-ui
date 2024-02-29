import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import viteCompression from 'vite-plugin-compression';
import * as fs from 'fs';
import path from "path";

// [vite](https://vitejs.dev/config/)
// [rollup](https://rollupjs.org/configuration-options/)
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    /** 允许127.0.0.1 或者 ipv4访问 */
    host: '0.0.0.0',
    port: 5173,
    /** 默认打开某页面 */
    open: '/src/components/button/index.test.html',
  },
	plugins: [
    preact({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
    /** Gzip配置 */
    viteCompression({
      algorithm: 'gzip', /** 压缩算法 */
      ext: '.gz', /** 生成的文件后缀 */
      threshold: 1024*9, /** 对超过10k的数据压缩 */
      verbose: false, /** 禁止在控制台输出压缩结果 */
      filter: /\.(js|mjs|json|css|html)$/i, /** 对这些文件进行压缩 */
      deleteOriginFile: false /** 是否删除原文件 */
    })
  ],
  build: {
    rollupOptions: {
      /** 动态入口, 动态名称!!! */
      input: Object.fromEntries(
        fs.readdirSync('./src/components')
          .filter(item => fs.statSync(path.join('./src/components', item)).isDirectory())
          .map(componentName => [
            `components/${componentName}`,
            `./src/components/${componentName}/index.tsx`
          ])
      ),
      output: {
        dir: 'dist',
        entryFileNames: "[name].js",
        chunkFileNames: "deps/[name].[hash].js",
        assetFileNames: 'assets/[name]-[hash][extname]',
        /** 分包配置 */
        manualChunks: {
          'preact': ['preact'], // 将 preact 相关库打包成单独的 chunk 中
        },
      },
    }
  }
});
