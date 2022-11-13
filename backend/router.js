const { response } = require("express");
const express = require("express");
const userModel = require("./database/models/users");
const loginModel = require("./database/models/login");
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

//login model

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  loginModel
    .create({
      email: email,
      password: password,
    })
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((erro) => {
      console.log(erro);
      res.sendStatus(400);
    });
});

router.post("/auth", (req, res) => {
  let { email, password } = req.body;

  if (email != undefined) {
    let user = loginModel
      .findOne({
        where: {
          email: email,
        },
      })
      .then((response) => {
        if (response) {
          if (response.password == password) {
            res.json({ token: "token de auth" });
            res.sendStatus(200);
          } else {
            res.sendStatus(401);
            res.json({ erro: "credenciais inválidas" });
          }
        } else {
          res.sendStatus(404);
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  } else {
    res.sendStatus(200);
    res.json({ err: "o email inserido não pode ser encontrado!" });
  }
});

module.exports = router;
