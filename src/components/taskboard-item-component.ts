import Task from "models/task";
import { getNextElement, getTaskGroup } from "utils";
import { UIComponent } from "./ui-component";

export class TaskboardItemComponent extends UIComponent {
  _data: Task;

  get isEmpty(): boolean {
    return this._data === null;
  }

  constructor(task: Task) {
    super();
    this._data = task;

    this.initEventHandlers();
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
            <p class="task__view">${this._data.name}</p>
            <input class="task__input" type="text" value="${this._data.name}">
        </div>
        <button class="task__edit" type="button" aria-label="Изменить"></button>
    </div>`;
  }

  initEventHandlers() {
    (<HTMLElement>this.element).addEventListener(`dragstart`, function (evt) {
      this.classList.add(`task--dragged`);
    });

    (<HTMLElement>this.element).addEventListener(`dragend`, function (evt) {
      this.classList.remove(`task--dragged`);
    });

    (<HTMLElement>this.element).addEventListener(`dragover`, function (evt) {
      evt.preventDefault();

      const activeElement = document.querySelector(
        `.taskboard__item.task--dragged`
      );
      const isMoveable =
        activeElement !== this && this.classList.contains(`taskboard__item`);

      if (!isMoveable) {
        return;
      }

      const nextElement = getNextElement(evt.clientY, this);

      if (
        (nextElement && activeElement === nextElement.previousElementSibling) ||
        activeElement === nextElement
      ) {
        return;
      }


      const tasksListElement = this.parentElement;

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
      }

      const nextTaskGroup = getTaskGroup(tasksListElement);
      const activeTaskGroup = getTaskGroup(activeElement.parentElement);
      activeElement.classList.replace(`task--${activeTaskGroup}`, `task--${nextTaskGroup}`)      
      tasksListElement.insertBefore(activeElement, nextElement);
    });
  }
}
