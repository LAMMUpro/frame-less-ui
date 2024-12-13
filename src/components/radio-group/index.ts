import RadioGroup from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(RadioGroup)

/** 注册组件 */
if (!customElements.get('fl-radio-group'))
  customElements.define('fl-radio-group', vueWebComponent);

export { RadioGroup };