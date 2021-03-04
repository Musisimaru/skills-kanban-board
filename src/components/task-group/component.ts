import {
  ChangedPositionHandler,
  ChangingPositionHandler,
  EmptyTask,
  TaskboardItem,
} from "components/task-item";
import {
  DragAndDropArguments,
  DragAndDropHandler,
} from "components/task-item/component";
import Task from "models/task";
import { createElement } from "utils";

import { UIComponent } from "../ui-component";

export class GroupDragAndDropArguments extends DragAndDropArguments {
  public emptyTaskElemnt: HTMLElement;
}

export type GroupDragAndDropHandler = (evtArgs: GroupDragAndDropArguments) => void;


export default class TaskboardGroupComponent extends UIComponent {
  _data: Array<Task>;
  _internalName: string;
  _displayName: string;

  _emptyTaskItem: TaskboardItem;

  _changingPositionHandlers: Array<ChangingPositionHandler> = [];
  _changedPositionHandlers: Array<ChangedPositionHandler> = [];
  _tasksDragAndDropHandlers: Array<GroupDragAndDropHandler> = [];

  set onChangingPosition(value: ChangingPositionHandler) {
    this._changingPositionHandlers.push(value);
  }

  set onChangedPosition(value: ChangedPositionHandler) {
    this._changedPositionHandlers.push(value);
  }

  set onTasksDragAndDrop(value: GroupDragAndDropHandler) {
    this._tasksDragAndDropHandlers.push(value);
  }

  get internalName(): string {
    return this._internalName;
  }

  get taskboardListElement(): HTMLElement {
    return this.element.querySelector(".taskboard__list");
  }

  protected invokeChangingPositionHandlers(task: Task, taskEl: HTMLElement) {
    this._changingPositionHandlers.map((handler) => {
      handler(task, taskEl);
    });
  }
  protected invokeChangedPositionHandlers(task: Task, taskEl: HTMLElement) {
    this._changedPositionHandlers.map((handler) => {
      handler(task, taskEl);
    });
  }
  protected invokeDragAndDropHandlers(evtArgs: GroupDragAndDropArguments) {
    this._tasksDragAndDropHandlers.map((handler) => {
      handler(evtArgs);
    });
  }

  get emptyTaskElement(): HTMLElement {
    return <HTMLElement>this._emptyTaskItem.element;
  }

  showEptyTask() {
    this.emptyTaskElement.classList.remove("hidden-block");
  }
  hideEmptyTask() {
    this.emptyTaskElement.classList.add("hidden-block");
  }

  addEmptyTask() {
    this._emptyTaskItem = new EmptyTask();
    this._emptyTaskItem.onDragAndDrop = (evtArgs) =>{            
      this.invokeDragAndDropHandlers({
        draggedElement: evtArgs.draggedElement,
        movingElement: evtArgs.movingElement,
        event: evtArgs.event,
        emptyTaskElemnt: this.emptyTaskElement
      });
    };

    if (this._data.length !== 0) {
      this.hideEmptyTask();
    }
    this.taskboardListElement.append(this.emptyTaskElement);
  }

  constructor(internalName: string, displayName: string, tasks: Array<Task>) {
    super();
    this._data = tasks;
    this._internalName = internalName;
    this._displayName = displayName;

    this.addEmptyTask();

    this._data.map((task) => {
      this.addTaskElement(task);
    });
  }

  private addTaskElement(task: Task) {
    const taskItem = new TaskboardItem(task);
    taskItem.element.classList.add(`task--${this._internalName}`);
    this.taskboardListElement.append(taskItem.element);

    taskItem.onChangingPosition = (item, taskElement) => {
      this.invokeChangingPositionHandlers(item, taskElement);
    };

    taskItem.onChangedPosition = (item, taskElement) => {
      this.invokeChangedPositionHandlers(item, taskElement);
    };

    taskItem.onDragAndDrop = (evtArgs) =>{            
      this.invokeDragAndDropHandlers({
        draggedElement: evtArgs.draggedElement,
        movingElement: evtArgs.movingElement,
        event: evtArgs.event,
        emptyTaskElemnt: this.emptyTaskElement
      });
    }
  }

  public addTask(task: Task) {
    this._data.push(task);
    this.addTaskElement(task);
  }

  get template(): string {
    return `
        <article class="taskboard__group taskboard__group--${this._internalName}">
          <h3 class="taskboard__group-heading taskboard__group-heading--${this._internalName}">${this._displayName}</h3>
          <div class="taskboard__list">
          </div>
        </article>        
        `;
  }
}
