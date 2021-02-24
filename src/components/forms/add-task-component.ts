import Task from "models/task";
import { UIComponent } from "../ui-component";

export type CreateTaskHandler = (createTask: Task) => void;

export default class AddTaskFormComponent extends UIComponent {
  _createdTaskHandlers: Array<CreateTaskHandler> = [];

  set onCreatedTask(value: CreateTaskHandler) {
    this._createdTaskHandlers.push(value);
  }
  private invokeCreatedTaskHandlers(createTask: Task) {
    this._createdTaskHandlers.map((handler) => {
      handler(createTask);
    });
  }

  get submitButton(): HTMLButtonElement {
    return this.element.querySelector(".add-task__button");
  }

  get inputTaskNameElement(): HTMLInputElement {
    return this.element.querySelector("input#add-task");
  }

  get addTaskFormElement(): HTMLFormElement {
    return this.element.querySelector("form.add-task__form");
  }

  constructor() {
    super();
    this.initEventHandlers();
  }

  initEventHandlers() {
    this.addTaskFormElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const newTask: Task = {
        name: this.inputTaskNameElement.value,
      };
      this.invokeCreatedTaskHandlers(newTask);
      (<HTMLFormElement>evt.target).reset();
    });
  }

  _getTemplate(): string {
    return `
        <section class="add-task">
        <h2 class="visually-hidden">Добавить задачу</h2>
        <form class="add-task__form" aria-label="Форма добавления задачи">
          <div class="add-task__input-wrapper">
          <label for="add-task">Новая задача</label>
            <input type="text" name="task-name" id="add-task" placeholder="Название задачи..." required>
          </div>
          <button class="add-task__button button" type="submit">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10.0833" y="3.66663" width="1.83333" height="14.6667" fill="white" />
              <rect x="18.3333" y="10.0833" width="1.83333" height="14.6667" transform="rotate(90 18.3333 10.0833)"
                fill="white" />
            </svg>
            <span>Добавить</span>
          </button>
        </form>
      </section>        
    `;
  }
}
