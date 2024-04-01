import { LitElement, PropertyValueMap, css, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import stylesInline from "./index.scss?inline";
import { ct } from "@/utils";
import { LitWebcomponent } from "@/decorator/webcomponent";

/**
 * 组件事件定义
 */
export type EmitType = {
  /**
   * 成功响应
   */
  (e: "success", detail: { data: { label: string, value: string } }): void;
};

export type TriggerType = 'hover' | 'click' | 'focus' | 'contextmenu';

/**
 * 组件文本主色
 * @cssvar --primary-text-color
 * @argsType color
 * @default #5b5b5b
 */
/**
 * 点击/鼠标移入元素，弹出气泡式的卡片浮层。
 * @subtitle 气泡卡片
 */
@LitWebcomponent("popover", import("./index.scss?inline"))
export class Popover extends LitElement {
  emit: EmitType;

  /** 主题 */
  @property()
  theme: 'light' | 'dark' = 'light';

  /** 位置 */
  @property() 
  placement: 'auto' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' = 'auto';

  /** 触发条件 */
  @property() 
  trigger: TriggerType = 'hover';

  /** 鼠标移入气泡卡片是否自动关闭 */
  @property({ type: Boolean })
  enterable: boolean = false;

  /** 气泡卡片是否显示 */
  @property({ attribute: false, type: Boolean })
  private show: boolean = false;

  /**
   * 尺寸
   * @control inline-radio
   * @options ['small', 'medium', 'large']
   */
  @property()
  size: 'small' | 'medium' | 'large' = 'medium';

  protected showPopup(trigger: TriggerType) {
    if (this.trigger === trigger) {
      this.show = true;
    }
  }

  protected closePopup(trigger: TriggerType) {
    if (this.trigger === trigger) {
      this.show = false;
    }
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    console.log('变化的属性', _changedProperties);
  }

  /**
   * @slot default
   * @describe 触发源
   */
  /**
   * @slot content
   * @describe 内容
   */
  protected render() {
    return html`
      <div fl-cn
        class=${ct('wrap')} 
        @click=${() =>this.showPopup('click')}
        @mouseenter=${()=>this.showPopup('hover')}
        @mouseout=${()=>this.closePopup('hover')}
        @focus=${()=>this.showPopup('focus')}
        @blur=${()=>this.showPopup('focus')}
        @contextmenu=${()=>this.showPopup('contextmenu')}
      >
        <slot></slot>
      </div>

      <!-- ${
        this.show ? html`
        <div fl-cn>
          title: 气泡卡片
          <slot name="content"></slot>
        </div>`: ''
      } -->
      <!-- 
        因为对slot的兼容是在第一次mounted的时候，如果 slot 后面才渲染的话无法被处理
        第一个方案：用display:none代替 动态加载（从写法上兼容）
        第二个方案：将匹配不到slot的元素存起来，每次更新视图后再检测一遍有无<slot />
       -->
      <div fl-cn
        style="${this.show ? '':'display:none'}"
      >
        title: 气泡卡片
        <slot name="content"></slot>
      </div>
    `;
  }

  static styles = [css`${unsafeCSS(stylesInline)}`];
}

