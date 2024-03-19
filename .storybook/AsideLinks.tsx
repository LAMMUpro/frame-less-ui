import React, { useState } from "react";
import { useEffect } from "react";

enum FontSize {
  'H1' = '20px',
  'H2' = '16px',
  'H3' = '14px',
  'H4' = '12px',
}

/** 修复样式表 */
const styleFix = document.createElement('style');
styleFix.innerHTML = `
  div.sbdocs-content {
    max-width: 95%;
  }
  div.sbdocs-content>div>div:first-child {
    overflow: hidden;
  }
  table.docblock-table.sb-unstyled {
    margin: 0px 0 20px;
  }
  table ._fs12_ {
    font-size: 12px !important;
  }
  table ._fs14_ {
    font-size: 14px !important;
  }
  tbody span.highlight_default {
    background-color: #F7FAFC;
    padding: 1px 4px;
    border: 1px solid #ECF4F9;
    border-radius: 3px;
    font-size: 12px !important;
  }

  tbody span.highlight_name {
    background-color: rgba(0 0 0 / 0.025);
    padding: 1px 4px;
    border-radius: 2px;
  }

  h1.sbdocs-title {
    color: #595959;
  }

  h2.css-jy82ux:first-of-type {
    margin-top: 0;
  }

  h2.css-jy82ux {
    margin-bottom: 2px;
  }

  h3.css-wzniqs {
    color: #606266;
  }

  section.tables > h3 {
    color: #606266;
  }
`
document.head.appendChild(styleFix);

/**
 * 侧边栏组件
 * 1. 添加组件文档标题
 * 2. 添加属性副标题
 * 3. 生成方法/事件/插槽/parts/css变量等区块
 */
export default function AsideLinks(): React.ReactElement {
  const [links, setLinks] = useState<any>([]);

  useEffect(() => {
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
        color: fontSize === FontSize.H2 ? '#606266' : '#909399',
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
            color: link.color,
            lineHeight: '1.7em'
          }}
          onClick={()=>scrollToNode(link.node)}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}
