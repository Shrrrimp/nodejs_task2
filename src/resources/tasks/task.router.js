const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const schema = require('./task.schema');
const uuid = require('uuid');
const validate = require('../../helpers/validation');

router.route('/').get(async (req, res) => {
  const boardId = req.params.boardId;
  const tasks = await tasksService.getAll(boardId);

  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const boardId = req.params.boardId;
  const task = await tasksService.getTask(boardId, id);

  if (task === undefined) {
    res.status(404).json({ message: `Task with id ${id} is not found` });
  }
  res.json(task);
});

router.post('/', validate.validateSchema(schema.postSchema), (req, res) => {
  const task = req.body;
  const boardId = req.params.boardId;

  task.id = uuid();
  task.boardId = boardId;
  tasksService.addTask(task);
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const boardId = req.params.boardId;
  const isDeleted = await tasksService.deleteTask(boardId, id);

  if (!isDeleted) {
    res.status(404).json({ message: `Task with id ${id} is not found` });
  } else {
    res.sendStatus(204);
  }
});

router.put(
  '/:id',
  validate.validateSchema(schema.putSchema),
  async (req, res) => {
    const id = req.params.id;
    const boardId = req.params.boardId;
    const taskInfo = req.body;

    const task = await tasksService.editTask(boardId, id, taskInfo);

    if (task === undefined) {
      res.status(404).json({ message: `Task with id ${id} is not found` });
    }
    res.json(task);
  }
);

module.exports = router;
