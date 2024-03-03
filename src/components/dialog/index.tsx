import { Component } from "preact";
import styleInline from "./index.scss?inline";
import { PreactWebcomponent } from '@/decorator/webcomponent';

export interface PropsType {
  // 是否显示
  visible: boolean;

  // 点击 mask 是否关闭
  closeOnClickModal: boolean;

  // 是否显示关闭按钮
  showClose: boolean;

  // 是否在 Dialog 出现时将 body 滚动锁定
  lockScroll: boolean;

  // 是否在 Dialog 出现时将 body 滚动锁定
  zIndex: number;

  // 弹框标题 title 无法重写
  caption: string;

  // 宽度
  width: string;

  // 标题
  title: string;
}

export interface StateType {
  /** 是否显示 */
  show: boolean;
}

@PreactWebcomponent('dialog', ['visible'])
class Dialog extends Component<PropsType, StateType> {
  constructor(props: PropsType, context: any) {
    super();
    this.setState({
      show: props.visible,
    });

    /** 插入constructed stylesheet */
    setTimeout(() => {
      const styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(styleInline);
      if ((this as unknown as ComponentPrivate).__P?.adoptedStyleSheets) {
        (this as unknown as ComponentPrivate).__P.adoptedStyleSheets = [
          styleSheet,
        ];
      }
    });
  }

  visibleChange(val: boolean, old: boolean) {
    if (val === old) {
      return;
    }
    if (val) {
      this.props.lockScroll && this.disableScroll();
      this.setState({
        show: true
      })
      setTimeout(() => {
        const dom: any = (
          this as unknown as ComponentPrivate
        ).__P.querySelector("wu-plus-transition");
        dom.enter?.();
      }, 0);
    } else {
      const dom: any = (
        this as unknown as ComponentPrivate
      ).__P.querySelector("wu-plus-transition");
      dom.leave?.();
      this.props.lockScroll && this.enableScroll();
    }
  }

  /**
   * 禁止滚动
   */
  disableScroll() {
    document
      .getElementsByTagName("body")[0]
      .style.setProperty("overflow", "hidden");
  }

  /**
   * 开启滚动
   */
  enableScroll() {
    document.getElementsByTagName("body")[0].style.removeProperty("overflow");
  }

  /** 
   * 关闭弹窗
   */
  close() {
    this.props.visible = false;
    // this.setState({
    //   show: false,
    // });
  }

  /**
   * 遮罩点击
   */
  handleMaskClickContent(e) {
    for (let i = 0; i < (e?.path?.length || 0); i++) {
      if (e.path[i]?.classList?.contains("wu-dialog")) {
        return;
      }
    }
    if (this.props.closeOnClickModal) {
      this.close();
    }
  }

  render(props: PropsType, state: StateType, context: any) {
    if (!props.visible) {
      return <span></span>;
    }
    return (
      <div className="wu-dialog_wrapper">
        <div
          className="wu-dialog_wrapper content"
          onClick={(event) => this.handleMaskClickContent(event)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={props.title}
            className="wu-dialog"
            style={{ width: props.width, zIndex: props.zIndex }}
          >
            <div className="wu-dialog_header">
              <span className="wu-dialog_title">{props.title}</span>
              {props.showClose ? (
                <button
                  type="button"
                  aria-label="Close"
                  className="wu-dialog_headerbtn"
                >
                  <svg
                    onClick={this.close.bind(this)}
                    className="wu-dialog_close wu-icon wu-icon-close"
                    fill="currentColor"
                    width="1em"
                    height="1em"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                  </svg>
                </button>
              ) : null}
            </div>
            <div className="wu-dialog_body">
              <slot />
            </div>
            <div className="wu-dialog_footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
        <div className="mask" style={{}} onClick={() => {}} />
      </div>
    );
  }
}
