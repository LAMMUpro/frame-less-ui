import { QrCode } from './components/qr-code';
import { Popver } from './components/popver';

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FlQrCode: typeof QrCode
    FlPopver: typeof Popver

  }

  interface ComponentCustomProperties {

  }
}

export {}
