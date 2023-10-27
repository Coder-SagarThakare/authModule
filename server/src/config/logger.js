const winston = require("winston");
const config = require("./config");
const path = require("path");
const { timeStamp } = require("console");

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
    winston.format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
    winston.format.printf(
      ({ level, message, timestamp, label }) =>
        `${timestamp} : ${level} : ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      timestamp: true,
      stderrLevels: ["error"],
    }),
    new winston.transports.File({
      filename: "combined.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "error.log",
      level: "error",
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
