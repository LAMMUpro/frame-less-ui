import {LitElement, css, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import styles from './index.module.scss';
import stylesInline from './index.module.scss?inline';
import { ct } from '@/utils';

@customElement('fl-tree')
export class Tree extends LitElement {
  @property({ reflect: true }) 
  name: string = 'world! ';

  @property({ type: Array }) 
  arr: Array<number> = [];
  
  render() {
    return html`
      <p 
        @click=${() => console.log(this.arr)}
      >Hello, ${this.name}</p>
    `;
  }

  static styles = [css`${unsafeCSS(stylesInline)}`];
}

