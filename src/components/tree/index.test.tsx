import { render } from 'preact';
import { createApp } from 'vue';
import Vue3App from './index.test.vue';
import '@/styles/demo.scss';
import { LitWebcomponent } from '@/decorator/webcomponent';
import { Tree } from './index';
import { useState } from 'preact/hooks';

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
	return (
		<div>
      <fl-tree name={name} arr={arr}>
        <button slot="">插槽示例</button>
      </fl-tree>
      <div class="divide"></div>
      <fl-tree-sd name={name} arr={arr}>
        <button>插槽示例</button>
      </fl-tree-sd>
		</div>
	);
}
render(<PreactApp />, document.getElementById('preact'));

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');