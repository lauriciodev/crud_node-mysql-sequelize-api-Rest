const { response } = require("express");
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

//rescebendo dados do banco

router.get("/users", (req, res) => {
  userModel
    .findAll()
    .then((response) => {
      res.json(response);
      res.sendStatus(200);
    })
    .catch((erro) => {
      console.log(erro);
    });
});

router.get("/user/:id", (req, res) => {
  userModel
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((response) => {
      res.statusCode = 200;
      res.json(response);
    })
    .catch((erro) => {
      res.sendStatus(400);
    });
});

//deletando dados
router.delete("/user/:id", (req, res) => {
  userModel
    .destroy({ where: { id: req.params.id } })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((erro) => {
      res.sendStatus(400);
    });
});

//atualizando dados;

router.put("/user/:id", (req, res) => {
  let { nome, idade, email } = req.body;
  userModel
    .update(
      {
        nome: nome,
        idade: idade,
        email: email,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((erro) => {
      res.sendStatus(400);
    });
});

module.exports = router;
