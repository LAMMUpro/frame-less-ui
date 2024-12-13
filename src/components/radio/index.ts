import Radio from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(Radio)

/** 注册组件 */
if (!customElements.get('fl-radio'))
  customElements.define('fl-radio', vueWebComponent);

export { Radio };