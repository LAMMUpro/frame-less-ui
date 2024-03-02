import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

interface PropsType {
  name: string
}

@customElement('fl-tree')
export class Tree extends LitElement {
  @property() name: string = '';

  render() {
    return html`
      <p>Hello, ${this.name}!</p>
    `;
  }

  static styles = css`
    :host {
      color: blue;
    }
  `;
}