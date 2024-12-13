import Tag from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(Tag)

/** 注册组件 */
if (!customElements.get('fl-tag'))
  customElements.define('fl-tag', vueWebComponent);

export { Tag };