const morgan = require("morgan");
const { logger } = require("../utils/logger");

const morganMiddleware = morgan(
  function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      req?._remoteAddress?.split(":")[3],
    ].join(" ");
  },
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);

module.exports = morganMiddleware;

// user:,
// method: tokens.method(req, res),
// url: tokens.url(req, res),
// status: Number.parseFloat(tokens.status(req, res)),
// content_length: tokens.res(req, res, "content-length"),
// response_time: Number.parseFloat(tokens["response-time"](req, res)),
// ip: req?._remoteAddress?.split(":")[3],
