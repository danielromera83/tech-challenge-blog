const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({
      erro: "Usuário não autenticado."
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      erro: "Configuração de autenticação inválida."
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: Number(payload.sub),
      email: payload.email,
      role: payload.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      erro: "Sessão inválida ou expirada."
    });
  }
}

function autorizarProfessor(req, res, next) {
  if (!req.user || req.user.role !== "PROFESSOR") {
    return res.status(403).json({
      erro: "Acesso permitido apenas para professores."
    });
  }

  next();
}

module.exports = {
  autenticar,
  autorizarProfessor
};
