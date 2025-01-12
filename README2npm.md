# frame-less-ui组件库

## 介绍

一个跨`框架`的前端`业务组件库`, 支持原生/vue3/vue2/react.

### 特性

- 🐻 web component原生支持, 天然跨框架
- ⚡️ 组件使用vue3语法开发, 学习成本低
- ✅ vue3/vue2/react定制化用法, 更符合潮流
- 🧙‍ 组件按需导入、按需加载
- 🔋 核心依赖可复用
- 🍃 vitepress文档
- 🥃 xxx
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
// vue3
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

使用
```tsx
<fl-button>普通按钮</fl-button>
```
