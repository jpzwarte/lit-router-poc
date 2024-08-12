import { Routes } from "@lit-labs/router";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('my-parent')
export class Parent extends LitElement {
  routes = new Routes(this, [
    {
      path: 'child{/}?*?',
      render: () => html`<my-child></my-child>`,
      enter: async () => import('./my-child.js')
    }
  ]);

  render() {
    return html`
      <h2>Parent</h2>
      ${this.routes.outlet()}
    `;
  }
}