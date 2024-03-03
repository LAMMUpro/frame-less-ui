import {LitElement, css, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import stylesInline from './index.scss?inline';
import { ct } from '@/utils';
import { LitWebcomponent } from '@/decorator/webcomponent';

@LitWebcomponent('tree', import('./index.scss?inline'))
export class Tree extends LitElement {
  @property({ reflect: true }) 
  name: string = 'world! ';

  @property({ type: Array })
  arr: Array<number> = [];

  render() {
    return html`
      <span fl-cn>test</span>
      <div class=${ct('flessui-tree')} fl-cn>
        <p 
          class=${ct('fl-red')}
          @click=${() => console.log(this.arr)}
        >Hello, ${this.name}</p>
        <div>
          <div><slot></slot></div>
          <section><slot name="hhh"></slot></section>
        </div>
      </div>
    `;
  }

  static styles = [css`${unsafeCSS(stylesInline)}`];
}

