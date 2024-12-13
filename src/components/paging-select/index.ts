import PagingSelect from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(PagingSelect)

/** 注册组件 */
if (!customElements.get('fl-paging-select'))
  customElements.define('fl-paging-select', vueWebComponent);

export { PagingSelect };