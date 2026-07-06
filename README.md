# Tech Challenge Blog API

API REST desenvolvida em Node.js utilizando Express, Prisma ORM e PostgreSQL para gerenciamento de posts de um blog.

O projeto foi desenvolvido seguindo uma arquitetura em camadas (Routes → Controllers → Services → Prisma → PostgreSQL), promovendo organização, manutenção e escalabilidade.

---

# Tecnologias Utilizadas

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Docker (PostgreSQL)
- Dotenv

---

# Arquitetura

```
Cliente
   │
   ▼
Express
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

---

# Estrutura do Projeto

```
tech-challenge-blog
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   └── postController.js
│   │
│   ├── prisma/
│   │   └── client.js
│   │
│   ├── routes/
│   │   └── postRoutes.js
│   │
│   ├── services/
│   │   └── postService.js
│   │
│   ├── tests/
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── docker-compose.yml
├── package.json
└── README.md
```

---

# Pré-requisitos

Antes de executar o projeto, tenha instalado:

- Node.js 20+
- Docker Desktop
- PostgreSQL (via Docker)

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/tech-challenge-blog.git
```

Entre na pasta:

```bash
cd tech-challenge-blog
```

Instale as dependências:

```bash
npm install
```

---

# Configuração do Banco

Suba o container do PostgreSQL:

```bash
docker-compose up -d
```

Configure o arquivo `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/blog"
PORT=3000
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

---

# Executando a aplicação

Modo normal:

```bash
npm start
```

Modo desenvolvimento:

```bash
npm run dev
```

Servidor:

```
http://localhost:3000
```

---

# Endpoints

## Listar Posts

GET

```
/posts
```

---

## Buscar por ID

GET

```
/posts/:id
```

Exemplo:

```
/posts/1
```

---

## Buscar por Palavra-chave

GET

```
/posts/search?termo=API
```

Pesquisa nos campos:

- título
- conteúdo
- autor

---

## Criar Post

POST

```
/posts
```

Body:

```json
{
  "titulo": "API REST",
  "conteudo": "Primeiro post",
  "autor": "Daniel"
}
```

---

## Editar Post

PUT

```
/posts/:id
```

Body:

```json
{
  "titulo": "Novo título",
  "conteudo": "Novo conteúdo",
  "autor": "Daniel"
}
```

---

## Excluir Post

DELETE

```
/posts/:id
```

---

# Modelo de Dados

Tabela Post

| Campo | Tipo |
|--------|------|
| id | Integer |
| titulo | String |
| conteudo | String |
| autor | String |
| createdAt | DateTime |

---

# Scripts

Instalar dependências

```bash
npm install
```

Executar aplicação

```bash
npm start
```

Modo desenvolvimento

```bash
npm run dev
```

Executar migrations

```bash
npm run prisma:migrate
```

Gerar Prisma Client

```bash
npm run prisma:generate
```

Abrir Prisma Studio

```bash
npm run prisma:studio
```

---

# Tratamento de Erros

A API realiza validações para:

- Campos obrigatórios
- ID inválido
- Post inexistente
- Pesquisa sem termo informado
- Erros internos do servidor

---

# Funcionalidades

- Cadastro de posts
- Consulta de posts
- Consulta por ID
- Busca por palavra-chave
- Atualização de posts
- Exclusão de posts
- Integração com PostgreSQL
- ORM Prisma
- Arquitetura em camadas

---

# Autor

Daniel Romera

Tech Challenge – Desenvolvimento de API REST utilizando Node.js, Express, Prisma ORM e PostgreSQL.