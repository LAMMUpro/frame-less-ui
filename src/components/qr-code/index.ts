import { LitElement, PropertyValueMap, css, html, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import stylesInline from "./index.scss?inline";
import { ct } from "@/utils";
import { LitWebcomponent } from "@/decorator/webcomponent";
import QRCode from "qrcode";

export type EmitType = {
  /**
   * @event updated
   * @describe 二维码更新完成
   * @detail -
   */
  (e: "updated"): void;
  /**
   * @event error
   * @describe 二维码渲染错误
   * @detail { error: Error }
   */
  (e: "error", detail: { error: Error }): void;
};

@LitWebcomponent("qr-code", import("./index.scss?inline"))
export class QrCode extends LitElement {
  /** 类型声明，内部有实现 */
  emit: EmitType;

  /**
   * 二维码内容
   */
  @property()
  value: string;

  /**
   * 尺寸, 长宽
   */
  @property()
  size: number = 200;

  /**
   * 颜色
   */
  @property()
  color: {
    dark: string
    light: string
  } = {
    dark: '#000000ff',
    light: '#ffffffff',
  };

  /**
   * 二维码描述标签, 会挂在canvas的aria-label
   */
  @property()
  label: string;

  @query("#canvas")
  canvas: HTMLElement;

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    /** 
     * 空值|非字符串 判断
     */
    let text = 'empty';
    if (Object.prototype.toString.apply(this.value) === '[object String]') {
      text = this.value || text;
    }
    QRCode.toCanvas(this.canvas, text, {
      margin: 0,
      width: this.size,
      color: this.color,
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

  static styles = [
    css`
      ${unsafeCSS(stylesInline)}
    `,
  ];
}
