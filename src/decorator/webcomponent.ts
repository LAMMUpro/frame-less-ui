import { GlobalConfig } from '@/config';
import register from "@/utils/preact-custom-element";

interface WebCompoponentDefine {
  /** 组件名(格式: <[前缀]-[组件名]>) */
  tagNameWithoutPrefix: string, 
  /** 需要监控变化的属性 */
  watchProps: string[], 
  /** 
   * 导入scss样式文件
   * @Example import('./index.scss?inline')
   * 使用shadow dom则用构造样式表设置在元素节点上
   * 不用shadow dom则放到<style>并插入到document.head
   */
  stylePromise: Promise<{ default: string }>,
  /** 其它配置项 */
  options: {
    /** 是否使用shadow dom封装组件 */
    useShadow?: boolean;
  }
}

export function LitWebcomponent(
  tagNameWithoutPrefix: WebCompoponentDefine['tagNameWithoutPrefix'],
  stylePromise: WebCompoponentDefine['stylePromise'],
  options?: WebCompoponentDefine['options'],
) {
  // TODO tagName正则校验: 自定义组件名称，必须含有下划线 
  const tagName = `${GlobalConfig.componentPrefix}-${tagNameWithoutPrefix}`;
  /** 定义时传到参数优先 */
  const useShadow = options?.useShadow ?? GlobalConfig.useShadow;
  // TODO，第一个TS参数怎么写 ，这里不知道为什么需要第二个参数
  return function (ComponentClass: any, _?:any): any {
    /** 自定义元素已经定义过了则退出 */
    if (customElements.get(tagName)) return console.warn(`custom element <${tagName}> is used!`);

    /**
     * 构造新的类，做一些通用功能
     * 1. 样式注入
     */
    class ComponentClassInjectStyle extends ComponentClass {
      constructor(...args: any[]) {
        super(...args);
        /** 给组件加一个变量 */
        this._useShadow = useShadow;
      }

      /**
       * 事件
       */
      emit = (name: string, detail?: any, options?: EventInit) => {
        this.dispatchEvent(new CustomEvent(name, {
          ...options,
          detail,
        }));
      }

      /** 
       * 兼容不使用shadow dom的情况
       */
      createRenderRoot() {
        return this._useShadow ? super.createRenderRoot() : this;
      }

      firstUpdated() {
        super.firstUpdated();

        /**
         * 处理slot, 非shadow dom渲染原生不支持<slot>标签
         */
        if (!this._useShadow) {
          /** 组件内使用到的所有slot */
          const slots = this.querySelectorAll('slot');
          if (slots.length == 0) return;
          /** slot对应的内容节点(根节点下, 没有fl-cn标签的) */
          const slotContentNodes = [...this.children].filter(node => !node.hasAttribute('fl-cn'));
          
          /** 默认slot对应的内容 */
          const normalSlotContentNodeIndex = slotContentNodes.findIndex(node => [null, ''].includes(node.getAttribute('slot')));

          slots.forEach(slot => {
            const slotName = slot.getAttribute('name') || '';

            /** preact如果只有slot属性会被当成true值, 处理这种特殊情况 */
            if (!slotName && normalSlotContentNodeIndex > -1) {
              slot.replaceWith(slotContentNodes.splice(normalSlotContentNodeIndex, 1)[0]);
            } else { /** 其他具名slot */
              const index = slotContentNodes.findIndex(node => slotName === node.getAttribute('slot'));
              if (index > -1) {
                slot.replaceWith(slotContentNodes.splice(index, 1)[0]);
              }
            }
          })
        }
      }
    }

    /**
     * 样式表插入(兼容不使用shadow dom 的情况)
     * // TODO 开发环境下(import styles from './index.scss';)会自动加载插入到<head>内
     */
    customElements.whenDefined(tagName).then(() => {
      if(!useShadow) stylePromise?.then?.((styleInline) => {
        const style = document.createElement('style');
        style.setAttribute(`from-flessui`, `${GlobalConfig.componentPrefix}-${tagNameWithoutPrefix}`);
        style.innerHTML = styleInline.default;
        document.head.appendChild(style);
      })
    })

    /** 定义组件(tag) */
    customElements.define(tagName, ComponentClassInjectStyle);
    console.info(`>>> 自定义组件${tagName}注册成功，useShadow=${useShadow}`);

    return ComponentClassInjectStyle;
  }
}

export function PreactWebcomponent(
  tagNameWithoutPrefix: WebCompoponentDefine['tagNameWithoutPrefix'],
  watchProps: WebCompoponentDefine['watchProps'] = [],
  stylePromise?: WebCompoponentDefine['stylePromise'],
  options?: WebCompoponentDefine['options'],
) {
  return WebComponentDefine(tagNameWithoutPrefix, watchProps, stylePromise, options);
}

/**
 * webcomponent类装饰器
 */
function WebComponentDefine(
  tagNameWithoutPrefix: WebCompoponentDefine['tagNameWithoutPrefix'],
  watchProps: WebCompoponentDefine['watchProps'] = [], 
  stylePromise?: WebCompoponentDefine['stylePromise'],
  options?: WebCompoponentDefine['options'],
) {
  // TODO tagName正则校验: 自定义组件名称，必须含有下划线 
  const tagName = `${GlobalConfig.componentPrefix}-${tagNameWithoutPrefix}`;
  /** 定义时传到参数优先 */
  const useShadow = options?.useShadow ?? GlobalConfig.useShadow;
  // TODO，第一个TS参数怎么写 ，这里不知道为什么需要第二个参数
  return function (ComponentClass: any, _?:any): any {

    /** 自定义元素已经定义过了则退出 */
    if (customElements.get(tagName)) return console.warn(`custom element <${tagName}> is used!`);

    /**
     * 构造新的类，做一些通用功能
     * 1. 样式注入
     */
    class ComponentClassInjectStyle extends ComponentClass {
      constructor(...args: any[]) {
        super(...args);

        /** 使用shadow dom隔离样式 */
        if (useShadow) {
          stylePromise?.then?.((styleInline) => {
            const styleSheet = new CSSStyleSheet();
            styleSheet.replaceSync(styleInline.default);
            const shadowRoot = (this as unknown as ComponentPrivate).__P;
            if (shadowRoot?.adoptedStyleSheets) shadowRoot.adoptedStyleSheets = [styleSheet];
          })
        }
      }
    }

    customElements.whenDefined(tagName).then(() => {
      /** 不使用shadow dom */
      if(!useShadow) stylePromise?.then?.((styleInline) => {
        const style = document.createElement('style');
        style.setAttribute(`from-flessui`, `${GlobalConfig.componentPrefix}-${tagNameWithoutPrefix}`);
        style.innerHTML = styleInline.default;
        document.head.appendChild(style);
      })
    })

    /** 定义组件 */
    register(ComponentClassInjectStyle, tagName, watchProps, {
      shadow: useShadow,
    });
    console.info(`>>> 自定义组件${tagName}注册成功，useShadow=${useShadow}`);

    return ComponentClassInjectStyle;
  }
}