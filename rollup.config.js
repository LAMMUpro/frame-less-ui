import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";
import { InlineScssPlugin } from './InlineScssPlugin.js';
import * as fs from 'fs';
import path from "path";

export default [
  {
    input: Object.fromEntries(
      fs.readdirSync('./src/components')
        .filter(item => fs.statSync(path.join('./src/components', item)).isDirectory())
        .map(componentName => [
          `${componentName}`,
          `./src/components/${componentName}/index.tsx`
        ])
    ), // { "wc-counter": "./src/components/wc-counter/index.tsx" },
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: "cp/[name].js",
      chunkFileNames: "chunks/chunk.[hash].js",
      manualChunks: {
        /** 需要分包 */
        preact: ["preact"], // 将 preact 相关库打包成单独的 chunk 中
      },
    },
    plugins: [
      InlineScssPlugin({
        include: /\.tsx$/,
        exclude: /node_modules/,
      }),
      resolve(), 
      commonjs(), 
      typescript(), 
      terser(), 
      cleanup()
    ],
    /** 不打包这些文件 */
    external: ["inquirer"],
  },
];
