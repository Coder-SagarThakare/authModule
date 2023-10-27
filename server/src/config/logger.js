const winston = require("winston");
const config = require("./config");
const path = require("path");

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    console.log(info.stack);
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

module.exports = logger;

/**

 * SUBFORMATS:
 *
 * winston.format.splat():
 * This format enables string interpolation for log messages.
 *
 * winston.format.printf(...):
 * This format defines how each log entry should be formatted.
 *
 * Transports define where the log messages will be sent.
 */
