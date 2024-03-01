import { Component } from "preact";
import styleInline from './index.scss?inline';
import { throttle } from '@/utils';
import { WebComponentDefine } from '@/decorator/webcomponent';

export interface PropsType {
  vvv: number
}

export interface StateType {
  count: number
}

@WebComponentDefine('counter', ['vvv'])
class Counter extends Component<PropsType, StateType> {
  constructor(props: PropsType, context: any) {
    super();
    this.setState({
      count: +props.vvv,
    })
    
    /** 插入constructed stylesheet */
    setTimeout(() => {
      const styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(styleInline);
      if ((this as unknown as ComponentPrivate).__P?.adoptedStyleSheets) {
        (this as unknown as ComponentPrivate).__P.adoptedStyleSheets = [styleSheet];
      }
    });
  }

  inc = throttle(() => {
    this.setState((state) => ({ count: state.count + 1 }));
  }, 100);

  dec = () => {
    this.setState((state) => ({ count: state.count - 1 }));
  };

  render(props: PropsType, state: StateType, context: any) {
    return (
      <>
        <button onClick={this.dec} className="button">
          -
        </button>
        
        <span className="content">{props.vvv}</span>
        <span className="content">{state.count}</span>
        
        <button onClick={this.inc} className="button">
          +
        </button>
        {/* <slot></slot> */}
        {
          props.children
        }
      </>
    );
  }
}
