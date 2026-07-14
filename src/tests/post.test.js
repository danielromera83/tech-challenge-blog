const request = require("supertest");
const app = require("../app");
const prisma = require("../prisma/client");

const tokenValido = "Bearer techchallenge2026";

beforeAll(async () => {
    // Limpa o banco antes de começar os testes
    await prisma.post.deleteMany({});
});

afterAll(async () => {
    await prisma.$disconnect();
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

    // CORREÇÃO: Enviando o token para que passe pelo middleware e caia na validação de campos (400)
    test("POST /posts sem dados obrigatórios deve retornar 400", async () => {
        const response = await request(app)
            .post("/posts")
            .set("Authorization", tokenValido)
            .send({});
        expect(response.statusCode).toBe(400);
    });

    // CORREÇÃO: Enviando o token para permitir a criação do post antes de consultá-lo
    test("GET /posts/:id deve retornar um post existente", async () => {
        const criado = await request(app)
            .post("/posts")
            .set("Authorization", tokenValido)
            .send({
                titulo: "Post do Teste",
                conteudo: "Conteúdo do teste do Node",
                autor: "Daniel Romera"
            });

        expect(criado.statusCode).toBe(201);

        const id = criado.body.id;
        const response = await request(app).get(`/posts/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.titulo).toBe("Post do Teste");
    });

    test("GET /posts/search deve retornar uma lista", async () => {
        const response = await request(app).get("/posts/search?termo=Teste");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
