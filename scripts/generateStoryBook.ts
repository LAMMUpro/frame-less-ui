import fs from "fs";
import path from "path";
import ts from 'typescript';
import { toCamelCase } from "../src/utils/index.ts";
import { SB } from "../src/types/storybook.ts";
import { getComponentDocsInfo } from '../src/utils/storybook.ts';

/** 组件文件夹路径 */
const componentDir = "./src/components";

/** 组件名列表 */
const componentNameList = fs.readdirSync(componentDir);

/** 组件信息列表 */
const componentInfoList: Array<SB.AutoMeta> = componentNameList
  .map((name) => {
    /** 是否存在ts入口文件 */
    const indexTsFile = path.resolve(componentDir, name, "index.ts");
    /** 是否存在tsx入口文件 */
    const indexTsxFile = path.resolve(componentDir, name, "index.tsx");
    /** 是否是lit组件 */
    const isLitComponent = fs.existsSync(indexTsFile);
    /** 是否是preact组件 */
    const isPreactComponent = fs.existsSync(indexTsxFile);
    /** 生成的meta信息对象 */
    const autoMeta: SB.AutoMeta = {
      componentName: name,
      isAbnormal: false,
      frame: isPreactComponent ? "preact" : "lit",
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
    if (!isLitComponent && !isPreactComponent) {
      console.log(`组件${name}异常: 找不到入口文件`);
      autoMeta.isAbnormal = true;
      return autoMeta;
    }
    /** 组件入口文件 */
    const entryFile = isPreactComponent ? indexTsxFile : indexTsFile;
    /** 组件源代码 */
    const originCode = fs.readFileSync(entryFile, "utf-8");
    /** 组件入口文件ast获取元数据 */
    if (isLitComponent) {
      const astTree = ts.createSourceFile('temp.ts', originCode, ts.ScriptTarget.ES2015);
      getComponentDocsInfo(autoMeta, astTree);
    } else {
      // TODO preact组件
    }
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
});

/**
 * 生成meta.cache.ts
 */
function saveMetaFileByComponentInfo(componentInfo: SB.AutoMeta) {
  const filePath = path.resolve(componentDir, componentInfo.componentName, 'meta.cache.ts');
  
  let contents: string = `import { SB } from "../../types/storybook.ts";

const autoMeta: SB.AutoMeta = {
  componentName: '',
  subtitle: '',
  description: '',
  tableInfo:{}
};
  `;
  Object.keys(componentInfo.tableInfo).forEach(key => {
    contents += `
autoMeta.tableInfo.${key} = ${JSON.stringify(componentInfo.tableInfo[key])};
    `;
  })
  contents += '\nexport default autoMeta;';
  
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
    <Title>{ComponentStories.default.component}</Title>

    {
      ComponentStories.default?.subtitle && <Subtitle>{ComponentStories.default.subtitle}</Subtitle>
    }

    > {ComponentStories.default.description}
    <br/>

    <Meta of={ComponentStories} />

    <Stories />

    <Tables meta={meta}/>
  </div>

  <div style="min-width: 150px;">
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
  const className = toCamelCase(componentInfo.componentName[0].toUpperCase() + componentInfo.componentName.slice(1));

  const filePath = path.resolve(componentDir, componentInfo.componentName, 'react.cache.ts');
  
  let contents: string = `
import { createComponent, type EventName } from '@lit/react';
import React from 'react';
import { GlobalConfig } from '@/config';
import { ${className} } from './index';

const Fl${className} = createComponent({
  tagName: GlobalConfig.componentPrefix + '-${componentInfo.componentName}',
  elementClass: ${className},
  react: React,
  events: {
    onSuccess: 'success' as EventName<CustomEvent<{ list: any[] }>>,
  },
});

export default Fl${className};
  `;
  
  fs.writeFile(filePath, contents, 'utf-8', () => {});
}
