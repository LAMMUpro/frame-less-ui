import { render } from 'preact';
import { createApp } from 'vue';
import Vue3App from './index.test.vue';
import '@/styles/demo.scss';
import { LitWebcomponent } from '@/decorator/webcomponent';
import { TempName } from './index';
import FlTempName, { FlTempNameSd } from './react.cache';
import '@/renderAsideNav.tsx';

/** 注册组件的shadow版本 */
LitWebcomponent(
  'temp-name-sd', 
  import('./index.scss?inline'), 
  { useShadow: true }
)(TempName);

/**
 * preact实例
 */
function PreactApp() {
	return (
		<div>
      <FlTempName value="preact">
      </FlTempName>
      <div class="divide"></div>
      <FlTempNameSd value="preact-sd">
      </FlTempNameSd>
		</div>
	);
}
render(<PreactApp />, document.getElementById('preact'));

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');