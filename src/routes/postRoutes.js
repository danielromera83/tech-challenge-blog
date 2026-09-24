const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const {
  autenticar,
  autorizarProfessor
} = require("../middleware/authMiddleware");

// --- ROTAS PÚBLICAS ---

router.get("/posts/search", postController.buscarPorTermo);

router.get("/posts", postController.listar);

router.get("/posts/:id", postController.buscar);

// --- ROTAS PRIVADAS: SOMENTE PROFESSORES ---

router.post(
  "/posts",
  autenticar,
  autorizarProfessor,
  postController.criar
);

router.put(
  "/posts/:id",
  autenticar,
  autorizarProfessor,
  postController.editar
);

router.delete(
  "/posts/:id",
  autenticar,
  autorizarProfessor,
  postController.excluir
);

module.exports = router;
