import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import * as fs from 'fs';
import path from "path";
import vue from '@vitejs/plugin-vue';

/** 
 * yarn vite启动时生成一个缓存文件存组件列表
 */
(function createCacheFile() {
  const file = './node_modules/.cache/data.js';
  fs.writeFileSync(file, `export const componentNameList = ${JSON.stringify(fs.readdirSync('./src/components/'))};`);
})();

/** 输出模式 */
const outputMode: 'react' | 'js' | 'vue' = process.env.output as any || 'js';
/** 输出路径前缀 */
const outputDir = outputMode === 'js' ? '' : `${outputMode}/`;

// [vite](https://vitejs.dev/config/)
// [rollup](https://rollupjs.org/configuration-options/)
export default defineConfig({
  resolve: {
    alias: {
      '@sb': path.resolve(__dirname, '.storybook'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  server: {
    /** 允许127.0.0.1 或者 ipv4访问 */
    host: '0.0.0.0',
    port: 5173,
    /** 默认打开某页面 */
    open: '/src/components/qr-code/demo/index.html',
  },
	plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }),
    // /** Gzip配置 */
    // viteCompression({
    //   algorithm: 'gzip', /** 压缩算法 */
    //   ext: '.gz', /** 生成的文件后缀 */
    //   threshold: 1024*9, /** 对超过10k的数据压缩 */
    //   verbose: false, /** 禁止在控制台输出压缩结果 */
    //   filter: /\.(js|mjs|json|css|html)$/i, /** 对这些文件进行压缩 */
    //   deleteOriginFile: false /** 是否删除原文件 */
    // })
  ],
  build: {
    rollupOptions: {
      /** 动态入口, 动态名称!!! */
      input: Object.fromEntries(
        fs.readdirSync('./src/components')
          .filter(item => fs.statSync(path.join('./src/components', item)).isDirectory())
          .map(componentName => {
            return [
              `components/${componentName}`,
              `./src/components/${componentName}/index.ts`
            ]
          }).filter(item => item.length).filter(item => {
            const exist = fs.existsSync(item[1]);
            if (!exist) console.warn('>>>', '组件入口文件不存在', item[1]);
            return exist;
          })
      ),
      output: {
        dir: 'dist',
        entryFileNames: outputDir + "[name].js",
        chunkFileNames: outputDir + "deps/[name].[hash].js",
        assetFileNames: outputDir + 'assets/[name]-[hash][extname]',
        /** 分包配置 */
        manualChunks: {},
      },
      external: ['vue']
    }
  }
});
