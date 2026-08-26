const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Tech Challenge Blog está em execução!"
  });
});

app.use(postRoutes);

module.exports = app;