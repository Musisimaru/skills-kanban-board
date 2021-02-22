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

    this.initGroup(this._data.backlog, "backlog", "Бэклог");
    this.initGroup(this._data.processing, "processing", "В процессе");
    this.initGroup(this._data.done, "done", "Готово");

    const basketGroup = this.initGroup(this._data.basket, "basket", "Корзина");

    const basketEmptyElement = basketGroup.querySelector(".task--empty");
    basketEmptyElement.classList.add("task--empty-trash");
    basketEmptyElement.firstElementChild.textContent = "Корзина пуста";
  }

  initGroup(tasks: Array<Task>, boardName: string, boardDisplayName): Element {
    const component = new TaskboardGroupComponent(
      boardName,
      boardDisplayName,
      tasks
    );
    this.element.append(component.element);
    return component.element;
  }

  _getTemplate(): string {
    return `
        <section class="taskboard">
            <h2 class="visually-hidden">Ваши задачи:</h2>
        </section>
        `;
  }
}
