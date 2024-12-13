import Input from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(Input)

/** 注册组件 */
if (!customElements.get('fl-input'))
  customElements.define('fl-input', vueWebComponent);

export { Input };