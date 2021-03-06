const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const checkToken = require('./resources/login/login.middleware');
const { logger } = require('./helpers/logger');
const { handleError } = require('./helpers/error-handler');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('*', (req, res, next) => {
  const { originalUrl, method, query, body } = req;
  const message = `url: ${originalUrl}, method: ${method}, params: ${JSON.stringify(
    query
  )}, body: ${JSON.stringify(body)}`;

  logger.log('info', message);
  next();
});

app.use('/users', checkToken, userRouter);
app.use('/boards', checkToken, boardRouter);
app.use('/boards/:boardId/tasks', checkToken, taskRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
  next();
});

module.exports = app;
