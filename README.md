## 目录结构
```SH
.storybook # storybook文档配置
demo # 组件预览测试(纯html下测试，需要先将项目打包) ( yarn vite后访问 http://127.0.0.1:5173/demo/html/counter.html )
  - [xxx].html
docs # storybook文档（手动编写）
src
  - components # wc组件
    - wc-[xxx]
      - index.scss # 组件样式
      - index.stories.tsx # 组件storybook文档配置
      - index.test.html # 组件测试 （ yarn vite后访问 http://127.0.0.1:5173/src/components/wc-counter/index.test.html ）
      - index.test.tsx # 组件测试
      - index.tsx # 组件源码
  - types # ts类型
InlineScssPlugin.js # rollup插件，处理.scss?inline导入
rollup.config.js # rollup配置，打包用rollup，本地预览用vite
vite.config.ts # vite配置
```

## 开发规范

- 文件名不要有空格！！！