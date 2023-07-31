const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const IpLists = sequelize.define(
  "Iplists",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE(6),
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  { timestamps: false }
);

IpLists.sync();
module.exports = IpLists;
