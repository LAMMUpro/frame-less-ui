import React, { useState } from "react";
import { useEffect } from "react";

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
function generateEventsDocs(events: Array<{
  /** 事件名 */
  name: string
  /** 事件描述 */
  description?: string
  /** 事件详情 */
  detail?: string
}>) {
  const name = 'events';
  if (!events.length) return;
  const docsWrapNode = document.getElementsByClassName('_doc_')[0];
  if (!docsWrapNode) return;
  /**
   * 插入副标题
   */
  const subTitle = document.createElement('h3');
  subTitle.innerText = '方法';
  docsWrapNode.appendChild(subTitle);

  /**
   * 构造table
   */
  const tableNode = document.createElement('table');
  tableNode.className = `docblock-table docblock-${name}table sb-unstyled css-v2ifgj _${name}_`;
  tableNode.innerHTML = `
  <thead class="docblock-${name}table-head">
    <tr>
      <th><span>Name</span></th>
      <th><span>Description</span></th>
      <th><span>Event Detail</span></th>
    </tr>
  </thead>
  <tbody class="docblock-${name}table-body">
    ${
      events.map(event => `
        <tr>
          <td class="css-4lbn0a"><span class="css-in3yi3">${event.name}</span></td>
          <td><div class="css-18pz2h2"><span>${event.description || '-'}</span></div><div class="css-1ije3e2"></div></td>
          <td><div class="css-13nzt7e"><span class="css-o1d7ko">${event.detail || '-'}</span></div></td>
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
export default function AsideLinks(): React.ReactElement {
  const [links, setLinks] = useState<any>([]);

  useEffect(() => {
    
    generateDocsH2andPropsH3();

    generateEventsDocs([
      {
        name: 'onSlRequestClose',
        description: 'Emitted when the user attempts to close the dialog by clicking the close button, clicking the overlay, or pressing escape. Calling event.preventDefault() will keep the dialog open. Avoid using this unless closing the dialog will result in destructive behavior such as data loss.',
        detail: `{ source: 'close-button' | 'keyboard' | 'overlay' }`,
      }
    ]);

    /**
     * 处理h节点
     */
    const list: any[] = [];
    const h2Nodes = document.querySelectorAll("#storybook-docs h1, #storybook-docs h2, #storybook-docs h3");
    h2Nodes.forEach((node) => {
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
