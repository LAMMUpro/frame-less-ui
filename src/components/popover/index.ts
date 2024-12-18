import Popover from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(Popover)

/** 注册组件 */
if (!customElements.get('fl-popover'))
  customElements.define('fl-popover', vueWebComponent);

export { Popover };