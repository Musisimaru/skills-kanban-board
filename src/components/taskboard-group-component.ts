import Task from "models/task";
import { createElement } from "utils";
import { TaskboardItemComponent } from "./taskboard-item-component";
import { UIComponent } from "./ui-component";

export class TaskboardGroupComponent extends UIComponent {
    _data: Array<Task>;
    _internalName: string;
    _displayName:string;
    constructor(internalName:string, displayName:string, tasks: Array<Task>) {        
        super();
        this._data = tasks;
        this._internalName = internalName;
        this._displayName = displayName;
        
        this._element = createElement(this._getTemplate());
        const taskboardList = this._element.querySelector('.taskboard__list');
        const emptyItem = new TaskboardItemComponent(null);
        if(this._data.length !== 0){            
            emptyItem.element.classList.add('hidden-block');
        }

        taskboardList.append(emptyItem.element);

        this._data.map((task) => {
            const taskItem = new TaskboardItemComponent(task);
            taskboardList.append(taskItem.element);
        });
        
    }

    _getTemplate():string{
        return `
        <article class="taskboard__group taskboard__group--${this._internalName}">
          <h3 class="taskboard__group-heading taskboard__group-heading--${this._internalName}">${this._displayName}</h3>
          <div class="taskboard__list">
          </div>
        </article>        
        `;
    }

}