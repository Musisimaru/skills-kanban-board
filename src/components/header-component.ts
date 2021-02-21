export default class HeaderComponent {
  _name: string;
  _element: Element;

  constructor(name: string) {
    this._name = name;
  }

  private _getTemplate(): string {
    return `<header class="board-app__header">
        <div class="board-app__inner">
          <h1>${this._name}</h1>
        </div>
    </header>`;
  }

  private createElement(template): Element {
    const element = document.createElement(`div`);
    element.innerHTML = template;

    return element.firstElementChild;
  }

  /**
   * render html element
   */
  public getElement(): Element {
    this._element = this.createElement(this._getTemplate());
    return this._element;
  }
}
