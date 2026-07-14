const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const autenticar = require("../middleware/authMiddleware");


// --- ROTAS PÚBLICAS (Acessíveis por Alunos e Professores) ---

// 1. BUSCAR POR TERMO (Deve ficar acima de /posts/:id)
router.get("/posts/search", postController.buscarPorTermo);

// 2. LISTAR POSTS 
router.get("/posts", postController.listar);

// 3. BUSCAR POR ID
router.get("/posts/:id", postController.buscar);

// --- ROTAS PRIVADAS (Apenas Docentes Autenticados) ---

// 4. CRIAR
router.post("/posts", autenticar, postController.criar);

// 5. EDITAR
router.put("/posts/:id", autenticar, postController.editar);

// 6. EXCLUIR
router.delete("/posts/:id", autenticar, postController.excluir);

module.exports = router;