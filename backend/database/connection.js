const Sequelize = require("sequelize");
const connection = new Sequelize("users", "root", "berlim2062", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
