import Tree from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(Tree)

/** 注册组件 */
if (!customElements.get('fl-tree'))
  customElements.define('fl-tree', vueWebComponent);

export { Tree };