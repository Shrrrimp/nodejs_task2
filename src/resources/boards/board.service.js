const boardsRepo = require('./board.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getBoard = id => boardsRepo.getBoard(id);
const addBoard = board => boardsRepo.addBoard(board);
const deleteBoard = async id => {
  await taskService.deleteAll(id);
  return boardsRepo.deleteBoard(id);
};

const editBoard = (id, boardInfo) => {
  return boardsRepo.editBoard(id, boardInfo);
};

module.exports = { getAll, getBoard, addBoard, deleteBoard, editBoard };
