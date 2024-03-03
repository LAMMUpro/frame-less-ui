import {LitElement, css, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import styles from './index.module.scss';
import stylesInline from './index.module.scss?inline';
import { ct } from '@/utils';
import { LitWebcomponent } from '@/decorator/webcomponent';

@LitWebcomponent('tree', import('./index.module.scss?inline'), {
  useShadow: true
})
export class Tree extends LitElement {
  @property({ reflect: true }) 
  name: string = 'world! ';

  @property({ type: Array }) 
  arr: Array<number> = [];
  
  render() {
    return html`
      <div class=${ct(styles.wrap)}>
        <p 
          class=${ct(styles.red)}
          @click=${() => console.log(this.arr)}
        >Hello, ${this.name}</p>
      </div>
    `;
  }

  static styles = [css`${unsafeCSS(stylesInline)}`];
}

