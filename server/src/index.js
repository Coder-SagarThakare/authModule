// Node App starts from here

const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");
const logger = require("./config/logger");
let server;

logger.warn("--------------------------------------");
logger.info("Node Envoirenment : %s", config.env);


logger.error('error information');
logger.info('info information');
logger.warn('warn information');

// connect to database
// mongoose
//   .connect(config.mongoose.url, config.mongoose.options)
//   .then(async () => {
//     await logger.info(`connected to MongoDB => ${config.mongoose.url}`);
//   });

// server = app.listen(
//   config.port,
//   logger.info(`Node server listening on port => ${config.port}`)
// );

// Manually close the server if an unhandled exception occurs
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

// Listen to unhandled exceptions and call handler when such exceptions occur
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// Close the server if command received to close the server. 
// E.g. Node process killed by OS or by the user using kill, pkill, task manager, etc.
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});


logger.warn("--------------------------------------");
