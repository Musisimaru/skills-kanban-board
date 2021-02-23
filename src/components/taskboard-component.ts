import Task from "models/task";
import TasksBase from "models/tasksBase";
import { createElement, getTaskGroup } from "utils";
import { TaskboardGroupComponent } from "./taskboard-group-component";
import {
  ChangedPositionHandler,
  ChangingPositionHandler,
} from "./taskboard-item-component";
import { UIComponent } from "./ui-component";

export default class TaskboardComponent extends UIComponent {
  _data: TasksBase;
  _groups: { [key: string]: TaskboardGroupComponent } = {};
  constructor(tasks: TasksBase) {
    super();
    this._data = tasks;

    this.initGroup(this._data.backlog, "backlog", "Бэклог");
    this.initGroup(this._data.processing, "processing", "В процессе");
    this.initGroup(this._data.done, "done", "Готово");

    const basketGroup = this.initGroup(this._data.basket, "basket", "Корзина");

    const basketEmptyElement = basketGroup.element.querySelector(
      ".task--empty"
    );
    basketEmptyElement.classList.add("task--empty-trash");
    basketEmptyElement.firstElementChild.textContent = "Корзина пуста";
  }

  initGroup(
    tasks: Array<Task>,
    boardName: string,
    boardDisplayName
  ): TaskboardGroupComponent {
    const component = new TaskboardGroupComponent(
      boardName,
      boardDisplayName,
      tasks
    );
    this.element.append(component.element);
    component.onChangingPosition = this.onChanging;
    component.onChangedPosition = this.onChanged;
    this._groups[boardName] = component;
    return component;
  }

  addNewTask(createdTask: Task) {
    this._groups['backlog'].addTask(createdTask);
  }

  onChanging: ChangingPositionHandler = (task, taskElement) => {
    const currentGroup = getTaskGroup(taskElement.parentElement);
    const taskArr = <Array<Task>>this._data[currentGroup];
    const index =
      Array.from(taskElement.parentNode.children).indexOf(taskElement) - 1;
    if (index > -1) {
      taskArr.splice(index, 1);
    }
  };

  onChanged: ChangedPositionHandler = (task, taskElement) => {
    const currentGroup = getTaskGroup(taskElement.parentElement);
    const taskArr = <Array<Task>>this._data[currentGroup];
    const index =
      Array.from(taskElement.parentNode.children).indexOf(taskElement) - 1;
    taskArr.splice(index, 0, task);
  };

  _getTemplate(): string {
    return `
        <section class="taskboard">
            <h2 class="visually-hidden">Ваши задачи:</h2>
        </section>
        `;
  }
}
