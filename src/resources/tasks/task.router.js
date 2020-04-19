const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');
const schema = require('./task.schema');
const validate = require('../../helpers/validation');
const { ErrorHandler } = require('../../helpers/error-handler');
const { catchErrors } = require('../../helpers/catch-errors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boardId = req.params.boardId;
    const tasks = await tasksService.getAll(boardId);

    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const boardId = req.params.boardId;
    const task = await tasksService.getTask(boardId, id);

    if (!task) {
      throw new ErrorHandler(404, `Task with id ${id} is not found`);
    }
    res.json(Task.toResponse(task));
  })
);

router.post(
  '/',
  validate.validateSchema(schema.postSchema),
  async (req, res) => {
    const data = req.body;
    const boardId = req.params.boardId;

    data.boardId = boardId;
    const task = await tasksService.addTask(data);
    res.json(Task.toResponse(task));
  }
);

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
    taskInfo.boardId = boardId;

    const task = await tasksService.editTask(id, taskInfo);

    if (!task) {
      throw new ErrorHandler(404, `Task with id ${id} is not found`);
    }
    res.json(Task.toResponse(task));
  })
);

module.exports = router;
