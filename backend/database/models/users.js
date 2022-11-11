const Sequelize = require("sequelize");
const connection = require("../connection");

const userModel = connection.define("users", {
  nome: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  idade: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

userModel.sync({ force: false });
module.exports = userModel;
