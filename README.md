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

xxxxxxxxxxxxxxxx

**安装yarn**

```sh
npm i -g yarn
```

**项目调试**

```sh
git clone https://github.com/LAMMUpro/frame-less-ui.git

cd ./frame-less-ui

# 配置生效
yarn

# vite启动项目
yarn dev 

# 启动文档项目
yarn docs 
```

## 常用接口

**[组件调试(html/react/vue)](http://localhost:5173/src/components/button/demo/index.html) button组件调试👈**

**[组件文档👈](http://localhost:6008/) 需先运行`yarn storybook`**

## 默认开发环境

node版本: `node`v16.18.0

包管理器: `yarn`v1.22.19

## 相关技术

基本原理: webcomponent

响应式: vue

打包器: vite

文档系统: vitepress


## 目录结构
```SH
docs # vitepress项目
src
  - components # fl组件
    - [xxx]
      - demo 
        - index.html # 组件测试 （yarn vite后访问 http://127.0.0.1:5173/src/components/counter/demo/index.html）
        - index.tsx # 组件测试（react环境）
        - index.vue # 组件测试（vue环境）
      - index.ce.vue # vue组件源码
      - index.ts # 组件打包入口文件（注册自定义组件）
  - types # ts类型
  - global.d.ts # 注册组件ts类型（vue3）
package2npm.json # 发布到npm的package.json
vite.config.ts # vite配置
```

## 开发规范

- 文件名不要有空格！！！

- 不要直接修改文件名/文件夹名, 应使用`git mv ./old.vue ./new.vue`代替

- 文件名, 尽量不要绑定前缀fl-

## 项目配置

**项目忽略大小写**(项目根目录下运行)

```sh
git config core.ignorecase false # 在项目根目录中执行
```

## 分支说明

`master` - 主分支

`dev` - 开发分支

`x.y.z` - 版本分支

## 更新说明
> 版本详情见storybook文档

- 1.1.0
  - xx
  - xx


## 发版
```tsx
// 切换回官方镜像源
npm config set registry https://registry.npmjs.com
// 如果失败需要先登录npm login
npm publish --access=public
// 切换为淘宝镜像
npm config set registry https://registry.npmmirror.com
```

## 常见问题
使用`import styles from './index.module.scss';`的语法会导致在`/dist/assets/`下生成`.css资源，由于没有.html入口，所以这个资源目前是用不到的`

