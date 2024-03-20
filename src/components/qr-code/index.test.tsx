import { render } from 'preact';
import { createApp } from 'vue';
import Vue3App from './index.test.vue';
import '@/styles/demo.scss';
import { LitWebcomponent } from '@/decorator/webcomponent';
import { QrCode } from './index';
import { useEffect, useRef, useState } from 'preact/hooks';
import '@/renderAsideNav.tsx';

/** 注册组件的shadow版本 */
LitWebcomponent(
  'qr-code-sd', 
  import('./index.scss?inline'), 
  { useShadow: true }
)(QrCode);

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

	return (
		<div>
      <fl-qr-code value="234324323">
      </fl-qr-code>
      <div class="divide"></div>
      <fl-qr-code-sd value="2343243">
      </fl-qr-code-sd>
		</div>
	);
}
render(<PreactApp />, document.getElementById('preact'));

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');