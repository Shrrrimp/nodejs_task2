const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const schema = require('./task.schema');
const uuid = require('uuid');
const validate = require('../../helpers/validation');
const { ErrorHandler } = require('../../helpers/error-handler');
const { catchErrors } = require('../../helpers/catch-errors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boardId = req.params.boardId;
    const tasks = await tasksService.getAll(boardId);
    if (!tasks.length) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }

    res.json(tasks);
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const boardId = req.params.boardId;
    const task = await tasksService.getTask(boardId, id);

    if (task === undefined) {
      throw new ErrorHandler(404, `Task with id ${id} is not found`);
    }
    res.json(task);
  })
);

router.post('/', validate.validateSchema(schema.postSchema), (req, res) => {
  const task = req.body;
  const boardId = req.params.boardId;

  task.id = uuid();
  task.boardId = boardId;
  tasksService.addTask(task);
  res.json(task);
});

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const boardId = req.params.boardId;
    const isDeleted = await tasksService.deleteTask(boardId, id);

    if (!isDeleted) {
      throw new ErrorHandler(404, `Task with id ${id} is not found`);
    } else {
      res.sendStatus(204);
    }
  })
);

router.put(
  '/:id',
  validate.validateSchema(schema.putSchema),
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const boardId = req.params.boardId;
    const taskInfo = req.body;

    const task = await tasksService.editTask(boardId, id, taskInfo);

    if (task === undefined) {
      throw new ErrorHandler(404, `Task with id ${id} is not found`);
    }
    res.json(task);
  })
);

module.exports = router;
