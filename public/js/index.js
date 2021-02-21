(function () {
  'use strict';

  function createElement(template) {
      const element = document.createElement(`div`);
      element.innerHTML = template;
      return element.firstElementChild;
  }

  class UIComponent {
      constructor() {
          if (new.target === UIComponent) {
              throw new Error(`its component not for creating!`);
          }
      }
      _getTemplate() {
          throw new Error(`Method not implementation!`);
      }
      /**
       * render html element
       */
      getElement() {
          if (!this._element) {
              this._element = createElement(this._getTemplate());
          }
          return this._element;
      }
  }

  class TaskboardItemComponent extends UIComponent {
      constructor(task) {
          super();
          this._data = task;
      }
      _getTemplate() {
          return `
    <div class="taskboard__item task">
        <div class="task__body">
            <p class="task__view">${this._data.name}</p>
            <input class="task__input" type="text" value="${this._data.name}">
        </div>
        <button class="task__edit" type="button" aria-label="Изменить"></button>
    </div>`;
      }
  }

  class TaskboardGroupComponent extends UIComponent {
      constructor(internalName, displayName, tasks) {
          super();
          this._data = tasks;
          this._internalName = internalName;
          this._displayName = displayName;
          this._element = createElement(this._getTemplate());
          const taskboardList = this._element.querySelector('.taskboard__list');
          this._data.map((task) => {
              const taskItem = new TaskboardItemComponent(task);
              taskboardList.append(taskItem.getElement());
          });
      }
      _getTemplate() {
          return `
        <article class="taskboard__group taskboard__group--${this._internalName}">
          <h3 class="taskboard__group-heading taskboard__group-heading--${this._internalName}">${this._displayName}</h3>
          <div class="taskboard__list">
          <div>
        </article>        
        `;
      }
  }

  class TaskboardComponent extends UIComponent {
      constructor(tasks) {
          super();
          this._data = tasks;
          this._element = createElement(this._getTemplate());
          this.initGroup(this._data.backlog, "backlog", "Бэклог");
          this.initGroup(this._data.processing, "processing", "В процессе");
          this.initGroup(this._data.done, "done", "Готово");
          this.initGroup(this._data.basket, "basket", "Корзина");
      }
      initGroup(tasks, boardName, boardDisplayName) {
          const component = new TaskboardGroupComponent(boardName, boardDisplayName, tasks);
          this._element.append(component.getElement());
      }
      _getTemplate() {
          return `
        <section class="taskboard">
            <h2 class="visually-hidden">Ваши задачи:</h2>
        </section>
        `;
      }
  }

  const tasks = {
      backlog: [
          { name: "Test Task" },
          { name: "Test Task" },
          { name: "Test Task" },
      ],
      processing: [
          { name: "Test Task" },
          { name: "Test Task" },
          { name: "Test Task" },
      ],
      done: [],
      basket: [{ name: "Test Task" }],
  };

  class HeaderComponent extends UIComponent {
      constructor(name) {
          super();
          this._name = name;
      }
      _getTemplate() {
          return `<header class="board-app__header">
        <div class="board-app__inner">
          <h1>${this._name}</h1>
        </div>
    </header>`;
      }
  }

  class App {
      constructor(applicationName) {
          this._name = applicationName;
          this._data = this.getData();
      }
      init(rootElementSelector) {
          const bodyElement = document.querySelector(rootElementSelector);
          const appInner = bodyElement.querySelector('.board-app__inner');
          const header = new HeaderComponent(this._name);
          const headerElement = header.getElement();
          bodyElement.prepend(headerElement);
          const taskBoard = new TaskboardComponent(this._data);
          const taskBoardElement = taskBoard.getElement();
          appInner.append(taskBoardElement);
      }
      getData() {
          return tasks;
      }
  }

  const app = new App('Канбан доска');
  app.init(`body.board-app`);

}());
