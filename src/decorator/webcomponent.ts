import { GlobalConfig } from '@/config';
import register from "@/utils/preact-custom-element";

/**
 * webcomponent类装饰器
 */
export function WebComponentDefine(
  /** 组件名(格式: <[前缀]-[组件名]>) */
  tagNameWithoutPrefix: string, 
  /** 需要监控变化的属性 */
  watchProps: string[] = [], 
  /** 
   * 导入scss样式文件
   * @Example import('./index.scss?inline')
   * 使用shadow dom则用构造样式表设置在元素节点上
   * 不用shadow dom则放到<style>并插入到document.head
   */
  stylePromise?: Promise<{ default: string }>,
  /** 其它配置项 */
  options?: {
    /** 是否使用shadow dom封装组件 */
    useShadow?: boolean;
  }
) {
  const tagName = `${GlobalConfig.componentPrefix}-${tagNameWithoutPrefix}`;
  // TODO，第一个TS参数怎么写 ，这里不知道为什么需要第二个参数
  return function (ComponentClass: any, _?:any): any {
    // TODO tagName正则校验: 自定义组件名称，必须含有下划线 

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
        if (GlobalConfig.useShadow) {
          stylePromise?.then?.((styleInline) => {
            const styleSheet = new CSSStyleSheet();
            styleSheet.replaceSync(styleInline.default);
            const shadowRoot = (this as unknown as ComponentPrivate).__P;
            if (shadowRoot?.adoptedStyleSheets) shadowRoot.adoptedStyleSheets = [styleSheet];
          })
        } else { /** 不使用shadow dom */
          stylePromise?.then?.((styleInline) => {
            const style = document.createElement('style');
            style.setAttribute(`from-flessui`, `${GlobalConfig.componentPrefix}-${tagNameWithoutPrefix}`);
            style.innerHTML = styleInline.default;
            document.head.appendChild(style);
          })
        }
      }
    }

    /** 定义组件 */
    register(ComponentClassInjectStyle, tagName, watchProps, {
      shadow: options?.useShadow || GlobalConfig.useShadow,
    });
    console.info(`>>> 自定义组件${tagName}注册成功，useShadow=${options?.useShadow || GlobalConfig.useShadow}`);

    return ComponentClassInjectStyle;
  }
}