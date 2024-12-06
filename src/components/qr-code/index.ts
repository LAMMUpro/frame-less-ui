import QrCode from './index.ce.vue';
import { defineCustomElement } from 'vue'

/** 编译成webcomponent */
const vueWebComponent = defineCustomElement(QrCode)

/** 注册组件 */
if (!customElements.get('fl-qr-code'))
  customElements.define('fl-qr-code', vueWebComponent);

export { QrCode };