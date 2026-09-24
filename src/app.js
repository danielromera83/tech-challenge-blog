const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "http://localhost:5173,http://localhost:8080"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origem não permitida pelo CORS."));
    },
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Tech Challenge Blog está em execução!"
  });
});

app.use(authRoutes);
app.use(postRoutes);

module.exports = app;
