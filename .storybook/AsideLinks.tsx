import React, { useState } from "react";
import { useEffect } from "react";

function getFontSize(node: Element) {
  console.log(node, node.tagName)
  if (node.tagName === 'H1') {
    return '28px'
  } else if (node.tagName === 'H2') {
    return '18px'
  } else if (node.tagName === 'H3') {
    return '16px'
  }
  return "14px"
}

export default function AsideLinks(): React.ReactElement {
  const [links, setLinks] = useState<any>([]);

  useEffect(() => {
    const list: any[] = [];

    /**
     * 处理h节点
     */
    const h2Nodes = document.querySelectorAll("#storybook-docs h1, #storybook-docs h2, #storybook-docs h3");
    h2Nodes.forEach((node) => {
      if (
        node.classList.contains("sbdocs-subtitle") ||
        node.classList.contains("sbdocs-title")
      ) return;
      if (node.innerText === 'STORIES') node.innerText = "使用案例";
      const fontSize = getFontSize(node);
      list.push({
        name: node.innerText,
        node,
        fontSize,
        fontWeight: fontSize === "18px" ? 800 : 400,
      });
    });

    /**
     * 处理props
     */
    const propsNode = document.querySelector('table.docblock-argstable');
    list.push({
      name: "API",
      node: propsNode,
      fontSize: '18px',
      fontWeight: 800,
    });
    list.push({
      name: "Props",
      node: propsNode,
      fontSize: '16px',
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
