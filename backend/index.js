const express = require("express");
const app = express();

app.listen(3000, (erro) => {
  if (erro) {
    console.log("erro ao execultar");
  } else {
    console.log("servidor online!");
  }
});
