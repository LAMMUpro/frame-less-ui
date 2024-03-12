import { toCamelCase } from "../src/utils/index.ts";
import { DocInfo, DocType, docTypes } from "../src/types/storybook.ts";
import fs from "fs";
import path from "path";

const componentDir = "./src/components";

interface ComponentInfo {
  /** 组件名 */
  name: string;
  /** 是否异常 */
  isAbnormal: boolean;
  /** 框架 */
  frame?: "lit" | "preact";
  /** 组件源码 */
  originCode?: string;
  tableInfo?: {
    props?: Array<DocInfo>;
    events?: Array<DocInfo>;
    methods?: Array<DocInfo>;
    slots?: Array<DocInfo>;
    cssvars?: Array<DocInfo>;
    parts?: Array<DocInfo>;
  }
}

const componentsName = fs.readdirSync(componentDir);

/** 多行注释匹配 */
const jsDocBlockReg = /\/\*\*\s*?((\r\n)|[\r\n]) (\s*?\*.*?((\r\n)|[\r\n]))*? \s*?\*\//g;

const componentInfoList: Array<ComponentInfo> = componentsName
  .map((name) => {
    /**
     * 是否存在入口文件 index.ts - lit组件 / index.tsx - preact组件
     */
    const indexTsFile = path.resolve(componentDir, name, "index.ts");
    const indexTsxFile = path.resolve(componentDir, name, "index.tsx");
    const isLitComponent = fs.existsSync(indexTsFile);
    const isPreactComponent = fs.existsSync(indexTsxFile);
    if (!isLitComponent && !isPreactComponent) {
      console.log(`组件${name}异常: 找不到入口文件`);
      return {
        name,
        isAbnormal: true,
      };
    }

    /** 入口文件 */
    const entryFile = isPreactComponent ? indexTsxFile : indexTsFile;

    const originCode = fs.readFileSync(entryFile, "utf-8");

    const props: Array<DocInfo> = [];
    const events: Array<DocInfo> = [];
    const methods: Array<DocInfo> = [];
    const slots: Array<DocInfo> = [];
    const cssvars: Array<DocInfo> = [];
    const parts: Array<DocInfo> = [];

    const match = originCode.match(jsDocBlockReg);
    if (match) {
      match.forEach((doc) => {
        if (/@(prop|event|method|slot|cssvar|part)/.test(doc)) {
          const content = clearX(doc);
          for (let i = 0; i < docTypes.length; i++) {
            const type = docTypes[i];
            if (content.includes(`@${type}`)) {
              ({
                'prop': props,
                'event': events,
                'method': methods,
                'slot': slots,
                'cssvar': cssvars,
                'part': parts,
              })[type]?.push(parseTableData(content, type));
              break;
            }
          }
        }
      });
    }

    const frame: ComponentInfo['frame']  = isPreactComponent ? "preact" : "lit";

    return {
      name,
      isAbnormal: false,
      frame,
      originCode,
      tableInfo: {
        props,
        events,
        methods,
        slots,
        cssvars,
        parts,
      }
    };
  })
  .filter((item) => !item.isAbnormal);

componentInfoList.forEach(componentInfo => {
  saveMetaFileByComponentInfo(componentInfo);
  saveOverViewMdxFile(componentInfo);
  generateReactWrapFile(componentInfo);
});

/**
 * 生成meta.cache.ts
 */
function saveMetaFileByComponentInfo(componentInfo: ComponentInfo) {
  const filePath = path.resolve(componentDir, componentInfo.name, 'meta.cache.ts');
  
  let contents: string = `import { AutoMeta } from "../../types/storybook.ts";

const autoMeta: AutoMeta = {
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
function saveOverViewMdxFile(componentInfo: ComponentInfo) {
  const filePath = path.resolve(componentDir, componentInfo.name, 'OverView.cache.mdx');
  
  let contents: string = `
import { Subtitle, Meta, Stories, Title, ArgTypes } from '@storybook/blocks';
import * as ComponentStories from './index.stories';
import AsideLinks from '@sb/AsideLinks.tsx';
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

    <ArgTypes of={ComponentStories} />
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
function generateReactWrapFile(componentInfo: ComponentInfo) {
  console.log(componentInfo)
  /** 只有lit组件才包一层 */
  if (componentInfo.frame !== 'lit') return;

  /** 获取类名 */
  const className = toCamelCase(componentInfo.name[0].toUpperCase() + componentInfo.name.slice(1));

  const filePath = path.resolve(componentDir, componentInfo.name, 'react.cache.ts');
  
  let contents: string = `
import { createComponent, type EventName } from '@lit/react';
import React from 'react';
import { GlobalConfig } from '@/config';
import { ${className} } from './index';

const Fl${className} = createComponent({
  tagName: GlobalConfig.componentPrefix + '-${componentInfo.name}',
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

/** 去除注释到星号, 多余换行等 */
function clearX(doc: string) {
  return (
    doc
      /** 去除 * 号 */
      .replaceAll(/^[^\S\r\n]*?(\/\*\*|\*\/|\*)[^\S\r\n]*/gm, "")
      /** 去除 首行换行符 */
      .replace(/^[^\S\r\n]*?\n[^\S\r\n]*/, "")
      /** 去除 尾行换行符 */
      .replace(/[^\S\r\n]*\n[^\S\r\n]*?$/, "")
  );
}

function parseTableData(str: string, type: DocType) {
  const result: DocInfo = {
    name: "",
  };
  // 通过正则表达式匹配事件、描述和详情
  const regex = /@(\w+)\s*(.*?)(?=@\w+|\s*$)/gs;
  let match;
  while ((match = regex.exec(str)) !== null) {
    const [, key, value] = match;
    if (key === type) {
      result.name = value.trim();
    } else {
      result[key] = value.trim();
    }
  }
  return result;
}
