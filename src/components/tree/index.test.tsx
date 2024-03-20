import { render } from 'preact';
import { createApp } from 'vue';
import Vue3App from './index.test.vue';
import '@/styles/demo.scss';
import { LitWebcomponent } from '@/decorator/webcomponent';
import { Tree } from './index';
import { useEffect, useRef, useState } from 'preact/hooks';
import { TreeItem } from './type';
import '@/renderAsideNav.tsx';

/** 注册组件的shadow版本 */
LitWebcomponent(
  'tree-sd', 
  import('./index.scss?inline'), 
  { useShadow: true }
)(Tree);

/**
 * preact实例
 */
function PreactApp() {
  const [name, setName] = useState("word preact");
  const arr = ['str', 4, 5, () => console.log(666)];

  const treeRef = useRef();

  useEffect(() => {
    console.log((treeRef.current as HTMLElement).addEventListener('success', (e)=>{
      console.log(e);
    }));
  })
  
  const treeData: Array<TreeItem> = [
    {
      label: '一级1',
      value: 'k1',
    },
    {
      label: '一级2',
      value: 'k1',
    },
    {
      label: '一级3',
      value: 'k1',
    },

    {
      label: '一级',
      value: '11',
      children: [
        {
          label: '二级1',
          value: '21',
        },
        {
          label: '二级2',
          value: '21',
        },
        {
          label: '二级2',
          value: '22',
          children: [
            {
              label: '三级1',
              value: '31',
            },
            {
              label: '三级2',
              value: '32',
            },
          ]
        },
      ]
    }
  ]

  function list2comp(list: Array<TreeItem>) {
    return <div>
      {
        list.map(item => 
          <fl-tree label={item.label}>
            { item.children?.length && list2comp(item.children) }
          </fl-tree>
        )
      }
    </div>
  }

	return (
		<div>
      <div>
        {
          list2comp(treeData)
        }
      </div>
      <div class="divide"></div>
		</div>
	);
}
render(<PreactApp />, document.getElementById('preact'));

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');