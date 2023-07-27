const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Users.sync();
module.exports = Users;
