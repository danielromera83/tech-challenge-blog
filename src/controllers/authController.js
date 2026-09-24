const authService = require("../services/authService");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (
    typeof email !== "string" ||
    typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        erro: "E-mail e senha são obrigatórios."
    });
    }

    const resultado = await authService.autenticar(email, password);

    if (!resultado) {
      return res.status(401).json({
        erro: "E-mail ou senha inválidos."
      });
    }

    res.cookie("auth_token", resultado.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000
    });

    return res.json({
      mensagem: "Login realizado com sucesso.",
      user: resultado.user
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro interno ao realizar login."
    });
  }
}

function logout(req, res) {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return res.json({
    mensagem: "Logout realizado com sucesso."
  });
}

function me(req, res) {
  return res.json({
    user: req.user
  });
}

module.exports = {
  login,
  logout,
  me
};
