import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Router } from '@lit-labs/router';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  router = new Router(this, [
    {
      path: '/'
    },
    {
      path: '/parent{/}?*?',
      render: () => html`<my-parent></my-parent>`,
      enter: async () => import('./my-parent.js')
    }
  ], {
    fallback: {
      render: () => html`<h1>404</h1>`
    }
  });

  render() {
    return html`
      <h1>Root</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/parent">Parent</a></li>
        <li><a href="/parent/child">Parent/Child</a></li>
        <li><a href="/parent/child/grandchild">Parent/Child/Grandchild</a></li>
        <li><a href="/parent/child/asdfasdf">Parent/Child/404</a></li>
      </ul>

      ${this.router.outlet()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
