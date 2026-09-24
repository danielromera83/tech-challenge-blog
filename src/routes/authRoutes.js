const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { autenticar } = require("../middleware/authMiddleware");

// Login público
router.post("/auth/login", authController.login);

// Verifica a sessão atual
router.get("/auth/me", autenticar, authController.me);

// Encerra a sessão
router.post("/auth/logout", authController.logout);

module.exports = router;
