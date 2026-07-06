const express = require("express");

const router = express.Router();


const postController = require("../controllers/postController");



// LISTAR

router.get("/posts", postController.listar);


// CRIAR

router.post("/posts", postController.criar);


// BUSCAR POR TERMO

router.get("/posts/search", postController.buscarPorTermo);


// BUSCAR ID

router.get("/posts/:id", postController.buscar);


// EDITAR

router.put("/posts/:id", postController.editar);


// EXCLUIR

router.delete("/posts/:id", postController.excluir);



module.exports = router;