const uuid = require('uuid');

class Task {
  constructor(
    id = uuid(),
    title = 'task1',
    order = 0,
    description = "I'm description",
    userId = null,
    boardId = null,
    columnId = null
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = { Task };
