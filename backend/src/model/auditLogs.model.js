const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const AuditLogs = sequelize.define("AuditLogs", {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  log: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

AuditLogs.sync();
module.exports = AuditLogs;
