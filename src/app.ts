import HeaderComponent from "./components/header-component";

export default class App {
  _name: string;

  constructor(applicationName: string) {
    this._name = applicationName;
  }
  public init(rootElementSelector) {
    const bodyElement = <HTMLElement>document.querySelector(rootElementSelector);

    const header = new HeaderComponent(this._name);
    const headerElement = header.getElement();

    bodyElement.prepend(headerElement);
  }
}
