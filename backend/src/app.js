const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const morganMiddleware = require("./middlewares/morgan.middleware");
require("dotenv").config();

//Initializing app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(morgan("dev"));
app.use(morganMiddleware);
app.use(cors());

// API URL PATHS
app.use("/api/auth", require("./Route/auth.route"));
app.use("/api/", require("./Route/ipManage.route"));

// Index path
app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "API working fine",
    },
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

module.exports = app;
