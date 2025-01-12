# frame-less-ui组件库

<p align="center">
  <a href="https://www.npmjs.org/package/frame-less-ui">
    <img src="https://img.shields.io/npm/v/frame-less-ui.svg" />
  </a>
  <a href="https://github.com/frame-less-ui/frame-less-ui">
    <img src="https://img.shields.io/badge/node-%20%3E=%2016-47c219" />
  </a>
  <a href="https://npmcharts.com/compare/frame-less-ui?minimal=true">
    <img src="https://img.shields.io/npm/dm/frame-less-ui.svg" />
  </a>
  <br>
</p>

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

## 参与开发

环境要求
```sh
node版本: `node`v16.18.0

包管理器: `yarn`v1.22.19

内置vue版本： 3.5.1以上!
```

```sh
# 获取项目
git clone https://github.com/LAMMUpro/frame-less-ui.git
# 进入项目目录
cd ./frame-less-ui
# 安装yarn, 如果没有的话
npm i -g yarn
# 安装依赖
yarn
# 调试项目
yarn dev
# 调试文档
yarn docs
# 打包
yarn build:all
```

## 常用链接

**[组件调试(html/react/vue)](http://localhost:5173/src/components/input/demo/index.html) input组件调试👈**

**[组件文档👈](http://localhost:5151/) 需先运行`yarn docs`**

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
        - index.html # 组件测试 （yarn vite后访问 http://localhost:5173/src/components/input/demo/index.html）
        - index.tsx # 组件测试（react环境）
        - index.vue # 组件测试（vue环境）
      - index.ce.vue # vue组件源码
      - index.ts # 组件打包入口文件（注册自定义组件）
      - utils.ts # 组件工具
      - wrap.react.tsx # react包装用法
      - wrap.vue2.tsx # vue2包装用法
      - wrap.vue3.tsx # vue3包装用法
  - global.d.ts # 注册组件ts类型（vue3）
package2npm.json # 发布到npm的package.json
vite.config.ts # vite配置(用于打包组件库/wrap.vue3/wrap.react)
vite.config.vue2.ts # vite配置(用于打包wrap.vue2)
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
```sh
// 需切换到此目录下才能发
cd ./npm
// 切换回官方镜像源
npm config set registry https://registry.npmjs.com
// 如果失败需要先登录npm login
npm publish --access=public
// 切换为淘宝镜像
npm config set registry https://registry.npmmirror.com
```

## 常见问题
1. 使用`import styles from './index.module.scss';`的语法会导致在`/dist/assets/`下生成`.css资源，由于没有.html入口，所以这个资源目前是用不到的`

2. web component需要从shadow dom外引入@font-face
> 例如字体图标的iconfont.css需要把@font-face提到单独的font-face.css
