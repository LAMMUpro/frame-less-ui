import { LitElement, PropertyValueMap, css, html, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import stylesInline from "./index.scss?inline";
import { ct } from "@/utils";
import { LitWebcomponent } from "@/decorator/webcomponent";
import QRCode, { QRCodeErrorCorrectionLevel } from "qrcode";

export type EmitType = {
  /**
   * 二维码更新完成
   */
  (e: "updated"): void;
  /**
   * 二维码渲染错误
   */
  (e: "error", detail: { error: Error }): void;
};

/**
 * @subtitle 二维码预览
 * @description 支持原生/vue2/vue3/react/jquery
 */
@LitWebcomponent("qr-code", import("./index.scss?inline"))
export class QrCode extends LitElement {
  /** 类型声明，内部有实现 */
  emit: EmitType;

  /** 
   * 二维码内容
   * @control inline-radio
   * @options ['A','B','C']
   */
  @property()
  value: string;

  /**
   * 尺寸, 长宽
   */
  @property()
  size: number = 200;

  /**
   * @describe 二维码颜色, 十六进制格式
   * @control color
   * @default #000000ff
   */
  @property()
  color: string = '#000000ff';

  /**
   * @describe 背景颜色, 十六进制格式
   * @control color
   * @default #ffffffff
   */
  @property()
  backgroundColor: string = '#ffffffff';

  /**
   * @describe Error correction level.
   * ["L","M","Q","H"]
   * @control inline-radio
   * @options ["L","M","Q","H"] 
   * @default M
   */
  @property()
  errorCorrectionLevel: QRCodeErrorCorrectionLevel = 'M';

  /**
   * @describe 二维码描述标签, 会挂在canvas的aria-label
   */
  @property()
  label?: string;

  @query("#canvas")
  canvas: HTMLElement;

  /**
   * 暴露QRCode对象
   */
  @property({attribute: false})
  get QRCode() {
    return QRCode;
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    /** 
     * 空值|非字符串 判断
     */
    let text = 'empty';
    if (Object.prototype.toString.apply(this.value) === '[object String]') {
      text = this.value || text;
    }
    /**
     * 绘制二维码
     */
     QRCode.toCanvas(this.canvas, text, {
      margin: 0,
      width: this.size,
      color: {
        dark: this.color,
        light: this.backgroundColor,
      },
      errorCorrectionLevel: this.errorCorrectionLevel,
    }, (err) => {
      if (err) {
        this.emit('error', { error: err });
      } else {
        this.emit('updated');
      }
    });
  }

  render() {
    return html`
      <canvas fl-cn id="canvas" aria-label=${this.label || 'qrcode'}></canvas>
    `;
  }

  static styles = [css`${unsafeCSS(stylesInline)}`];
}
