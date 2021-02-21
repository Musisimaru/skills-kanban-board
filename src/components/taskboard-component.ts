import Task from "models/task";
import TasksBase from "models/tasksBase";
import { createElement } from "utils";
import { TaskboardGroupComponent } from "./taskboard-group-component";
import { UIComponent } from "./ui-component";

export default class TaskboardComponent extends UIComponent {
  _data: TasksBase;
  constructor(tasks: TasksBase) {
    super();
    this._data = tasks;

    this._element = createElement(this._getTemplate());
    this.initGroup(this._data.backlog, "backlog", "Бэклог");
    this.initGroup(this._data.processing, "processing", "В процессе");
    this.initGroup(this._data.done, "done", "Готово");
    this.initGroup(this._data.basket, "basket", "Корзина");
  }

  initGroup(tasks: Array<Task>, boardName: string, boardDisplayName) {
    const component = new TaskboardGroupComponent(
      boardName,
      boardDisplayName,
      tasks
    );
    this._element.append(component.getElement());
  }

  _getTemplate(): string {
    return `
        <section class="taskboard">
            <h2 class="visually-hidden">Ваши задачи:</h2>
        </section>
        `;
  }
}
