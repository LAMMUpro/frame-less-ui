import TempComp from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(TempComp)

/** 注册组件 */
if (!customElements.get('fl-temp-comp'))
  customElements.define('fl-temp-comp', vueWebComponent);

export { TempComp };