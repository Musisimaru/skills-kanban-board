import { createElement } from "utils";

export class UIComponent {
  _element: Element;

  get element(): Element {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  constructor() {
    if (new.target === UIComponent) {
      throw new Error(`its component not for creating!`);
    }
  }

  get template(): string {
    throw new Error(`Method not implementation!`);
  }
}
