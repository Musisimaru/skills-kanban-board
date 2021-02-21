import TaskboardComponent from "components/taskboard-component";
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
    const headerElement = header.getElement();

    bodyElement.prepend(headerElement);
    const taskBoard = new TaskboardComponent(this._data);
    const taskBoardElement = taskBoard.getElement();
    appInner.append(taskBoardElement);
  }

  public getData(): TasksBase{
    return tasks;
  }
}
