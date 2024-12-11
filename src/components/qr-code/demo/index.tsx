import { createRoot } from 'react-dom/client'
import { createApp } from 'vue';
import Vue3App from './index.vue';
import '@/styles/demo.scss';
import '@/renderAsideNav.tsx';

/**
 * react实例
 */
function ReactApp() {
	return (
		<div>
      <fl-qr-code text="React" width={200}></fl-qr-code>
      <fl-qr-code text="React" width={150}></fl-qr-code>
      <fl-qr-code text="React" width={100}></fl-qr-code>
      <fl-qr-code text="React" width={50}></fl-qr-code>
		</div>
	);
}
createRoot(document.getElementById('react')).render(<ReactApp />);

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');