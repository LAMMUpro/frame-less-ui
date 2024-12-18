import { QrCode } from './components/qr-code';
import { Popover } from './components/popover';
import { Tree } from './components/tree';
import { TreeItem } from './components/tree-item';

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FlQrCode: typeof QrCode
    FlPopver: typeof Popover
    FlTree: typeof Tree
    FlTreeItem: typeof TreeItem
  }

  interface ComponentCustomProperties {

  }
}

export {}
