import Task from './task';

export default class TasksBase {
  backlog: Array<Task>;
  processing: Array<Task>;
  done: Array<Task>;
  basket: Array<Task>;
}
