import TasksBase from "models/tasksBase";

export const tasks: TasksBase = {
  backlog: [
    { name: "Test Task 0-1" },
    { name: "Test Task 0-2" },
    { name: "Test Task 0-3" },
  ],
  processing: [
    { name: "Test Task 1-1" },
    { name: "Test Task 1-2" },
    { name: "Test Task 1-3" },
  ],
  done: [],
  basket: [{ name: "Test Task 3-1" }],
};
