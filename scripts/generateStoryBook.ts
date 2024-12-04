import fs from "fs";
import path from "path";
import { toPascalCase } from "../src/utils/index.ts";
import { SB } from "../src/types/storybook.ts";

/** 组件文件夹路径 */
const componentDir = "./src/components";

/** 组件名列表 */
const componentNameList = fs.readdirSync(componentDir);

/** 组件信息列表 */
const componentInfoList: Array<SB.AutoMeta> = componentNameList
  .map((name) => {
    /** 是否存在ts入口文件 */
    const indexTsFile = path.resolve(componentDir, name, "index.ts");
    // /** 是否存在tsx入口文件 */
    // const indexTsxFile = path.resolve(componentDir, name, "index.tsx");
    // /** 是否是lit组件 */
    // const isLitComponent = fs.existsSync(indexTsFile);
    // /** 是否是preact组件 */
    // const isPreactComponent = fs.existsSync(indexTsxFile);
    /** 生成的meta信息对象 */
    const autoMeta: SB.AutoMeta = {
      componentName: name,
      isAbnormal: false,
      frame: "vue3",
      tableInfo: {
        props: [],
        events: [],
        methods: [],
        slots: [],
        cssvars: [],
        parts: [],
      }
    };
    /** 异常检测 */
    if (!fs.existsSync(indexTsFile)) {
      console.log(`组件${name}异常: 找不到入口文件`);
      autoMeta.isAbnormal = true;
      return autoMeta;
    }
    /** 组件入口文件 */
    // const entryFile = indexTsFile;
    /** 组件源代码 */
    // const originCode = fs.readFileSync(entryFile, "utf-8");
    /** 组件入口文件ast获取元数据 */
    // if (isLitComponent) {
    //   const astTree = ts.createSourceFile('temp.ts', originCode, ts.ScriptTarget.ES2015);
    //   getComponentDocsInfo(autoMeta, astTree, originCode);
    // } else {

    // }
    return autoMeta;
  })
  /** 过滤掉异常的组件 */
  .filter((item) => !item.isAbnormal);

/**
 * 循环生成meta.cache.ts、OverView.cache.mdx、react.cache.ts(lit组件)
 */
componentInfoList.forEach(componentInfo => {
  saveMetaFileByComponentInfo(componentInfo);
  saveOverViewMdxFile(componentInfo);
  generateReactWrapFile(componentInfo);
  saveTypeFile(componentInfo);
});

/**
 * 生成meta.cache.ts
 */
function saveMetaFileByComponentInfo(componentInfo: SB.AutoMeta) {
  const filePath = path.resolve(componentDir, componentInfo.componentName, 'meta.cache.ts');
  
  const contents = `import { SB } from "../../types/storybook.ts";

const autoMeta: SB.AutoMeta = ${JSON.stringify(componentInfo, null, 2)};

export default autoMeta;`;
  
  fs.writeFile(filePath, contents, 'utf-8', () => {});
}

/**
 * 生成OverView.cache.ts
 */
function saveOverViewMdxFile(componentInfo: SB.AutoMeta) {
  const filePath = path.resolve(componentDir, componentInfo.componentName, 'OverView.cache.mdx');
  
  let contents: string = `
import { Subtitle, Meta, Stories, Title } from '@storybook/blocks';
import * as ComponentStories from './index.stories';
import AsideLinks from '@sb/AsideLinks.tsx';
import Tables from '@sb/Tables.tsx';
import meta from './meta.cache.ts';

<div style="display:flex;">
  <div style="flex-grow: 1;">
    <Title>{ [ComponentStories.default.component, ComponentStories.default?.subtitle].filter(Boolean).join(' ')}</Title>

    > {ComponentStories.default.description}
    <br/>

    <Meta of={ComponentStories} />

    <Stories />

    <Tables meta={meta}/>
  </div>

  <div style="min-width: 130px;max-width: 160px;">
    <AsideLinks meta={meta}/>
  </div>
</div>
  `;
  
  fs.writeFile(filePath, contents, 'utf-8', () => {});
}


/**
 * lit组件生成react.cache.ts
 */
function generateReactWrapFile(componentInfo: SB.AutoMeta) {
  /** 只有lit组件才包一层 */
  if (componentInfo.frame !== 'lit') return;

  /** 获取类名 */
  const className = toPascalCase(componentInfo.componentName);

  const filePath = path.resolve(componentDir, componentInfo.componentName, 'react.cache.ts');
  
  const events = componentInfo.tableInfo.events || [];

  let contents: string = `
import { createComponent, type EventName } from '@lit/react';
import React from 'react';
import { GlobalConfig } from '@/config';
import { ${className} } from './index';
${
  events.length ?
  `import { ${events.map(event => `on${toPascalCase(event.name)}Detail`)?.join(', ')} } from './type.cache';`
  : ''
}

const events = {
  ${events.map(event => {
    const name_PascalCase = toPascalCase(event.name);
    return `on${name_PascalCase}: '${event.name}' as EventName<CustomEvent<on${name_PascalCase}Detail>>,`
  }).join('/n  ')}
}

const Fl${className} = createComponent({
  tagName: GlobalConfig.componentPrefix + '-${componentInfo.componentName}',
  elementClass: ${className},
  react: React,
  events,
});

export default Fl${className};

export const Fl${className}Sd = createComponent({
  tagName: GlobalConfig.componentPrefix + '-${componentInfo.componentName}-sd',
  elementClass: ${className},
  react: React,
  events,
});
  `;
  
  fs.writeFile(filePath, contents, 'utf-8', () => {});
}

/**
 * lit组件生成type.cache.ts
 */
function saveTypeFile(componentInfo: SB.AutoMeta) {
  /** 只有lit组件才包一层 */
  if (componentInfo.frame !== 'lit') return;

  /** 获取类名 */
  const className = toPascalCase(componentInfo.componentName);

  const filePath = path.resolve(componentDir, componentInfo.componentName, 'type.cache.ts');
  
  const props = componentInfo.tableInfo.props || [];

  const events = componentInfo.tableInfo.events || [];

  let contents: string = `
import { DefineComponent } from 'vue';
import { ${className} } from '.';

${events.map(event => {
  const name_PascalCase = toPascalCase(event.name);
  return `export type on${name_PascalCase}Detail = ${event.argsType || 'any'}`;
}).join('/n')}

/** 
 * for js
 */
declare global {
  interface HTMLElementTagNameMap {
    'fl-${componentInfo.componentName}': ${className};
    'fl-${componentInfo.componentName}-sd': ${className};
  }
}

/**
 * for vue
 */
type Fl${className} = DefineComponent<{
  ${props.map(prop => {
    return `/** ${prop.describe || ''} */\n  ${prop.name}${prop.required?'':'?'}: ${prop.argsType || 'any'}`;
  }).join('\n  ')}
  ${events.map(event => {
    const name_PascalCase = toPascalCase(event.name);
    return `/** ${event.describe || ''} */\n  on${name_PascalCase}?: ({detail}: {detail : on${name_PascalCase}Detail}) => void`;
  }).join('\n  ')}
}>
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    /** 使用大写命名法，可以使大写和小写都生效 */
    'Fl${className}': Fl${className};
    'Fl${className}Sd': Fl${className};
  }
}
`;
  
  fs.writeFile(filePath, contents, 'utf-8', () => {});
}