const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const getTask = (boardId, id) => tasksRepo.getTask(boardId, id);
const addTask = task => tasksRepo.addTask(task);
const deleteTask = (boardId, id) => tasksRepo.deleteTask(boardId, id);
const editTask = (id, taskInfo) => tasksRepo.editTask(id, taskInfo);

const deleteAll = boardId => tasksRepo.deleteAll(boardId);
const updateUserInfo = userid => tasksRepo.updateUserInfo(userid);

module.exports = {
  getAll,
  getTask,
  addTask,
  deleteTask,
  editTask,
  deleteAll,
  updateUserInfo
};
