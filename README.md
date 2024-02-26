## 目录结构
```SH
.storybook # storybook文档配置
demo # 组件预览测试(需要先将项目打包) (yarn vite后访问 http://127.0.0.1:5173/demo/preact/counter.html )
  - html # 纯html下测试
  - preact # preact环境下测试
docs # storybook文档（手动编写）
src
  - components # wc组件
  - types # ts类型
InlineScssPlugin.js # rollup插件，处理.scss?inline导入
rollup.config.js # rollup配置，打包用rollup，本地预览用vite
vite.config.ts # vite配置
```