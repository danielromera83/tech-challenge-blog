require("dotenv").config();

const bcrypt = require("bcryptjs");
const prisma = require("../src/prisma/client");

async function main() {
  const email = process.env.PROFESSOR_EMAIL?.trim().toLowerCase();
  const password = process.env.PROFESSOR_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "PROFESSOR_EMAIL e PROFESSOR_PASSWORD precisam estar definidos nas variáveis de ambiente."
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const professor = await prisma.user.upsert({
    where: { email },
    update: {
      password: passwordHash,
      role: "PROFESSOR",
    },
    create: {
      email,
      password: passwordHash,
      role: "PROFESSOR",
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  console.log("Professor configurado com sucesso:");
  console.log(professor);
}

main()
  .catch((error) => {
    console.error("Erro ao configurar professor:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
