import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";

export default [
  {
    input: {
      "wc-counter": "./src/components/wc-counter/index.tsx",
    },
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: "components/[name].js",
      chunkFileNames: "chunks/chunk.[hash].esm.js",
      manualChunks: {
        /** 需要分包 */
        preact: ["preact"], // 将 preact 相关库打包成单独的 chunk 中
      },
    },
    plugins: [
      resolve(), 
      commonjs(), 
      typescript(), 
      terser(), 
      cleanup()
    ],
    /** 不打包 */
    external: ["inquirer"],
  },
];
