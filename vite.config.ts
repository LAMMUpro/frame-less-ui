import { defineConfig } from 'vite';
import * as fs from 'fs';
import path from "path";
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

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
    dts({
      // 指定使用的 tsconfig.json 文件
      tsconfigPath: './tsconfig.json',
      // 是否将 .vue 文件生成 .d.ts 文件
      insertTypesEntry: true,
      // 指定类型声明文件的输出目录
      outDir: 'npm/types',
      // 是否生成类型声明文件的源码映射
      copyDtsFiles: true,
      // 是否生成静态导入的类型声明文件
      staticImport: true,
      // 是否生成打包后的类型声明文件
      afterBuild: (emittedFiles) => {
        // 这里可以添加构建后的处理逻辑
      },
    }),
    /** 
     * 打包后复制文件
     * 复制.npmignore到npm目录下
     */
    {
      name: 'move-npmignore',
      closeBundle() {
        // 读取原始内容
        let content = fs.readFileSync(path.resolve(__dirname, './package2npm.json'), 'utf-8')
        
        // 写入新文件
        fs.writeFileSync(path.resolve(__dirname, './npm/package.json'), content)
      }
    },
  ],
  build: {
    // sourcemap: true,
    // minify: 'terser',
    rollupOptions: {
      /** 动态入口, 动态名称!!! */
      input: {
        'index': './src/components/index.ts',
        ...Object.fromEntries(
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
      },
      output: [
        {
          format: 'esm',
          dir: 'npm/esm',
          entryFileNames: outputDir + "[name].js",
          chunkFileNames: outputDir + "deps/[name].[hash].js",
          assetFileNames: outputDir + 'assets/[name]-[hash][extname]',
          /** 分包配置 */
          manualChunks: {
            'qrcode': ['qrcode'],
          },
          paths: {
            'vue': 'vue3fless',
          },
        },
        {
          format: 'esm',
          dir: 'npm/cjs',
          entryFileNames: outputDir + "[name].js",
          chunkFileNames: outputDir + "deps/[name].[hash].js",
          assetFileNames: outputDir + 'assets/[name]-[hash][extname]',
          /** 分包配置 */
          manualChunks: {
            'qrcode': ['qrcode'],
          },
          paths: {
            'vue': 'vue3fless',
          },
        }
      ],
      external: ['vue', 'vue3fless']
    }
  }
});
