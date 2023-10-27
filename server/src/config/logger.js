//winston dependencies
const { createLogger, format } = require("winston");
const { combine, timestamp, splat, colorize, uncolorize, printf } = format;
const { Console, File } = require("winston/lib/winston/transports");

const config = require("./config");
const path = require("path");

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    console.log(info.stack);
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: combine(
    enumerateErrorFormat(),
    config.env === "development" ? colorize() : uncolorize(),
    splat(),
    timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
    printf(
      ({ level, message, timestamp, label }) =>
        `${timestamp} : ${level} : ${message}`
    )
  ),
  transports: [
    new Console({
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
