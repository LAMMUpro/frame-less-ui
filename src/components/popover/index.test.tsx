import { render } from 'preact';
import { createApp } from 'vue';
import Vue3App from './index.test.vue';
import '@/styles/demo.scss';
import { LitWebcomponent } from '@/decorator/webcomponent';
import { Popover } from './index';
import FlPopover, { FlPopoverSd } from './react.cache';
import '@/renderAsideNav.tsx';

/** 注册组件的shadow版本 */
LitWebcomponent(
  'popover-sd', 
  import('./index.scss?inline'), 
  { useShadow: true }
)(Popover);

/**
 * preact实例
 */
function PreactApp() {
	return (
		<div>
      <FlPopover>
        触发源触发源触发源
        <button>触发源</button>
        <span slot="content">自定义显示内容</span>
      </FlPopover>
      <div class="divide"></div>
      <FlPopoverSd>
        <button>触发源</button>
        <span slot="content">自定义显示内容</span>
      </FlPopoverSd>
		</div>
	);
}
render(<PreactApp />, document.getElementById('preact'));

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');