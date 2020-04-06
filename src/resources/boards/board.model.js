const uuid = require('uuid');

class Column {
  constructor(id = uuid(), title = 'column1', order = 0) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor(id = uuid(), title = 'board1', columns = [new Column()]) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = { Board, Column };
