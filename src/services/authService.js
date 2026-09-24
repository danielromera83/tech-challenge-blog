const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

async function autenticar(email, password) {
  const emailNormalizado = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email: emailNormalizado
    }
  });

  if (!user) {
    return null;
  }

  const senhaValida = await bcrypt.compare(password, user.password);

  if (!senhaValida) {
    return null;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não configurado.");
  }

  const token = jwt.sign(
    {
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      subject: String(user.id),
      expiresIn: "1h"
    }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
}

module.exports = {
  autenticar
};
