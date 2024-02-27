import { Component } from "preact";
import { extractClass } from "@/utils";
import { WebComponentDefine } from '@/decorator/webcomponent';
import { GlobalConfig } from '@/config';

type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
type NativeType = 'button' | 'submit' | 'reset';
type UISize = 'medium' | 'small' | 'mini';

export interface PropsType {
  type: WuButtonType;

  size: UISize;

  plain: boolean;

  round: boolean;

  circle: boolean;

  loading: boolean;

  disabled: boolean;

  icon: string;

  nativeType: NativeType;

  text: string;
}

export interface StateType {
  count: number
}

@WebComponentDefine('wc-button')
class WcButton extends Component<PropsType, StateType> {
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
          if ((this as unknown as WcComponentPrivate).__P?.adoptedStyleSheets) {
            (this as unknown as WcComponentPrivate).__P.adoptedStyleSheets = [styleSheet];
          }
        })
        // import styleInline from './index.scss?inline';
      } else {
        import('./index.scss').then((styleInline: any) => {
          const style = document.createElement('style');
          style.setAttribute('from-wcui', 'button');
          style.innerHTML = styleInline.default
          document.head.appendChild(style)
        })
      }
    });
  }

  render(props: PropsType, state: StateType, context: any) {
    return (
      <button
          disabled={props.disabled}
          {...extractClass({}, 'wu-button', {
              ['wu-button-' + props.type]: props.type,
              ['wu-button-' + props.size]: props.size,
              'is-plain': props.plain,
              'is-round': props.round,
              'is-circle': props.circle,
              'is-disabled': props.disabled,
          })}
          type={props.nativeType}
      >
          {props.loading && [
              <svg class="loading" viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
              </svg>,
              ' ',
          ]}
          {props.text}
          <slot />
      </button>
    );
  }
}
