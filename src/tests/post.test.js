const request = require("supertest");
const app = require("../app");
const prisma = require("../prisma/client");

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
    test("POST /posts sem dados obrigatórios deve retornar 400", async () => {
        const response = await request(app)
            .post("/posts")
            .send({});
        expect(response.statusCode).toBe(400);
    });
    test("GET /posts/:id deve retornar um post existente", async () => {

    // Cria um post para o teste
        const criado = await request(app)
            .post("/posts")
            .send({
                titulo: "Post de teste",
                conteudo: "Conteúdo de teste",
                autor: "Daniel"
            });

        expect(criado.statusCode).toBe(201);

        const id = criado.body.id;

    // Busca o post criado
        const response = await request(app).get(`/posts/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.titulo).toBe("Post de teste");
    });
    test("GET /posts/search deve retornar uma lista", async () => {

        await request(app)
            .post("/posts")
            .send({
                titulo: "Node.js",
                conteudo: "Aprendendo testes",
                autor: "Daniel"
            });

        const response = await request(app).get("/posts/search?termo=Node");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
afterAll(async () => {
    await prisma.$disconnect();
});