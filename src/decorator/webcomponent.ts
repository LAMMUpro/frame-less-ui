import { GlobalConfig } from '@/config';
import register from "@/utils/preact-custom-element";

/**
 * webcomponent类装饰器
 * @param tagName 自定义标签名称
 * @param watchProps 需要监控变化的属性
 */
export function WebComponentDefine(tagName: string, watchProps: string[] = [], options?: {
  /** 是否使用shadow dom封装组件 */
  useShadow?: boolean;
}) {
  // TODEO，第一个TS参数怎么写 ，这里不知道为什么需要第二个参数
  return function (WcComponentClass: Function, _:any) {
    // TODO tagName正则校验: 自定义组件名称，必须含有下划线 
    /** 定义过了则退出 */
    if (customElements.get(tagName))
      return console.warn(`custom element <${tagName}> is used!`);
    register(WcComponentClass, tagName, watchProps, {
      shadow: options?.useShadow || GlobalConfig.useShadow,
    });
    console.info(`>>> 自定义组件${tagName}注册成功，useShadow=${options?.useShadow || GlobalConfig.useShadow}`);
  }
}

