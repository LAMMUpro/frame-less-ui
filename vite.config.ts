import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import viteCompression from 'vite-plugin-compression';
import * as fs from 'fs';
import path from "path";

// [vite](https://vitejs.dev/config/)
// [rollup](https://rollupjs.org/configuration-options/)
export default defineConfig({
	plugins: [
    preact(),
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
      input: [
        ...(
          fs.readdirSync('./src/components')
            .filter(item => /^wc-[a-z].*?$/.test(item))
            .map(filename => path.resolve('./src/components', filename, './index.tsx'))
        )
      ],
      output: {
        dir: 'dist',
        assetFileNames: 'assets/[name]-[hash][extname]',
        /** 分包配置 */
        manualChunks: {
          'preact': ['preact'], // 将 preact 相关库打包成单独的 chunk 中
        },
      },
    }
  }
});
