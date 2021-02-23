import Task from "models/task";
import { getNextElement, getTaskGroup } from "utils";
import { UIComponent } from "./ui-component";

export type ChangingPositionHandler = (
  movingTask: Task,
  movingElement: HTMLElement
) => void;
export type ChangedPositionHandler = (
  movedTask: Task,
  movedElement: HTMLElement
) => void;

export class TaskboardItemComponent extends UIComponent {
  _dataSource: Task;
  _data: Task;

  _changingPositionHandlers: Array<ChangingPositionHandler> = [];
  _changedPositionHandlers: Array<ChangedPositionHandler> = [];

  set onChangingPosition(value: ChangingPositionHandler) {
    this._changingPositionHandlers.push(value);
  }

  set onChangedPosition(value: ChangedPositionHandler) {
    this._changedPositionHandlers.push(value);
  }

  get taskInputElement(): HTMLInputElement {
    return this.element.querySelector("input.task__input") as HTMLInputElement;
  }

  get taskEditButton(): HTMLButtonElement {
    return this.element.querySelector("button.task__edit") as HTMLButtonElement;
  }

  private invokeChangingPositionHandlers() {
    this._changingPositionHandlers.map((handler) => {
      handler(this._dataSource, <HTMLElement>this.element);
    });
  }
  private invokeChangedPositionHandlers() {
    this._changedPositionHandlers.map((handler) => {
      handler(this._dataSource, <HTMLElement>this.element);
    });
  }

  get isEmpty(): boolean {
    return this._dataSource === null;
  }

  constructor(task: Task) {
    super();
    this._dataSource = task;

    this.initEventHandlers();
    this.initDataBindings();
  }

  _getTemplate(): string {
    if (this.isEmpty) {
      return `
      <div class="taskboard__item task task--empty">
        <p>Перетащите карточку</p>
      </div>`;
    }

    return `
    <div class="taskboard__item task" draggable="true">
        <div class="task__body">
            <p class="task__view">${this._dataSource.name}</p>
            <input class="task__input" type="text" value="${this._dataSource.name}">
        </div>
        <button class="task__edit" type="button" aria-label="Изменить"></button>
    </div>`;
  }

  initEventHandlers() {
    (<HTMLElement>this.element).addEventListener(`dragstart`, (evt) => {
      (<HTMLElement>evt.target).classList.add(`task--dragged`);
      this.invokeChangingPositionHandlers();
    });

    (<HTMLElement>this.element).addEventListener(`dragend`, (evt) => {
      (<HTMLElement>evt.target).classList.remove(`task--dragged`);
      this.invokeChangedPositionHandlers();
    });

    (<HTMLElement>this.element).addEventListener(`dragover`, (evt) => {
      evt.preventDefault();

      const activeElement = document.querySelector(
        `.taskboard__item.task--dragged`
      );

      const draggedElement = <HTMLElement>evt.target;

      const isMoveable =
        activeElement !== draggedElement &&
        draggedElement.classList.contains(`taskboard__item`);

      if (!isMoveable) {
        return;
      }

      const nextElement = getNextElement(evt.clientY, draggedElement);

      if (
        (nextElement && activeElement === nextElement.previousElementSibling) ||
        activeElement === nextElement
      ) {
        return;
      }

      const tasksListElement = draggedElement.parentElement;

      if (activeElement.parentElement !== tasksListElement) {
        if (activeElement.parentElement.childElementCount === 2) {
          activeElement.parentElement
            .querySelector(".task--empty")
            .classList.remove("hidden-block");
        }
        if (tasksListElement.childElementCount === 1) {
          tasksListElement
            .querySelector(".task--empty")
            .classList.add("hidden-block");
        }

        const nextTaskGroup = getTaskGroup(tasksListElement);
        const activeTaskGroup = getTaskGroup(activeElement.parentElement);
        activeElement.classList.replace(
          `task--${activeTaskGroup}`,
          `task--${nextTaskGroup}`
        );
      }
      tasksListElement.insertBefore(activeElement, nextElement);
    });

    if (this.taskInputElement) {
      this.taskInputElement.addEventListener("change", (evt) => {
        this._data.name = (<HTMLInputElement>evt.target).value;
        console.debug(`input changed ${this._data.name}`);
      });

      this.taskInputElement.addEventListener("keyup", (evt) => {
        if (evt.key === "Escape" || evt.key === "Esc") {
          console.debug(`Press Esc`);
          this.toggleEditState(<HTMLElement>this.element);
        } else if (evt.key === "Enter") {
          console.debug(`Press Enter`);
          this.toggleEditState(<HTMLElement>this.element);
        }
      });
    }

    if (this.taskEditButton) {
      this.taskEditButton.addEventListener("click", (evt) => {
        if (this.toggleEditState(<HTMLElement>this.element)) {
          this.taskInputElement.focus();
          this.taskInputElement.select();
        }
      });
    }
  }

  toggleEditState(elem: HTMLElement): boolean {
    if (elem.classList.contains("task--active")) {
      elem.classList.remove("task--active");
      return false;
    } else {
      elem.classList.add("task--active");
      return true;
    }
  }

  initDataBindings() {
    if (this.isEmpty) {
      return;
    }

    const taskViewElement = this.element.querySelector("p.task__view");
    const taskInputElement = this.element.querySelector(
      "input.task__input"
    ) as HTMLInputElement;

    const dataBinding = new Proxy(this._dataSource, {
      set: (target, property, value): boolean => {
        target[property] = value;

        if (property === "name") {
          taskViewElement.textContent = value;
          taskInputElement.value = value;
        }

        return true;
      },
      get: (target, property, reciever) => {
        return target[property];
      },
    });

    this._data = dataBinding;
  }
}
