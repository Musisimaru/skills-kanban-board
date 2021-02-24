import { TaskboardBacketGroup, TaskboardGroup } from "components/task-group";
import {
  ChangedPositionHandler,
  ChangingPositionHandler,
} from "components/task-item";
import Task from "models/task";
import TasksBase from "models/tasksBase";
import { getTaskGroup } from "utils";

import { UIComponent } from "../ui-component";

enum GroupDisplayNames {
  "backlog" = "Бэклог",
  "processing" = "В процессе",
  "done" = "Готово",
  "basket" = "Корзина",
}

export default class TaskboardComponent extends UIComponent {
  _data: TasksBase;
  _groups: { [key: string]: TaskboardGroup } = {};
  constructor(tasks: TasksBase) {
    super();
    this._data = tasks;

    Object.keys(this._data).map((internalName) => {
      const tasks = this._data[internalName];
      const label = GroupDisplayNames[internalName];
      const component =
        internalName === "basket"
          ? new TaskboardBacketGroup(internalName, label, tasks)
          : new TaskboardGroup(internalName, label, tasks);
      this.initGroup(component);
    });
  }

  initGroup(component: TaskboardGroup): TaskboardGroup {
    this.element.append(component.element);
    component.onChangingPosition = this.onChanging;
    component.onChangedPosition = this.onChanged;
    this._groups[component.internalName] = component;
    return component;
  }

  addNewTask(createdTask: Task) {
    this._groups["backlog"].addTask(createdTask);
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

  get template(): string {
    return `
        <section class="taskboard">
            <h2 class="visually-hidden">Ваши задачи:</h2>
        </section>
        `;
  }
}
