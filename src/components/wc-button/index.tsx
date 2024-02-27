import register from "@/utils/preact-custom-element";
import { Component } from "preact";
import styleInline from './index.scss?inline';

export interface PropsType {
  text: number
}

export interface StateType {
  count: number
}

export class WcButton extends Component<PropsType, StateType> {
  constructor(props: PropsType, context: any) {
    super();
    // this.setState({
    //   count: +props.vvv,
    // })
    
    /** 插入constructed stylesheet */
    setTimeout(() => {
      const styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(styleInline);
      if ((this as unknown as WcComponentPrivate).__P?.adoptedStyleSheets) {
        (this as unknown as WcComponentPrivate).__P.adoptedStyleSheets = [styleSheet];
      }
    });
  }

  render(props: PropsType, state: StateType, context: any) {
    return (
      <>
        <button> 按钮 {props.text}</button>
      </>
    );
  }
}

export async function define() {
  /** 定义过了则退出 */
  if (customElements.get('wc-button')) return;
  register(WcButton, "wc-button", ["vvv"], { shadow: true });
}

define();