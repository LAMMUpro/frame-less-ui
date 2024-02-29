import { GlobalConfig } from "@/config";
import { Component } from "preact";

export default class WebComponent<PropsType, StateType> extends Component<PropsType, StateType> {
  constructor(props: PropsType, context: any) {
    super();
    // this.setState({
    //   count: +props.vvv,
    // })

    /** 插入constructed stylesheet */
    setTimeout(() => {
      if (GlobalConfig.useShadow) {
        import('./index.scss?inline').then((styleInline: any) => {
          const styleSheet = new CSSStyleSheet();
          styleSheet.replaceSync(styleInline.default);
          if ((this as unknown as ComponentPrivate).__P?.adoptedStyleSheets) {
            (this as unknown as ComponentPrivate).__P.adoptedStyleSheets = [styleSheet];
          }
        })
        // import styleInline from './index.scss?inline';
      } else {
        import('./index.scss').then((styleInline: any) => {
          const style = document.createElement('style');
          style.setAttribute('from-flessui', 'button');
          style.innerHTML = styleInline.default
          document.head.appendChild(style)
        })
      }
    });
  }
  
  render() {
    return (
      <span>888</span>
    )
  }
}