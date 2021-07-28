const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Product = db.define(
  "product",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Product;
