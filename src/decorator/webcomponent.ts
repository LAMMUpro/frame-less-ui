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

/**
 * 同步slot的属性到目标节点
 * 只同步fl-开头的属性
 * 如果目标节点是Node，则包一层变为HTMLElement
 */
function copySlotAttribute2Node(slot: HTMLElement, node: Node) {
  /** 确保节点是HTMLElement而不是Node */
  let wrapNode: HTMLElement;
  /** 
   * 不是HTMLElement，则包一层，否则无法设置setAttribute
   */
  if (!(node instanceof HTMLElement)) {
    wrapNode = document.createElement('div');
    wrapNode.className = 'fl-inline';
    wrapNode.append(node);
  } else {
    wrapNode = node;
  }
  
  for (let i = 0; i < slot.attributes.length; i++) {
    const attribute = slot.attributes[i];
    if (attribute.name.startsWith('fl-')) {
      wrapNode.setAttribute(attribute.name, attribute.value);
    }
  }
  return wrapNode;
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

      /**
       * 首次渲染完成时 做一些兼容处理
       */
      firstUpdated() {
        const afterFirstUpdated = super.firstUpdated();

        /**
         * 兼容slot（非shadow dom渲染原生不支持<slot>标签）
         * 1. 先处理具名插槽，剩下的都是默认插槽
         * 2. 内容节点有Node节点和Element节点，Node节点包括文本/注释
         * 3. 如果用户slot="xxx"使用了多次，只匹配第一个并警告
         * 4. 如果默认插槽传入了多个Element节点，只匹配第一个并警告
         */
        if (!this._useShadow) {
          /** 组件内使用到的所有slot */
          const slots = this.querySelectorAll('slot');
          if (slots.length == 0) return;

          /** slot对应的内容节点(根节点下, 没有fl-cn标签的) */
          let slotContentNodes = ([...this.childNodes] as Array<Node>)
            .filter(node => 
              node.nodeType !== 8 && // 去掉注释节点
              (node.nodeType !== 3 || node.nodeValue.replaceAll('\n', '').trim()) && // 去掉换行到文本节点
              (!(node instanceof HTMLElement) || !node.hasAttribute?.('fl-cn')) // Node节点不过滤 或 Element节点取非内容节点
            );
          
          /** 组件内是否有默认插槽 */
          let defaultSlot = undefined;

          slots.forEach(slot => {
            const slotName = slot.getAttribute('name') || '';

            if (!slotName) { /** 默认插槽最后处理 */
              defaultSlot = slot;
            } else { /** 其他具名slot */
              const index = slotContentNodes.findIndex(node => node instanceof HTMLElement && slotName === node.getAttribute?.('slot'));
              if (index > -1) {
                const slotContentNode = copySlotAttribute2Node(slot, slotContentNodes.splice(index, 1)[0]);
                slot.replaceWith(slotContentNode);
              }
            }
          })

          
          /**
           * 单独处理默认插槽
           */
          /** 筛掉slot不等于默认的 */
          if (defaultSlot) slotContentNodes = slotContentNodes.filter(node =>
            !(node instanceof HTMLElement) || 
            [null, '', 'default', 'true'].includes(node.getAttribute('slot'))
          );
          if (slotContentNodes.length && defaultSlot) {
            /**
             * 标准情况, 未处理的节点只有一个 且 slot属性不是其他
             */
            if (slotContentNodes.length === 1) {
              defaultSlot.replaceWith(copySlotAttribute2Node(defaultSlot, slotContentNodes[0]));
            } else {
              /** 用一个盒子把 默认插槽内容包起来，默认插槽包括文本Node节点 */
              const defaultSlotContentContainer = document.createElement('div');
              defaultSlotContentContainer.className = 'fl-inline';
              /**
               * 遍历剩余节点
               */
              slotContentNodes.forEach(node => {
                defaultSlotContentContainer.appendChild(node);
              })
              defaultSlot.replaceWith(copySlotAttribute2Node(defaultSlot, defaultSlotContentContainer));
            }
          }
        }

        afterFirstUpdated?.apply?.(this);
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