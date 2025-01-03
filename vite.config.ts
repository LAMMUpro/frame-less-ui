import { defineConfig } from 'vite';
import * as fs from 'fs';
import path from "path";
import vue3Plugin from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
// 产物压缩相关
// import terser from '@rollup/plugin-terser';

/** 
 * yarn vite启动时生成一个缓存文件存组件列表
 */
(function createCacheFile() {
  const cacheDir = './node_modules/.cache';
  const file = `${cacheDir}/data.js`;
  
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  
  fs.writeFileSync(file, `export const componentNameList = ${JSON.stringify(fs.readdirSync('./src/components/'))};`);
})();

/** 输出模式 */
const outputMode: 'react' | 'js' | 'vue' = process.env.output as any || 'js';
/** 输出路径前缀 */
const outputDir = outputMode === 'js' ? '' : `${outputMode}/`;

/**
  * 打包入口文件
  * 扫描/src/components目录下的所有组件, 生成入口文件
  * 规则：
  * 1. components下的目录
  * 2. components下的目录下存在index.ts文件
  * @return { '目标路径': '源路径' } 例如：{'components/button/vue3': `./src/components/button/wrap.vue3.vue`}
  */
const entryFiles: {[key: string]: string} = {};

/** 
 * 找到所有需要打包的文件
 * 包括各个组件的入口文件以及vue3/react包装组件(vue2包装组件不能打包!!!)
 */
(function getEntryFiles() {
  fs.readdirSync('./src/components')
    .filter(item => fs.statSync(path.join('./src/components', item)).isDirectory())
    .forEach(componentName => {
      /** 存在组件入口文件/src/components/${componentName}/index.ts */
      if (fs.existsSync(path.join('./src/components', componentName, 'index.ts'))) {
        entryFiles[`components/${componentName}/index`] = `./src/components/${componentName}/index.ts`;
        /** 存在vue3入口文件/src/components/${componentName}/wrap.vue3.vue */
        if (fs.existsSync(path.join('./src/components', componentName, 'wrap.vue3.vue'))) {
          entryFiles[`components/${componentName}/vue3`] = `./src/components/${componentName}/wrap.vue3.vue`;
        }
        /** 存在react入口文件/src/components/${componentName}/wrap.react.vue */
        if (fs.existsSync(path.join('./src/components', componentName, 'wrap.react.tsx'))) {
          entryFiles[`components/${componentName}/react`] = `./src/components/${componentName}/wrap.react.tsx`;
        }
        // /** 存在vue2入口文件/src/components/${componentName}/wrap.vue2.vue */
        // if (fs.existsSync(path.join('./src/components', componentName, 'wrap.vue2.vue'))) {
        //   entryFiles[`components/${componentName}/vue2`] = `./src/components/${componentName}/wrap.vue2.vue`;
        // }
      } else {
        console.warn('>>>', '组件入口文件不存在', `./src/components/${componentName}/index.ts`);
      }
    })
})();

// [vite](https://vitejs.dev/config/)
// [rollup](https://rollupjs.org/configuration-options/)
export default defineConfig({
  resolve: {
    alias: {
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
    vue3Plugin({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('fl-')
            && !tag.endsWith('-v3')
            && !tag.endsWith('-v2')
            && !tag.endsWith('-react')
        }
      },
      exclude: /wrap\.vue2\.vue/,
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
     * 构建前清理输出目录
     */
    {
      name: 'clean-output',
      buildStart() {
        const npmDir = path.resolve(__dirname, './npm');
        if (fs.existsSync(npmDir)) {
          fs.rmSync(npmDir, { recursive: true });
        }
      }
    },
    /** 
     * 打包后复制文件
     * package.json
     * README.md
     * /components/各组件/wrap.vue2.vue
     * 生成/esm/index.js, /cjs/index.js
     */
    {
      name: 'move-file-after-build',
      closeBundle() {        
        // ./package2npm.json => ./npm/package.json
        fs.writeFileSync(path.resolve(__dirname, './npm/package.json'), fs.readFileSync(path.resolve(__dirname, './package2npm.json'), 'utf-8'));
        // ./README.md => ./npm/README.md
        fs.writeFileSync(path.resolve(__dirname, './npm/README.md'), fs.readFileSync(path.resolve(__dirname, './README2npm.md'), 'utf-8'));
        
        const compNameList = fs.readdirSync('./src/components/').filter(fileName => fs.statSync(path.join('./src/components', fileName)).isDirectory());

        /** 复制wrap.vue2.vue */
        compNameList.forEach(compName => {
          const vue2File = path.resolve(__dirname, `./src/components/${compName}/wrap.vue2.vue`);
          if (fs.existsSync(vue2File)) {
            fs.writeFileSync(path.resolve(__dirname, `./npm/esm/components/${compName}/wrap.vue2.vue`), fs.readFileSync(vue2File, 'utf-8'));
            fs.writeFileSync(path.resolve(__dirname, `./npm/cjs/components/${compName}/wrap.vue2.vue`), fs.readFileSync(vue2File, 'utf-8'));
          }
        })

        /**
         * 生成/esm/index.js, /cjs/index.js
         * import './iconfont/font-face.css';import './components/popover';import './components/qr-code'; 这样的内容到/npm/esm/index.js
         */
        const content = compNameList.reduce((str, compName) => {
          return str + `import './components/${compName}';\n`;
        }, `import './iconfont/font-face.css';\n`)

        fs.writeFileSync(path.resolve(__dirname, './npm/esm/index.js'), content);
        fs.writeFileSync(path.resolve(__dirname, './npm/cjs/index.js'), content);
      }
    },
    // terser(),
  ],
  build: {
    // sourcemap: true,
    lib: {
      /**
       * 如果不配这里，各组件的wrap.react.tsx/wrap.vue3.vue/wrap.vue2.vue不会被打包
       * 但这里只需要一个空的入口文件???
       */
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      // [
      //   // path.resolve(__dirname, 'src/components/entry.vue3.ts'),
      //   path.resolve(__dirname, 'src/components/entry.react.ts')
      // ],
      // // 输出格式
      // formats: ['es'],
      // // 输出文件名
      // fileName: (format) =>
      //   `${format === 'es' ? 'esm' : 'cjs'}/vue3.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      /** 打包入口文件 */
      input: entryFiles,
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
            'vue2': 'vue2fless',
          },
          // plugins: [terser()],
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
            'vue2': 'vue2fless',
          },
          // plugins: [terser()],
        }
      ],
      external: ['vue', 'vue3fless', 'vue2', 'vue2fless', 'react']
    }
  }
});
