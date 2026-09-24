process.env.JWT_SECRET =
  process.env.JWT_SECRET || "segredo-exclusivo-para-testes-automatizados";

const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../app");
const prisma = require("../prisma/client");

const PROFESSOR = {
  email: "professor.teste@fiap.com.br",
  password: "ProfessorTeste123!"
};

const ALUNO = {
  email: "aluno.teste@fiap.com.br",
  password: "AlunoTeste123!"
};

const AUTOR_TESTE = "Teste Automatizado";

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
  await prisma.post.deleteMany({
    where: {
      autor: AUTOR_TESTE
    }
  });

  await prisma.user.deleteMany({
    where: {
      email: {
        in: [PROFESSOR.email, ALUNO.email]
      }
    }
  });

  await criarUsuarioTeste({
    ...PROFESSOR,
    role: "PROFESSOR"
  });

  await criarUsuarioTeste({
    ...ALUNO,
    role: "ALUNO"
  });
});

afterAll(async () => {
  await prisma.post.deleteMany({
    where: {
      autor: AUTOR_TESTE
    }
  });

  await prisma.user.deleteMany({
    where: {
      email: {
        in: [PROFESSOR.email, ALUNO.email]
      }
    }
  });

  await prisma.$disconnect();
});

describe("Autenticação e autorização", () => {
  test("POST /auth/login deve autenticar professor", async () => {
    const { response } = await autenticarComo(PROFESSOR);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe(PROFESSOR.email);
    expect(response.body.user.role).toBe("PROFESSOR");

      const cookies = response.headers["set-cookie"];

    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain("auth_token=");
    expect(cookies[0]).toContain("HttpOnly");

  });

  test("POST /auth/login deve rejeitar senha inválida", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: PROFESSOR.email,
        password: "senha-incorreta"
      });

    expect(response.statusCode).toBe(401);
  });

  test("GET /auth/me deve retornar usuário autenticado", async () => {
    const { agent } = await autenticarComo(PROFESSOR);

    const response = await agent.get("/auth/me");

    expect(response.statusCode).toBe(200);
    expect(response.body.user.role).toBe("PROFESSOR");
  });

  test("POST /auth/logout deve encerrar a sessão", async () => {
    const { agent } = await autenticarComo(PROFESSOR);

    const logout = await agent.post("/auth/logout");

    expect(logout.statusCode).toBe(200);

    const me = await agent.get("/auth/me");

    expect(me.statusCode).toBe(401);
  });

  test("POST /posts sem autenticação deve retornar 401", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        titulo: "Post não autorizado",
        conteudo: "Não deve ser criado.",
        autor: AUTOR_TESTE
      });

    expect(response.statusCode).toBe(401);
  });

  test("POST /posts como ALUNO deve retornar 403", async () => {
    const { agent } = await autenticarComo(ALUNO);

    const response = await agent
      .post("/posts")
      .send({
        titulo: "Post do aluno",
        conteudo: "Não deve ser criado.",
        autor: AUTOR_TESTE
      });

    expect(response.statusCode).toBe(403);
  });
});

describe("Posts API", () => {
  test("GET /posts deve retornar status 200", async () => {
    const response = await request(app).get("/posts");

    expect(response.statusCode).toBe(200);
  });

  test("GET /posts/:id deve retornar 404 para post inexistente", async () => {
    const response = await request(app).get("/posts/99999");

    expect(response.statusCode).toBe(404);
  });

  test("GET /posts/search sem termo deve retornar 400", async () => {
    const response = await request(app).get("/posts/search");

    expect(response.statusCode).toBe(400);
  });

  test("POST /posts sem dados obrigatórios como PROFESSOR deve retornar 400", async () => {
    const { agent } = await autenticarComo(PROFESSOR);

    const response = await agent
      .post("/posts")
      .send({});

    expect(response.statusCode).toBe(400);
  });

  test("PROFESSOR deve criar post e GET /posts/:id deve consultá-lo", async () => {
    const { agent } = await autenticarComo(PROFESSOR);

    const criado = await agent
      .post("/posts")
      .send({
        titulo: "Post do Teste",
        conteudo: "Conteúdo do teste com autenticação JWT",
        autor: AUTOR_TESTE
      });

    expect(criado.statusCode).toBe(201);

    const response = await request(app)
      .get(`/posts/${criado.body.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.titulo).toBe("Post do Teste");
  });

  test("GET /posts/search deve retornar uma lista", async () => {
    const response = await request(app)
      .get("/posts/search?termo=Teste");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
