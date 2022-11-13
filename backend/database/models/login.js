const Sequelize = require("sequelize");
const connection = require("../connection");

const loginModel = connection.define("logs", {
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

loginModel.sync({ force: false });

module.exports = loginModel;
