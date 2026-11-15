const bcrypt = require("bcryptjs");

const prisma = require("../prisma/client");

async function listarPorRole(role, page = 1, limit = 10) {
  const pagina = Math.max(Number(page) || 1, 1);
  const limite = Math.min(Math.max(Number(limit) || 10, 1), 100);
  const skip = (pagina - 1) * limite;

  const [usuarios, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        role,
      },
      skip,
      take: limite,
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }),

    prisma.user.count({
      where: {
        role,
      },
    }),
  ]);

  return {
    data: usuarios,
    pagination: {
      page: pagina,
      limit: limite,
      total,
      totalPages: Math.ceil(total / limite),
    },
  };
}

async function buscarPorId(id, role) {
  return prisma.user.findFirst({
    where: {
      id,
      role,
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function criar({ email, password, role }) {
  const emailNormalizado = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 12);

  return prisma.user.create({
    data: {
      email: emailNormalizado,
      password: passwordHash,
      role,
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function atualizar(id, role, { email, password }) {
  const usuario = await prisma.user.findFirst({
    where: {
      id,
      role,
    },
  });

  if (!usuario) {
    return null;
  }

  const data = {};

  if (email) {
    data.email = email.trim().toLowerCase();
  }

  if (password) {
    data.password = await bcrypt.hash(password, 12);
  }

  return prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function excluir(id, role) {
  const usuario = await prisma.user.findFirst({
    where: {
      id,
      role,
    },
  });

  if (!usuario) {
    return null;
  }

  return prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}

module.exports = {
  listarPorRole,
  buscarPorId,
  criar,
  atualizar,
  excluir,
};