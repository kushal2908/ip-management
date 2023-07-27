const winston = require("winston");
require("winston-daily-rotate-file");
const fs = require("fs");
const path = require("path");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "orange",
};

winston.addColors(colors);

// Declaring folder
const transports = [
  new winston.transports.DailyRotateFile({
    filename: "logs/errors.log",
    level: "error",
  }),

  new winston.transports.DailyRotateFile({
    filename: "logs/logs.log",
  }),
];

const logger = winston.createLogger({
  level: "info",
  levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const httpLogStream = fs.createWriteStream(path.join(__dirname, "../../", "logs", "http_logs.log"));

module.exports = {
  httpLogStream,
  logger,
};
