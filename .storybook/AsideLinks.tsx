import React from 'react';
import { useEffect } from 'react';

export default function AsideLinks (): React.ReactElement {
  
  useEffect(() => {
    const h2Nodes = document.querySelectorAll('#storybook-docs h2, #storybook-docs h3');
    console.log(h2Nodes)
  }, [])
  
  return <div>// TODO侧边栏</div>
}