import { createRoot } from 'react-dom/client'
import { createApp } from 'vue';
import Vue3App from './index.vue';
import '@/styles/demo.scss';
import '@/renderAsideNav.tsx';
import "../../icon/index";

import FlButton from '../wrap.react';

/**
 * react实例
 */
function ReactApp() {
	return (
		<div>
      <FlButton>react按钮</FlButton>
		</div>
	);
}
createRoot(document.getElementById('react')).render(<ReactApp />);

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');