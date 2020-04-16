const { logger } = require('./helpers/logger');
const { connectToDB } = require('./db/db.client');

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

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
