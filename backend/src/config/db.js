const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
const { logger } = require("../utils/logger");

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

const dbConn = async () => {
  try {
    sequelize.authenticate();
    console.log("DB Connected");
  } catch (err) {
    logger.error("DB Connection error! :" + err);
  }
};

dbConn();
module.exports = { sequelize, dbConn };
