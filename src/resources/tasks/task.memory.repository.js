const Task = require('./task.model');
const uuid = require('uuid');

const tasks = [
  new Task.Task(uuid(), 'task2', 1, 'description', null, '1', '1'),
  new Task.Task(uuid(), 'task3', 1, 'description', null, '1', '2'),
  new Task.Task(uuid(), 'task4', 1, 'description', null, '2', '1')
];

const getAll = async boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

const getTask = async (boardId, id) => {
  const boardTasks = tasks.filter(task => task.boardId === boardId);
  return boardTasks.find(task => task.id === id);
};

const addTask = task => {
  tasks.push(task);
};

const deleteTask = async (boardId, id) => {
  const toDelete = await getTask(boardId, id);
  if (!toDelete) return false;

  const index = tasks.indexOf(toDelete);
  console.log(index);
  tasks.splice(index, 1);
  return true;
};

const editTask = async (boardId, id, taskInfo) => {
  const toEdit = await getTask(boardId, id);
  if (!toEdit) return toEdit;

  toEdit.title = taskInfo.title;
  toEdit.id = taskInfo.id;
  toEdit.order = taskInfo.order;
  toEdit.description = taskInfo.description;
  toEdit.userId = taskInfo.userId;
  toEdit.boardId = taskInfo.boardId;
  toEdit.columnId = taskInfo.columnId;

  return toEdit;
};

module.exports = { getAll, getTask, addTask, deleteTask, editTask };
