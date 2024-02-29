# 

## 介绍

xxxxxxxxxxxxxxxx

### 特性

- ✅ xxx
- 🧙‍xxx
- 🐎 xxx
- 🍃 xxx
- 🐻 xxx

- 🔋xxx
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

**[组件调试(preact环境)](http://localhost:5173/src/components/wc-button/index.test.html) button组件调试👈**

**[组件调试(原生环境)](http://localhost:5173/demo/button.html) button组件调试, 需先运行`yarn build`👈**

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
- 1.1.0
  - xx
  - xx
- 1.0.0
  - xx
  - xx


## 注

使用`import styles from './index.module.scss';`的语法会导致在`/dist/assets/`下生成`.css资源，由于没有.html入口，所以这个资源目前是用不到的`

## 常见问题

