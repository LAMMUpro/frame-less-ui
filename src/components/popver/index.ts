


import Popver from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(Popver)

/** 注册组件 */
if (!customElements.get('fl-popver'))
  customElements.define('fl-popver', vueWebComponent);

export { Popver };