import { createElement } from "utils";
import { UIComponent } from "./ui-component";

export default class HeaderComponent extends UIComponent {
  _name: string;
  _element: Element;

  constructor(name: string) {
    super();
    this._name = name;
  }

  get template(): string {
    return `<header class="board-app__header">
        <div class="board-app__inner">
          <h1>${this._name}</h1>
        </div>
    </header>`;
  }
}
