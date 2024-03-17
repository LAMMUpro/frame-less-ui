import { render } from 'preact';
import { createApp } from 'vue';
import Vue3App from './index.test.vue';
import '@/styles/demo.scss';
import { LitWebcomponent } from '@/decorator/webcomponent';
import { TempName } from './index';
import './type.cache';

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
      <fl-temp-name value="preact">
      </fl-temp-name>
      <div class="divide"></div>
      <fl-temp-name-sd value="preact-sd">
      </fl-temp-name-sd>
		</div>
	);
}
render(<PreactApp />, document.getElementById('preact'));

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');