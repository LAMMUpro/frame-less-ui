import Button from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(Button)

/** 注册组件 */
if (!customElements.get('fl-button'))
  customElements.define('fl-button', vueWebComponent);

export { Button };