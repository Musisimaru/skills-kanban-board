(function () {
  'use strict';

  class HeaderComponent {
      constructor(name) {
          this._name = name;
      }
      _getTemplate() {
          return `<header class="board-app__header">
        <div class="board-app__inner">
          <h1>${this._name}</h1>
        </div>
    </header>`;
      }
      createElement(template) {
          const element = document.createElement(`div`);
          element.innerHTML = template;
          return element.firstElementChild;
      }
      /**
       * render html element
       */
      getElement() {
          this._element = this.createElement(this._getTemplate());
          return this._element;
      }
  }

  class App {
      constructor(applicationName) {
          this._name = applicationName;
      }
      init(rootElementSelector) {
          const bodyElement = document.querySelector(rootElementSelector);
          const header = new HeaderComponent(this._name);
          const headerElement = header.getElement();
          bodyElement.prepend(headerElement);
      }
  }

  const app = new App('Канбан доска');
  app.init(`body.board-app`);

}());
