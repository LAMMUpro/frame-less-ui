// import { PropsType as ButtonPropsType } from '../components/button';
// import { PropsType as BadgePropsType } from '../components/badge';
// import { PropsType as DialogPropsType } from '../components/dialog';

import { Ref } from 'vue';

// import { Tree } from '../components/tree';

// /** 组件ts类型全局声明 */
// declare module "preact" {
//   namespace JSX {
//     interface IntrinsicElements {
//       "fl-button": ButtonPropsType;
//       "fl-badge": BadgePropsType;
//       "fl-dialog": DialogPropsType;
//       // TODO props类型提取
//       // "fl-tree": InstanceType<typeof Tree>
//     }
//   }
// }

// /**
//  * 定义后document.createElement能获取到其中类型
//  * lit组件才能这么用?
//  */
// declare global {
//   interface HTMLElementTagNameMap {
//     "fl-tree": Tree;
//   }
// }

export namespace RadioSpace {
  /** radioGroup提供给radio组件的Provide */
  export interface Provide {
    /** radioGroup的modelValue(注意是ref) */
    modelValue: Ref<string | number | boolean>;
    /** radioGroup的emit */
    emit(eventName: 'change' | 'update-model-value', ...args: any[]): void;
  }
}

/** 提取所有可选属性的键 */
type OptionalKeys<T> = {
  [K in keyof T]: undefined extends T[K] ? K : never;
}[keyof T];

/** 过滤掉 never 和 undefined，确保结果是合法的属性键 */
type ValidKeys<T> = Exclude<OptionalKeys<T>, undefined>;

/** 通过PropsType提取出DefaultPropsType */
export type PickDefaultPropsType<T> = Required<Pick<T, ValidKeys<T>>>