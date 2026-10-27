process.env.JWT_SECRET =
  process.env.JWT_SECRET || "segredo-exclusivo-para-testes-automatizados";

const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../app");
const prisma = require("../prisma/client");

const PROFESSOR_ADMIN = {
  email: "professor.admin.fase4@fiap.com.br",
  password: "ProfessorAdmin123!"
};

const ALUNO_BASE = {
  email: "aluno.base.fase4@fiap.com.br",
  password: "AlunoBase123!"
};

const EMAILS_TESTE = [
  PROFESSOR_ADMIN.email,
  ALUNO_BASE.email,
  "professor.novo.fase4@fiap.com.br",
  "professor.editado.fase4@fiap.com.br",
  "aluno.novo.fase4@fiap.com.br",
  "aluno.editado.fase4@fiap.com.br"
];

async function criarUsuarioTeste({ email, password, role }) {
  const passwordHash = await bcrypt.hash(password, 4);

  return prisma.user.create({
    data: {
      email,
      password: passwordHash,
      role
    }
  });
}

async function autenticarComo(usuario) {
  const agent = request.agent(app);

  const response = await agent
    .post("/auth/login")
    .send({
      email: usuario.email,
      password: usuario.password
    });

  return {
    agent,
    response
  };
}

beforeAll(async () => {
  await prisma.user.deleteMany({
    where: {
      email: {
        in: EMAILS_TESTE
      }
    }
  });

  await criarUsuarioTeste({
    ...PROFESSOR_ADMIN,
    role: "PROFESSOR"
  });

  await criarUsuarioTeste({
    ...ALUNO_BASE,
    role: "ALUNO"
  });
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: {
      email: {
        in: EMAILS_TESTE
      }
    }
  });

  await prisma.$disconnect();
});

describe("Proteção das rotas de usuários", () => {
  test("GET /professores sem autenticação deve retornar 401", async () => {
    const response = await request(app).get("/professores");

    expect(response.statusCode).toBe(401);
  });

  test("GET /professores como ALUNO deve retornar 403", async () => {
    const { agent } = await autenticarComo(ALUNO_BASE);

    const response = await agent.get("/professores");

    expect(response.statusCode).toBe(403);
  });
});

describe("Professores API", () => {
  test("GET /professores deve retornar lista paginada", async () => {
    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent.get("/professores?page=1&limit=10");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);

    expect(response.body.pagination).toEqual(
      expect.objectContaining({
        page: 1,
        limit: 10
      })
    );

    expect(response.body.pagination.total).toBeGreaterThanOrEqual(1);
  });

  test("POST /professores deve criar professor", async () => {
    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent
      .post("/professores")
      .send({
        email: "professor.novo.fase4@fiap.com.br",
        password: "ProfessorNovo123!"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe(
      "professor.novo.fase4@fiap.com.br"
    );
    expect(response.body.role).toBe("PROFESSOR");
    expect(response.body.password).toBeUndefined();
  });

  test("POST /professores com e-mail duplicado deve retornar 409", async () => {
    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent
      .post("/professores")
      .send({
        email: "professor.novo.fase4@fiap.com.br",
        password: "OutraSenha123!"
      });

    expect(response.statusCode).toBe(409);
  });

  test("GET /professores/:id deve consultar professor", async () => {
    const professor = await prisma.user.findUnique({
      where: {
        email: "professor.novo.fase4@fiap.com.br"
      }
    });

    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent.get(
      `/professores/${professor.id}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(
      "professor.novo.fase4@fiap.com.br"
    );
    expect(response.body.password).toBeUndefined();
  });

  test("PUT /professores/:id deve atualizar professor", async () => {
    const professor = await prisma.user.findUnique({
      where: {
        email: "professor.novo.fase4@fiap.com.br"
      }
    });

    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent
      .put(`/professores/${professor.id}`)
      .send({
        email: "professor.editado.fase4@fiap.com.br"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(
      "professor.editado.fase4@fiap.com.br"
    );
  });

  test("professor autenticado não deve excluir a própria conta", async () => {
    const professor = await prisma.user.findUnique({
      where: {
        email: PROFESSOR_ADMIN.email
      }
    });

    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent.delete(
      `/professores/${professor.id}`
    );

    expect(response.statusCode).toBe(400);
  });

  test("DELETE /professores/:id deve excluir outro professor", async () => {
    const professor = await prisma.user.findUnique({
      where: {
        email: "professor.editado.fase4@fiap.com.br"
      }
    });

    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent.delete(
      `/professores/${professor.id}`
    );

    expect(response.statusCode).toBe(200);

    const professorExcluido = await prisma.user.findUnique({
      where: {
        id: professor.id
      }
    });

    expect(professorExcluido).toBeNull();
  });
});

describe("Alunos API", () => {
  test("POST /alunos deve criar aluno", async () => {
    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent
      .post("/alunos")
      .send({
        email: "aluno.novo.fase4@fiap.com.br",
        password: "AlunoNovo123!"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe(
      "aluno.novo.fase4@fiap.com.br"
    );
    expect(response.body.role).toBe("ALUNO");
    expect(response.body.password).toBeUndefined();
  });

  test("GET /alunos deve retornar lista paginada", async () => {
    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent.get("/alunos?page=1&limit=5");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.limit).toBe(5);
  });

  test("PUT /alunos/:id deve atualizar aluno", async () => {
    const aluno = await prisma.user.findUnique({
      where: {
        email: "aluno.novo.fase4@fiap.com.br"
      }
    });

    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent
      .put(`/alunos/${aluno.id}`)
      .send({
        email: "aluno.editado.fase4@fiap.com.br"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(
      "aluno.editado.fase4@fiap.com.br"
    );
  });

  test("DELETE /alunos/:id deve excluir aluno", async () => {
    const aluno = await prisma.user.findUnique({
      where: {
        email: "aluno.editado.fase4@fiap.com.br"
      }
    });

    const { agent } = await autenticarComo(PROFESSOR_ADMIN);

    const response = await agent.delete(`/alunos/${aluno.id}`);

    expect(response.statusCode).toBe(200);

    const alunoExcluido = await prisma.user.findUnique({
      where: {
        id: aluno.id
      }
    });

    expect(alunoExcluido).toBeNull();
  });
});