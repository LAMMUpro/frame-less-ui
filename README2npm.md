# frame-less-ui组件库

## 介绍

一个跨`框架`的`轻量`前端`ui组件库`

### 特性

- ✅ 无框架绑定, html原生支持, 所以也支持Vue2/Vue3/React/Angular/JQuery等框架...
- 🧙‍ 组件按需导入、按需加载
- 🔋 核心依赖可复用
- 🐎 首次加载快, 只加载button只需加载(20 + 10)kb依赖
- 🍃 vitepress文档
- 🐻 xxx
- 🥃 xxx
- ⚡️ xxx
- 👀 xxx

## 快速开始

安装依赖
```SH
yarn add frame-less-ui
```

tsconfig.json
```json
{
  "compilerOptions": {
    "types": [
      "frame-less-ui/global.d.ts"
    ],
  }
}
```

全局注册
```tsx
// 入口文件，如main.ts
// frame-less-ui组件全局注册
import 'frame-less-ui';
```

vite.config.ts
```tsx

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将micro-app-前缀的标签名都视为自定义元素
          isCustomElement: (tag) => tag.startsWith('fl-'),
        },
      },
    }),
  ]
})
```
