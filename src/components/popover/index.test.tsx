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
      <FlPopover value="preact">
      </FlPopover>
      <div class="divide"></div>
      <FlPopoverSd value="preact-sd">
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