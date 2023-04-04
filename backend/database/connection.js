const Sequelize = require("sequelize");
const connection = new Sequelize("users", "root", "senha", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
