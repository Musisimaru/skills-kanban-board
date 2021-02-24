import TaskboardItemComponent from "./component";

export default class EmptyTrashTaskComponent extends TaskboardItemComponent{

    constructor() {
        super(null)
    }

    _getTemplate(): string {
        return `
        <div class="taskboard__item task task--empty task--empty-trash">
            <p>Корзина пуста</p>
        </div>`;
    }
}