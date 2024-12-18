import InputPlaceholder from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(InputPlaceholder)

/** 注册组件 */
if (!customElements.get('fl-input-placeholder'))
  customElements.define('fl-input-placeholder', vueWebComponent);

export { InputPlaceholder };