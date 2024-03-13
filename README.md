# FrameLessUI

## 介绍

一个跨`框架`的`轻量`前端`ui组件库`

### 特性

- ✅ 无框架绑定, html原生支持, 所以也支持Vue2/Vue3/React/Angular/JQuery等框架...
- 🧙‍ 组件按需导入、按需加载
- 🔋 核心依赖非常小(gzip后约20kb, 每个组件大约10kb)
- 🐎 首次加载快, 只加载button只需加载(20 + 10)kb依赖
- 🍃 storybook在线文档调试
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

**xxxx**

```sh
git clone https://github.com/LAMMUpro/xxx.git

cd ./xxx

# 配置生效
yarn

# vite启动项目
yarn dev 
# 启动文档项目
yarn storybook 
```

## 常用接口

**[组件调试(html/preact/vue)](http://localhost:5173/src/components/button/index.test.html) button组件调试👈**

**[组件文档👈](http://localhost:6008/) 需先运行`yarn storybook`**

## 默认开发环境

node版本: `node`v16.18.0

包管理器: `yarn`v1.22.19

## 相关技术

基本原理: webcomponent

响应式: preact

打包器: vite

文档系统: storybook


## 目录结构
```SH
.storybook # storybook文档配置
docs # storybook文档（手动编写）
src
  - components # fl组件
    - fl-[xxx]
      - index.scss # 组件样式
      - index.stories.tsx # 组件storybook文档配置
      - index.test.html # 组件测试 （ yarn vite后访问 http://127.0.0.1:5173/src/components/counter/index.test.html ）
      - index.test.tsx # 组件测试
      - index.tsx # 组件源码
  - types # ts类型
InlineScssPlugin.js # rollup插件，处理.scss?inline导入
rollup.config.js # rollup配置，打包用rollup，本地预览用vite
vite.config.ts # vite配置
```

## 开发规范

- 文件名不要有空格！！！

- 不要直接修改文件名/文件夹名, 应使用`git mv old.vue new.vue`代替

- 文件名, 尽量不要绑定前缀fl-

- 样式统一加fl-前缀, 统一包一层`:host, .flessui-[组件名]` { ... }

- 调试shadow模式下组件, 统一命名`fl-[组件名]-sd`

- 自定义组件的`根`节点(有可能有多个), 都需要加上`fl-cn`属性, 代表`内容节点`的意思, 用于兼容非shadow模式下匹配slot

- 组件实例上挂载了_useShadow变量

- 插槽要传入多个Element节点，需要用一个根节点包裹起来

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

- 1.0.0 - `2024-3-1`
  - 支持lit/preact的方式写组件
  - 支持多种框架调试组件
  - 接入story文档
  - 支持shadow/非shadow初始化组件


## 注

使用`import styles from './index.module.scss';`的语法会导致在`/dist/assets/`下生成`.css资源，由于没有.html入口，所以这个资源目前是用不到的`

## 常见问题

