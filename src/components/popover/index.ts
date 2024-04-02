import { LitElement, PropertyValueMap, css, html, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import stylesInline from "./index.scss?inline";
import { ct } from "@/utils";
import { LitWebcomponent } from "@/decorator/webcomponent";
import { GlobalVar } from "@/config";

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

  /**
   * 尺寸
   * @control inline-radio
   * @options ['small', 'medium', 'large']
   */
  @property()
  size: 'small' | 'medium' | 'large' = 'medium';

  /** 气泡卡片是否显示 */
  @property({ attribute: false, type: Boolean })
  private show: boolean = false;

  /** 弹出层的left, 单位px */
  @property({ attribute: false })
  private left: number = 0;

  /** 弹出层的top, 单位px */
  @property({ attribute: false })
  private top: number = 0;

  @query('.popover-div')
  popoverDom: Element;

  @query('[fl-class=fl-popover]')
  triggerDom?: Element;
  

  /**
   * 计算Popover弹出层的left\top
   */
  private computePopoverPosition() {
    /** 触发源的位置信息 */
    const triggerRect = this.triggerDom?.getBoundingClientRect();
    /** html的位置信息（这里不用body，因为body可能会有margin） */
    const htmlRect = document.documentElement.getBoundingClientRect();

    console.log('trigger', triggerRect);
    console.log('body', document.body.getBoundingClientRect())

    this.left = triggerRect.left - htmlRect.left;
    this.top = triggerRect.top - htmlRect.top - triggerRect.height;
  }

  protected showPopup(trigger: TriggerType) {
    if (this.trigger === trigger) {
      this.show = true;
      this.computePopoverPosition();
    }
  }

  protected closePopup(trigger: TriggerType) {
    if (this.trigger === trigger) {
      this.show = false;
    }
  }

  /** 
   * 创建容器根节点
   */
  private createPopoverContainerRootDom() {
    const div = document.createElement('div');
    const className = 'fl-popover-container-root';
    const id = `${className}-${Math.random().toString(36).substring(2)}`;
    div.id = id;
    div.className = className;

    const style = document.createElement('style');
    style.innerHTML = `
      #${id}.${className} .popover-div {
        position: absolute;
        background-color: gray;
      }
    `;

    div.appendChild(style);
    document.body.appendChild(div);
    GlobalVar.FlPopoverContainerDom = div;
  }

  /** 
   * 将弹出层提升到body下到容器根节点内
   */
  private afterFirstUpdated() {
    if (!GlobalVar.FlPopoverContainerDom) {
      this.createPopoverContainerRootDom();
    }
    GlobalVar.FlPopoverContainerDom.append(this.popoverDom);
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Function {
    return this.afterFirstUpdated;
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
        <slot fl-class="fl-popover"></slot>
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
      <div 
        fl-cn
        class=${ct('popover-div', {'fl-hidden': !this.show})}
        style=${`left: ${this.left}px; top: ${this.top}px`}
      >
        title: 气泡卡片
        <slot name="content"></slot>
      </div>
    `;
  }

  static styles = [css`${unsafeCSS(stylesInline)}`];
}

