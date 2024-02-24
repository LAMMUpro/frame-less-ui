import register from "preact-custom-element";
import { Component } from "preact";
import styleInline from './index.scss?inline';

export interface PropsType {
  vvv: number
}

export interface StateType {
  count: number
}

class WcCounter extends Component<PropsType, StateType> {
  constructor(props: PropsType, context: any) {
    super();
    this.setState({
      count: +props.vvv,
    })
  }

  inc = () => {
    this.setState((state) => ({ count: state.count + 1 }));
  };

  dec = () => {
    this.setState((state) => ({ count: state.count - 1 }));
  };

  render(props: PropsType, state: StateType, context: any) {
    return (
      <>
        <style>{styleInline}</style>
        <button onClick={this.dec} className="button">
          -
        </button>
        <span>{state.count}</span>
        <button onClick={this.inc} className="button">
          +
        </button>
      </>
    );
  }
}

export function define() {
  register(WcCounter, "wc-counter", ["vvv"], { shadow: true });
}
