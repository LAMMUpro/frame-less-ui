import { defineConfig } from 'vitepress';
import themeConfig from './themeConfig.mjs';

/** [docs](https://vitepress.dev/reference/site-config) */
export default defineConfig({
  title: "frame-less-ui",
  description: "跨框架前端组件库",
  srcDir: './src',
  outDir: './build',
  cacheDir: './.vite',
  /** 网页favicon */
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  base: '/fl-docs',
  /** vite相关配置 */
  vite: {
    server: {
      port: 5151,
    },
  },
  /** 路由配置 / 主题配置 */
  themeConfig: themeConfig,
})
