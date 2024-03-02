import { PropsType as CounterPropsType } from '../components/counter';
import { PropsType as ButtonPropsType } from '../components/button';
import { PropsType as BadgePropsType } from '../components/badge';
import { PropsType as DialogPropsType } from '../components/dialog';
// import { PropsType as TreePropsType } from '../components/tree';

import { Tree } from '../components/tree';



/** 组件ts类型全局声明 */
declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "fl-counter": CounterPropsType;
      "fl-button": ButtonPropsType;
      "fl-badge": BadgePropsType;
      "fl-dialog": DialogPropsType;
      // "fl-tree": InstanceType<typeof Tree>
    }
  }
}
