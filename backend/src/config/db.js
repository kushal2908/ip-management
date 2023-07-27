require("dotenv").config({ path: ".env" });
const { Sequelize } = require("sequelize");
const { logger } = require("../utils/logger");

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: "mysql",
// });

const sequelize = new Sequelize("ip_manage", "root", "admin", {
  host: "127.0.0.1",
  dialect: "mysql",
});

const dbConn = async () => {
  try {
    sequelize.authenticate();
    logger.info("DB Connected");
  } catch (err) {
    logger.error("DB Connection error! :" + err);
  }
};

dbConn();
module.exports = { sequelize, dbConn };
