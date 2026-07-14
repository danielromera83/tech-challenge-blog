function autenticar(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      erro: "Token não informado."
    });
  }

  if (token !== "Bearer techchallenge2026") {
    return res.status(401).json({
      erro: "Token inválido."
    });
  }

  next();
}

module.exports = autenticar;