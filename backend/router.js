const express = require("express");
const userModel = require("./database/models/users");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("seja bem vindo!");
});

//enviando dados para o banco
router.post("/user", (req, res) => {
  let { nome, idade, email } = req.body;
  userModel
    .create({
      nome: nome,
      idade: idade,
      email: email,
    })
    .then((resolve) => {
      res.sendStatus(200);
    })
    .catch((erro) => {
      res.sendStatus(400);
    });
});

module.exports = router;
