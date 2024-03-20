import { render } from 'preact';
import { createApp } from 'vue';
import Vue3App from './index.test.vue';
import '@/styles/demo.scss';
import { LitWebcomponent } from '@/decorator/webcomponent';
import { Tooltip } from './index';
import FlTooltip, { FlTooltipSd } from './react.cache';
import '@/renderAsideNav';

/** 注册组件的shadow版本 */
LitWebcomponent(
  'tooltip-sd', 
  import('./index.scss?inline'), 
  { useShadow: true }
)(Tooltip);

/**
 * preact实例
 */
function PreactApp() {
	return (
		<div>
      <FlTooltip
        value="preact"
        onSuccess={e=>e.detail}
      ></FlTooltip>
      <div class="divide"></div>
      <FlTooltipSd
        value="preact-sd"
      ></FlTooltipSd>
		</div>
	);
}
render(<PreactApp />, document.getElementById('preact'));

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');