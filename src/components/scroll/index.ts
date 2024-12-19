import Scroll from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(Scroll)

/** 注册组件 */
if (!customElements.get('fl-scroll'))
  customElements.define('fl-scroll', vueWebComponent);

export { Scroll };