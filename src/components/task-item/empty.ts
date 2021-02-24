import TaskboardItemComponent from "./component";

export default class EmptyTaskComponent extends TaskboardItemComponent {
  constructor() {
    super(null);
  }

  get template(): string {
    return `
        <div class="taskboard__item task task--empty">
            <p>Перетащите карточку</p>
        </div>`;
  }
}
