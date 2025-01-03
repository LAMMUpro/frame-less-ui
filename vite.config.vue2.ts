import { fileURLToPath, URL } from 'node:url'
import * as fs from 'fs';
import path from "path";
import { defineConfig } from 'vite'
// import legacy from '@vitejs/plugin-legacy'
import vue2Plugin from 'vitejs-plugin-vue2fless'
// import vue2Plugin from '@vitejs/plugin-vue2'

// import vue2Jsx from '@vitejs/plugin-vue2-jsx'

import { resolve } from 'path'

const outputDir = '';

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
  fs.readdirSync('./npm/esm/components')
    .filter(item => fs.statSync(path.join('./npm/esm/components', item)).isDirectory())
    .forEach(componentName => {
      
      /** 存在组件入口文件/npm/esm/components/${componentName}/index.ts */
      if (fs.existsSync(path.join('./npm/esm/components', componentName, 'index.js'))) {
        // entryFiles[`components/${componentName}/index`] = `./src/components/${componentName}/index.ts`;
        // /** 存在vue3入口文件/src/components/${componentName}/wrap.vue3.vue */
        // if (fs.existsSync(path.join('./src/components', componentName, 'wrap.vue3.vue'))) {
        //   entryFiles[`components/${componentName}/vue3`] = `./src/components/${componentName}/wrap.vue3.vue`;
        // }
        // /** 存在react入口文件/src/components/${componentName}/wrap.react.vue */
        // if (fs.existsSync(path.join('./src/components', componentName, 'wrap.react.tsx'))) {
        //   entryFiles[`components/${componentName}/react`] = `./src/components/${componentName}/wrap.react.tsx`;
        // }
        /** 存在vue2入口文件/src/components/${componentName}/wrap.vue2.vue */
        if (fs.existsSync(path.join('./npm/esm/components', componentName, 'wrap.vue2.vue'))) {
          console.log('componentName', componentName)
          entryFiles[`components/${componentName}/vue2`] = `./npm/esm/components/${componentName}/wrap.vue2.vue`;
        }
      } else {
        console.warn('>>>', '组件入口文件不存在', `./src/components/${componentName}/index.ts`);
      }
    })
})();

console.log('entryFiles', entryFiles)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2Plugin({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('fl-')
            // && !tag.endsWith('-v3')
            // && !tag.endsWith('-v2')
            // && !tag.endsWith('-react')
        }
      },
    }),
    // vue2Jsx(),
    // legacy({
    //   targets: ['ie >= 11'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    // })
    {
      name: 'delete-vue2-after-finish',
      closeBundle() {
        const compNameList = fs.readdirSync('./npm/esm/components/').filter(fileName => fs.statSync(path.join('./npm/esm/components', fileName)).isDirectory());
        /** 复制wrap.vue2.vue */
        compNameList.forEach(compName => {
          const vue2File = path.resolve(__dirname, `./npm/esm/components/${compName}/wrap.vue2.vue`);
          if (fs.existsSync(vue2File)) {
            fs.rmSync(vue2File);
          }
        })
      }
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'npm/esm'),
    },
  },
  build: {
    emptyOutDir: false,
    // sourcemap: true,
    lib: {
      /**
       * 如果不配这里，各组件的wrap.react.tsx/wrap.vue3.vue/wrap.vue2.vue不会被打包
       * 但这里只需要一个空的入口文件???
       */
      entry: path.resolve(__dirname, 'npm/esm/index.js'),
      formats: ['es'],
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
      input: entryFiles,
      output: {
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

      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue3fless', 'vue2', 'vue2fless', 'react']
    }
  }
})