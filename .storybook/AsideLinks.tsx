import React, { useState } from "react";
import { useEffect } from "react";
import { DocType } from "../src/types/storybook";

enum FontSize {
  'H1' = '28px',
  'H2' = '18px',
  'H3' = '16px',
  'H4' = '14px',
}

/** 修复样式表 */
const styleFix = document.createElement('style');
styleFix.innerText = `
  div.sbdocs-content {
    max-width: 95%;
  }
  div.sbdocs-content>div>div:first-child {
    overflow: hidden;
  }
  table.docblock-table.sb-unstyled {
    margin: 0px 0 20px;
  }
`
document.head.appendChild(styleFix);

/**
 * 生成组件文档标题/属性标副标题, 用于辅助生成侧边栏
 */
function generateDocsH2andPropsH3() {
  const propsTableNode = document.querySelector('table.docblock-argstable');
  if (!propsTableNode) return;
  const docsWrapNode = propsTableNode.parentElement;
  if (!docsWrapNode) return;

  docsWrapNode.classList.add('_doc_')
  /** 添加class: _props_ */
  propsTableNode.classList.add('_props_');
  propsTableNode.classList.add('docblock-table');
  /**
   * 插入标题
   */
  const title = document.createElement('h2');
  title.innerText = '组件文档';
  docsWrapNode.parentNode?.insertBefore(title, docsWrapNode);

  /**
   * 插入副标题
   */
  const subTitle = document.createElement('h3');
  subTitle.innerText = '属性';
  docsWrapNode.insertBefore(subTitle, propsTableNode);
}

/**
 * 生成事件文档
 */
function generateDocsTable(list: Array<{
  /** 名称 */
  name: string
  /** 描述 */
  describe?: string
  /** 详情 */
  detail?: string
  /** 默认值(prop时) */
  default?: string
}>, type: DocType) {
  if (!list.length) return;
  const docsWrapNode = document.getElementsByClassName('_doc_')[0];
  if (!docsWrapNode) return;
  /**
   * 插入副标题
   */
  const subTitle = document.createElement('h3');
  subTitle.innerText =  {
    'prop': '属性',
    'event': '事件',
    'method': '方法',
    'slot': '插槽',
    'cssvar': 'css变量',
    'part': 'shadow part',
  }[type];
  docsWrapNode.appendChild(subTitle);

  /** table第三列列名 */
  const column3name = {
    'prop': 'Default',
    'event': 'Event Params',
    'method': 'Method Params',
    'slot': '',
    'cssvar': 'Var Type',
    'part': '',
  }[type];
  
  /**
   * 构造table
   */
  const tableNode = document.createElement('table');
  tableNode.className = `docblock-table docblock-${type}stable sb-unstyled css-v2ifgj _${type}s_`;
  tableNode.innerHTML = `
  <thead class="docblock-${type}stable-head">
    <tr>
      <th><span>Name</span></th>
      <th><span>Description</span></th>
      ${ column3name ? `<th><span>${ column3name }</span></th>`: ''}
    </tr>
  </thead>
  <tbody class="docblock-${type}stable-body">
    ${
      list.map(info => `
        <tr>
          <td class="css-4lbn0a"><span class="css-in3yi3">${info.name}</span></td>
          <td><div class="css-18pz2h2"><span>${info.describe || '-'}</span></div><div class="css-1ije3e2"></div></td>
          ${ column3name ? `<td><div class="css-13nzt7e"><span class="css-o1d7ko">${info.default || info.detail || '-'}</span></div></td>`: ''}
        </tr>
      `).join('')
    }
  </tbody>
  `
  docsWrapNode.appendChild(tableNode);
}

/**
 * 侧边栏组件
 * 1. 添加组件文档标题
 * 2. 添加属性副标题
 * 3. 生成方法/事件/插槽/parts/css变量等区块
 */
export default function AsideLinks({ meta }): React.ReactElement {
  const [links, setLinks] = useState<any>([]);

  useEffect(() => {
    
    generateDocsH2andPropsH3();

    Object.keys(meta.tableInfo).filter(item => item !== 'props').forEach(key => {
      if (meta.tableInfo[key].length) generateDocsTable(meta.tableInfo[key], key.slice(0, key.length - 1) as DocType);
    })

    /**
     * 处理h节点
     */
    const list: any[] = [];
    const h2Nodes = document.querySelectorAll("#storybook-docs h1, #storybook-docs h2, #storybook-docs h3");
    h2Nodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return; /** 如果是文本, 换行 */
      if (
        node.classList.contains("sbdocs-subtitle") ||
        node.classList.contains("sbdocs-title")
      ) return;
      if (node.innerText === 'STORIES') node.innerText = "使用案例";
      const fontSize = FontSize[node.tagName] || FontSize.H4;
      list.push({
        name: node.innerText,
        node,
        fontSize,
        fontWeight: fontSize === FontSize.H2 ? 800 : 400,
      });
    });

    setLinks(list);
  }, []);

  function scrollToNode(node) {
    node.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: "10%",
        marginLeft: "20px",
      }}
    >
      {links.map((link) => (
        <a
          style={{
            cursor: "pointer",
            fontSize: link.fontSize,
            fontWeight: link.fontWeight || 400,
          }}
          onClick={()=>scrollToNode(link.node)}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}
