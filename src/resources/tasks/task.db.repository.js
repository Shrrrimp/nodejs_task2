const Task = require('./task.model');

const getAll = boardId => {
  return Task.find({ boardId });
};

const getTask = async (boardId, id) => {
  return Task.findById(id);
};

const addTask = task => {
  return Task.create(task);
};

const deleteTask = async (boardId, id) => {
  return (await Task.deleteOne({ _id: id })).deletedCount;
};

const deleteAll = async id => {
  return Task.deleteMany({ boardId: id });
};

const editTask = async (id, taskInfo) => {
  return Task.findByIdAndUpdate({ _id: id }, taskInfo, {
    new: true,
    useFindAndModify: false
  });
};

const updateUserInfo = async id => {
  return Task.updateMany({ userId: id }, { userId: null });
};

module.exports = {
  getAll,
  getTask,
  addTask,
  deleteTask,
  editTask,
  deleteAll,
  updateUserInfo
};
