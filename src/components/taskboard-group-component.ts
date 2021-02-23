import Task from "models/task";
import { createElement } from "utils";
import {
  ChangedPositionHandler,
  ChangingPositionHandler,
  TaskboardItemComponent,
} from "./taskboard-item-component";
import { UIComponent } from "./ui-component";

export class TaskboardGroupComponent extends UIComponent {
  _data: Array<Task>;
  _internalName: string;
  _displayName: string;

  _changingPositionHandlers: Array<ChangingPositionHandler> = [];
  _changedPositionHandlers: Array<ChangedPositionHandler> = [];

  set onChangingPosition(value: ChangingPositionHandler) {
    this._changingPositionHandlers.push(value);
  }

  set onChangedPosition(value: ChangedPositionHandler) {
    this._changedPositionHandlers.push(value);
  }

  private invokeChangingPositionHandlers(task: Task, taskEl: HTMLElement) {
    this._changingPositionHandlers.map((handler) => {
      handler(task, taskEl);
    });
  }
  private invokeChangedPositionHandlers(task: Task, taskEl: HTMLElement) {
    this._changedPositionHandlers.map((handler) => {
      handler(task, taskEl);
    });
  }

  constructor(internalName: string, displayName: string, tasks: Array<Task>) {
    super();
    this._data = tasks;
    this._internalName = internalName;
    this._displayName = displayName;

    this._element = createElement(this._getTemplate());
    const taskboardList = this._element.querySelector(".taskboard__list");
    const emptyItem = new TaskboardItemComponent(null);
    if (this._data.length !== 0) {
      emptyItem.element.classList.add("hidden-block");
    }

    taskboardList.append(emptyItem.element);

    this._data.map((task) => {
      const taskItem = new TaskboardItemComponent(task);
      taskItem.element.classList.add(`task--${this._internalName}`);
      taskboardList.append(taskItem.element);

      taskItem.onChangingPosition = (item, taskElement) => {
        this.invokeChangingPositionHandlers(item, taskElement);
      };
      taskItem.onChangedPosition = (item, taskElement) => {
        this.invokeChangedPositionHandlers(item, taskElement);
      };

      //   taskItem.onChangePosition = (changedTask, previosGroup, newGroup) => {
      //     if (this._internalName === previosGroup) {
      //       const index = this._data.indexOf(changedTask);
      //       if (index > -1) {
      //         this._data.splice(index, 1);
      //       }
      //     }
      //   };
    });
  }

  _getTemplate(): string {
    return `
        <article class="taskboard__group taskboard__group--${this._internalName}">
          <h3 class="taskboard__group-heading taskboard__group-heading--${this._internalName}">${this._displayName}</h3>
          <div class="taskboard__list">
          </div>
        </article>        
        `;
  }
}
