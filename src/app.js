const dotenv = require("dotenv");
dotenv.config({ quiet: true });

const express = require("express");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.json({
        mensagem: "API Tech Challenge Blog está em execução!"
    });
});
app.use(postRoutes);

module.exports = app;