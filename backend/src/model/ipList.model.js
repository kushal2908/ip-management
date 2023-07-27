const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const IpLists = sequelize.define("Iplists", {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ipAddress: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

IpLists.sync();
module.exports = IpLists;
