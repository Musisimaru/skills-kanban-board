import { EmptyTrashTask } from "components/task-item";
import Task from "models/task";
import TaskboardGroupComponent from "./component";

export type ClearedTasksHandler = () => void;

export default class TaskboardBacketGroupComponent extends TaskboardGroupComponent {
  _clearedTasksHandlers: Array<ClearedTasksHandler> = [];

  set onClearedTasks(value: ClearedTasksHandler) {
    this._clearedTasksHandlers.push(value);
  }

  private invokeClearedTasksHandlers() {
    this._clearedTasksHandlers.map((handler) => {
      handler();
    });
  }

  addEmptyTask() {
    this._emptyTaskItem = new EmptyTrashTask();
    this._emptyTaskItem.onDragAndDrop = (evtArgs) => {
      this.invokeDragAndDropHandlers({
        draggedElement: evtArgs.draggedElement,
        movingElement: evtArgs.movingElement,
        event: evtArgs.event,
        emptyTaskElemnt: this.emptyTaskElement,
      });
    };
    if (this._data.length !== 0) {
      this.hideEmptyTask();
    }
    this.taskboardListElement.append(this.emptyTaskElement);
  }

  constructor(internalName: string, displayName: string, tasks: Array<Task>) {
    super(internalName, displayName, tasks);

    // this.emptyTaskElement.classList.add("task--empty-trash");
    // this.emptyTaskElement.firstElementChild.textContent = "Корзина пуста";

    this.buttonClearElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      while (this.taskboardListElement.childElementCount > 1) {
        if (this.taskboardListElement.lastChild === this.emptyTaskElement) {
          this.taskboardListElement.removeChild(
            this.taskboardListElement.firstChild
          );
        } else {
          this.taskboardListElement.removeChild(
            this.taskboardListElement.lastChild
          );
        }
      }
      this.showEptyTask();
      this.switchClearButton(false);

      this._data.splice(0, this._data.length);
      this.invokeClearedTasksHandlers();
    });

    this.onChangingPosition = (movingTask, movingElement) => {
      if (movingElement.parentElement.childElementCount === 2) {
        this.switchClearButton(false);
      }
    };
    this.onChangedPosition = (movedTask, movedElement) => {
      if (movedElement.parentElement.childElementCount > 1) {
        this.switchClearButton(true);
      }
    };
  }

  switchClearButton(on: boolean) {
    this.buttonClearElement.disabled = !on;
  }

  get buttonClearElement(): HTMLButtonElement {
    return this.element.querySelector("button.button--clear");
  }

  get template(): string {
    return `
    <article class="taskboard__group taskboard__group--${this._internalName}">
        <h3 class="taskboard__group-heading taskboard__group-heading--${this._internalName}">${this._displayName}</h3>
        <div class="taskboard__list taskboard__list--trash">
        </div>
        <button class="taskboard__button button button--clear" type="button">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15.5374" y="5.16638" width="1.83333" height="14.6667" transform="rotate(45 15.5374 5.16638)"
                fill="white" />
                <rect x="16.8337" y="15.5372" width="1.83333" height="14.6667" transform="rotate(135 16.8337 15.5372)"
                fill="white" />
            </svg>
            <span>Очистить</span>
        </button>  
    </article>        
    `;
  }
}
