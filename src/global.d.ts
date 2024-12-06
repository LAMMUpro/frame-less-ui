import { QrCode } from './components/qr-code';
import { Popver } from './components/popver';
import { Tree } from './components/tree';
import { TreeItem } from './components/tree-item';

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FlQrCode: typeof QrCode
    FlPopver: typeof Popver
    FlTree: typeof Tree
    FlTreeItem: typeof TreeItem
  }

  interface ComponentCustomProperties {

  }
}

export {}
