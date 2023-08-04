const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
const { logger } = require("../utils/logger");

dotenv.config();

const sequelize = new Sequelize("ip_management", "root", "root", {
  host: "127.0.0.1",
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
