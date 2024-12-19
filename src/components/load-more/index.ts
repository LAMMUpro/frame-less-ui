import LoadMore from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(LoadMore)

/** 注册组件 */
if (!customElements.get('fl-load-more'))
  customElements.define('fl-load-more', vueWebComponent);

export { LoadMore };