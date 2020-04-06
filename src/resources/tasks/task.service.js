const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const getTask = (boardId, id) => tasksRepo.getTask(boardId, id);
const addTask = task => tasksRepo.addTask(task);
const deleteTask = (boardId, id) => tasksRepo.deleteTask(boardId, id);
const editTask = (boardId, id, taskInfo) =>
  tasksRepo.editTask(boardId, id, taskInfo);

module.exports = { getAll, getTask, addTask, deleteTask, editTask };
