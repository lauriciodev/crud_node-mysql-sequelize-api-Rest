const express = require("express");
const app = express();
const connection = require("./database/connection");
const userModel = require("./database/models/users");
const loginModel = require("./database/models/login");
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ encoded: true }));
app.use(express.json());

connection
  .authenticate()
  .then((resoleve) => {
    console.log("banco de dados conectado com sucesso!");
  })
  .catch((erro) => {
    console.log(erro);
  });
app.use("/", require("./router"));

app.listen(3000, (erro) => {
  if (erro) {
    console.log("erro ao execultar");
  } else {
    console.log("servidor online!");
  }
});
