


import CeVue from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(CeVue)

/** 注册组件 */
if (!customElements.get('fl-popver'))
  customElements.define('fl-popver', vueWebComponent);
