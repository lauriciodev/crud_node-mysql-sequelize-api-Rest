const { response } = require("express");
const express = require("express");
const userModel = require("./database/models/users");
const loginModel = require("./database/models/login");
const router = express.Router();
const jwt = require("jsonwebtoken");

const jwtSecret = "lauriciomestreweb";

//middleware

function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    let bearer = authToken.split(" ");
    let token = bearer[1];

    jwt.verify(token, jwtSecret, (erro, data) => {
      if (erro) {
        res.status(401);
        res.json({ erro: "token invalido" });
      } else {
        req.token = token;
        req.loggedUser = {
          email: data.email,
        };
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ erro: "token invalido" });
  }
}

//enviando dados para o banco
router.post("/user", auth, (req, res) => {
  let { nome, idade, email } = req.body;
  userModel
    .create({
      nome: nome,
      idade: idade,
      email: email,
    })
    .then((resolve) => {
      res.json(resolve);
      res.sendStatus(200);
    })
    .catch((erro) => {
      res.sendStatus(400);
    });
});

//rescebendo dados do banco

router.get("/users", auth, (req, res) => {
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

router.get("/user/:id", auth, (req, res) => {
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
router.delete("/user/:id", auth, (req, res) => {
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

router.put("/user/:id", auth, (req, res) => {
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

router.post("/login", auth, (req, res) => {
  let { email, password } = req.body;

  loginModel
    .create({
      email: email,
      password: password,
    })
    .then((response) => {
      res.status(200);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(400);
    });
});

router.post("/auth", (req, res) => {
  let { email, password } = req.body;

  if (email != undefined) {
    loginModel
      .findOne({
        where: {
          email: email,
        },
      })
      .then((response) => {
        if (response != undefined) {
          if (response.password == password) {
            jwt.sign(
              { email: email },
              jwtSecret,
              { expiresIn: "48h" },
              (erro, token) => {
                if (erro) {
                  res.status(400);
                  res.json({ erro: "falha interna" });
                } else {
                  res.status(200);
                  res.json({ token: token });
                }
              }
            );
          } else {
            res.status(401);
            res.json({ erro: "credenciais inválidas" });
          }
        } else {
          res.status(404);
          res.json({ err: "o email inserido não pode ser encontrado!" });
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  } else {
    res.status(404);
    res.json({ err: "o email inserido não pode ser encontrado!" });
  }
});

module.exports = router;
