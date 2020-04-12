const { logger } = require('./helpers/logger');

process
  .on('unhandledRejection', err => {
    logger.error({ statusCode: 500, message: err.message });
  })
  .on('uncaughtException', err => {
    logger.error({ statusCode: 500, message: err.message });
    const { exit } = process;
    exit(1);
  });

const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
