import TreeItem from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(TreeItem)

/** 注册组件 */
if (!customElements.get('fl-tree-item'))
  customElements.define('fl-tree-item', vueWebComponent);

export { TreeItem };