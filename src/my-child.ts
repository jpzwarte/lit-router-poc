import { Routes } from "@lit-labs/router";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('my-child')
export class Child extends LitElement {
  routes = new Routes(this, [
    {
      path: 'grandchild',
      render: () => html`<h3>Grandchild</h3>`
    }
  ]);

  render() {
    return html`
      <h3>Child</h3>
      ${this.routes.outlet()}
    `;
  }
}