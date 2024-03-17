import { PropsType as ButtonPropsType } from '../components/button';
import { PropsType as BadgePropsType } from '../components/badge';
import { PropsType as DialogPropsType } from '../components/dialog';

import { Tree } from '../components/tree';



/** 组件ts类型全局声明 */
declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "fl-button": ButtonPropsType;
      "fl-badge": BadgePropsType;
      "fl-dialog": DialogPropsType;
      // TODO props类型提取
      // "fl-tree": InstanceType<typeof Tree>
    }
  }
}

/**
 * 定义后document.createElement能获取到其中类型
 * lit组件才能这么用?
 */
declare global {
  interface HTMLElementTagNameMap {
    "fl-tree": Tree;
  }
}