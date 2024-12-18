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
      <div>
        <fl-popover trigger="hover" placement="right">
          <span>悬停到此处显示</span>
          <div slot="popover-content">
            提示内容
          </div>
        </fl-popover>
      </div>
      <div className="divide"></div>
      <div>
        <fl-popover trigger="click" placement="right">
          <button>点击显示/隐藏</button>
          <div slot="popover-content">
            提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容
          </div>
        </fl-popover>
      </div>
		</div>
	);
}
createRoot(document.getElementById('react')).render(<ReactApp />);

/**
 * vue实例
 */
const vue3App = createApp(Vue3App);
vue3App.mount('#vue3');