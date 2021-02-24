import AddTaskFormComponent from "components/forms/add-task-component";
import { Taskboard } from "components/taskboard";
import { tasks } from "data";
import TasksBase from "models/tasksBase";
import HeaderComponent from "./components/header-component";

export default class App {
  _name: string;
  _data: TasksBase;

  constructor(applicationName: string) {
    this._name = applicationName;
    this._data = this.getData();
  }
  public init(rootElementSelector) {
    const bodyElement = <HTMLElement>document.querySelector(rootElementSelector);
    const appInner = bodyElement.querySelector('.board-app__inner');

    const header = new HeaderComponent(this._name);
    const headerElement = header.element;


    bodyElement.prepend(headerElement);
    const taskBoard = new Taskboard(this._data);
    const taskBoardElement = taskBoard.element;
    appInner.append(taskBoardElement);

    const addForm = new AddTaskFormComponent();
    addForm.onCreatedTask = (createdTask) =>{
      taskBoard.addNewTask(createdTask);
    }
    appInner.prepend(addForm.element);
    
  }

  public getData(): TasksBase{
    return tasks;
  }
}
