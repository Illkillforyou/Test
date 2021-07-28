const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Category = db.define(
  "category",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Category;
