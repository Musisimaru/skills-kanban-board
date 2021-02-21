import Task from "models/task";
import { UIComponent } from "./ui-component";

export class TaskboardItemComponent extends UIComponent {
  _data: Task;

  constructor(task: Task) {
    super();
    this._data = task;
  }

  _getTemplate(): string {
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
