const { Sequelize } = require("sequelize");

module.exports = new Sequelize("shop", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});
