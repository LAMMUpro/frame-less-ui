import { Component } from "preact";
import styleInline from "./index.scss?inline";
import { extractClass } from "@/utils";
import { WebComponentDefine } from '@/decorator/webcomponent';

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styleInline);

export interface PropsType {
  /** 显示值 */
  value: string | number;
  /**  最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 */
  max: number;
  /** 小圆点 */
  dot: boolean;
  /** 隐藏 badge */
  hide: boolean;
  /** 类型 */
  type: "primary" | "success" | "warning" | "info" | "danger";

  // children: HTMLElement
}

export interface StateType {
  count: number;
}

@WebComponentDefine('badge', ['value'])
export class Badge extends Component<PropsType, StateType> {
  constructor(props: PropsType, context: any) {
    super();

    /** 插入constructed stylesheet */
    setTimeout(() => {
      if ((this as unknown as ComponentPrivate).__P?.adoptedStyleSheets) {
        (this as unknown as ComponentPrivate).__P.adoptedStyleSheets = [styleSheet];
      }
    });
  }

  isFixed = false;

  get content(): any {
    if (this.props.dot) {
      return null;
    }
    const value = this.props.value;
    const max = this.props.max || 100;

    if (typeof value === "number" && typeof max === "number") {
      return max < value ? `${max}+` : value;
    }
    return value;
  }

  render(props: PropsType, state: StateType, context: any) {
    return (
      <div class="wu-badge">
        <slot id="defaultSlot" />
        {!props.hide && (this.content || this.content === 0 || props.dot) ? (
          <sup
            {...extractClass({}, "", {
              ["wu-badge_content-" + props.type]: props.type,
              "is-fixed": this.isFixed,
              "is-dot": props.dot,
              "wu-badge_content": true,
            })}
          >
            {this.content}
          </sup>
        ) : null}
      </div>
    );
  }
}
