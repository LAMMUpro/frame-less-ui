import Icon from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(Icon)

/** 注册组件 */
if (!customElements.get('fl-icon'))
  customElements.define('fl-icon', vueWebComponent);

export { Icon };