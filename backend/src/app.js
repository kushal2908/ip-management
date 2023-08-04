const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const morganMiddleware = require("./middlewares/morgan.middleware");

//Initializing app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(morganMiddleware);

// API URL PATHS
app.use("/api/auth", require("./Route/auth.route"));
app.use("/api/", require("./Route/ipManage.route"));

// Index path
app.get("/", (req, res) => {
  res.status(200).send("IPForte API V1");
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

module.exports = app;
