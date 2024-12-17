import Popup from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(Popup)

/** 注册组件 */
if (!customElements.get('fl-popup'))
  customElements.define('fl-popup', vueWebComponent);

export { Popup };