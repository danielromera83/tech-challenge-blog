const express = require("express");

const router = express.Router();

const { professores, alunos } = require("../controllers/userController");
const {
  autenticar,
  autorizarProfessor,
} = require("../middleware/authMiddleware");

const somenteProfessor = [autenticar, autorizarProfessor];

// --- PROFESSORES ---

router.get("/professores", ...somenteProfessor, professores.listar);
router.post("/professores", ...somenteProfessor, professores.criar);

router.get("/professores/:id", ...somenteProfessor, professores.buscar);
router.put("/professores/:id", ...somenteProfessor, professores.atualizar);
router.delete("/professores/:id", ...somenteProfessor, professores.excluir);

// --- ALUNOS ---

router.get("/alunos", ...somenteProfessor, alunos.listar);
router.post("/alunos", ...somenteProfessor, alunos.criar);

router.get("/alunos/:id", ...somenteProfessor, alunos.buscar);
router.put("/alunos/:id", ...somenteProfessor, alunos.atualizar);
router.delete("/alunos/:id", ...somenteProfessor, alunos.excluir);

module.exports = router;