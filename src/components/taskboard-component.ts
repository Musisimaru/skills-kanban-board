import Task from "models/task";
import TasksBase from "models/tasksBase";
import { createElement, getTaskGroup } from "utils";
import TaskboardBacketGroupComponent from "./taskboard-group-basket-component";
import { TaskboardGroupComponent } from "./taskboard-group-component";
import {
  ChangedPositionHandler,
  ChangingPositionHandler,
} from "./task-item/component";
import { UIComponent } from "./ui-component";

export default class TaskboardComponent extends UIComponent {
  _data: TasksBase;
  _groups: { [key: string]: TaskboardGroupComponent } = {};
  constructor(tasks: TasksBase) {
    super();
    this._data = tasks;

    this.initGroup(new TaskboardGroupComponent("backlog","Бэклог",this._data.backlog));
    this.initGroup(new TaskboardGroupComponent("processing", "В процессе", this._data.processing));
    this.initGroup(new TaskboardGroupComponent("done", "Готово", this._data.done));

    const basketGroup = this.initGroup(new TaskboardBacketGroupComponent("basket", "Корзина", this._data.basket));
  }

  initGroup(
    component:TaskboardGroupComponent
    // tasks: Array<Task>,
    // boardName: string,
    // boardDisplayName
  ): TaskboardGroupComponent {

    this.element.append(component.element);
    component.onChangingPosition = this.onChanging;
    component.onChangedPosition = this.onChanged;
    this._groups[component.internalName] = component;
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
