# Tech Challenge Blog — Full Stack 🚀

![Node.js](https://img.shields.io/badge/Node.js-20-green)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB)
![Vite](https://img.shields.io/badge/Vite-8.2.2-646CFF)
![Express](https://img.shields.io/badge/Express-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)
![Tests](https://img.shields.io/badge/Tests-Jest-red)
![Coverage](https://img.shields.io/badge/Coverage-68.08%25-brightgreen)
![CI](https://github.com/danielromera83/tech-challenge-blog/actions/workflows/ci.yml/badge.svg)

Aplicação Full Stack desenvolvida para o **Tech Challenge da Pós Tech em Full Stack Development — FIAP**.

O projeto evolui a API REST desenvolvida na **Fase 2** e acrescenta, na **Fase 3**, uma interface gráfica construída com **React**, permitindo que alunos consultem conteúdos publicados e que professores autenticados criem, editem e administrem posts.

A solução utiliza **React, Vite, React Router, Node.js, Express, Prisma ORM, PostgreSQL, Docker, Nginx, Jest e GitHub Actions**.

---

## Status do Projeto

🟢 **Fase 3 concluída e funcional**

### Recursos implementados

- ✅ Frontend React
- ✅ Interface responsiva
- ✅ Navegação com React Router
- ✅ Listagem de posts
- ✅ Pesquisa por palavra-chave
- ✅ Leitura completa de posts
- ✅ Login simplificado do professor
- ✅ Rotas protegidas
- ✅ Criação de posts
- ✅ Edição de posts
- ✅ Exclusão de posts
- ✅ Painel administrativo
- ✅ API REST
- ✅ PostgreSQL
- ✅ Prisma ORM
- ✅ CORS
- ✅ Docker
- ✅ Docker Compose
- ✅ Nginx
- ✅ Testes automatizados do backend
- ✅ ESLint no frontend
- ✅ Build de produção do frontend
- ✅ Integração Contínua com GitHub Actions

---

## Objetivo

Desenvolver uma aplicação Full Stack para gerenciamento de publicações de um blog educacional.

A aplicação permite que:

### Alunos e visitantes

- visualizem todos os posts;
- pesquisem posts por palavra-chave;
- acessem o conteúdo completo de uma publicação.

### Professores autenticados

- realizem login;
- criem novos posts;
- editem posts existentes;
- excluam posts;
- utilizem um painel administrativo.

---

## Arquitetura Geral

A aplicação possui frontend, backend e banco de dados separados.

```text
┌──────────────────────────────────┐
│            Navegador             │
└───────────────┬──────────────────┘
                │
                ▼
┌──────────────────────────────────┐
│        Frontend React            │
│ React + Vite + React Router      │
│ Porta 5173 (desenvolvimento)     │
│ Porta 8080 (Docker/Nginx)        │
└───────────────┬──────────────────┘
                │ HTTP / REST
                ▼
┌──────────────────────────────────┐
│        Backend Node.js           │
│        Express REST API          │
│             :3000                │
└───────────────┬──────────────────┘
                │
                ▼
┌──────────────────────────────────┐
│           Prisma ORM             │
└───────────────┬──────────────────┘
                │
                ▼
┌──────────────────────────────────┐
│         PostgreSQL 16            │
│             :5432                │
└──────────────────────────────────┘
```

---

## Arquitetura do Frontend

O frontend utiliza **React com componentes funcionais e Hooks**.

```text
React
│
├── Pages
│   ├── Home
│   ├── PostDetail
│   ├── Login
│   ├── CreatePost
│   ├── EditPost
│   └── Admin
│
├── Components
│   ├── Header
│   ├── PostCard
│   └── ProtectedRoute
│
├── Context
│   └── Autenticação
│
├── Services
│   └── Comunicação com API
│
└── React Router
    ├── Rotas públicas
    └── Rotas protegidas
```

### Fluxo de comunicação

```text
Página React
    │
    ▼
services/api.js
    │
    ▼
HTTP Request
    │
    ▼
Express Routes
    │
    ├── Middleware de autenticação
    │   somente nas operações protegidas
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Prisma Client
    │
    ▼
PostgreSQL
```

---

## Arquitetura do Backend

O backend segue uma arquitetura em camadas.

### Routes

Responsáveis pelo mapeamento dos endpoints HTTP.

### Middleware

Responsável pela validação do token nas operações protegidas.

### Controllers

Recebem as requisições, validam dados e formatam as respostas HTTP.

### Services

Concentram a lógica de acesso e manipulação dos dados.

### Prisma Client

Realiza a comunicação entre a aplicação e o PostgreSQL.

---

## Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| React 19.2.8 | Construção da interface |
| React Router DOM 7.18.2 | Navegação entre páginas |
| Vite 8.2.2 | Ambiente e build do frontend |
| CSS | Estilização e responsividade |
| Context API | Estado de autenticação |
| ESLint 10.9.0 | Análise estática do frontend |
| Node.js 20 | Ambiente de execução do backend |
| Express 5 | API REST |
| Prisma ORM 7 | Acesso ao banco |
| PostgreSQL 16 | Banco relacional |
| CORS | Comunicação entre frontend e API |
| Jest | Testes automatizados |
| Supertest | Testes da API |
| Docker | Containerização |
| Docker Compose | Orquestração dos serviços |
| Nginx | Servidor do frontend em produção |
| GitHub Actions | Integração Contínua |

---

## Estrutura do Projeto

```text
tech-challenge-blog/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── contexts/
│   │   │   ├── auth.js
│   │   │   └── AuthProvider.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── PostDetail.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   └── postController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── prisma/
│   │   └── client.js
│   ├── routes/
│   │   └── postRoutes.js
│   ├── services/
│   │   └── postService.js
│   ├── tests/
│   │   └── post.test.js
│   ├── app.js
│   └── server.js
│
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── prisma.config.ts
└── README.md
```

---

## Rotas do Frontend

| Rota | Acesso | Função |
|---|---|---|
| `/` | Público | Listagem e pesquisa de posts |
| `/posts/:id` | Público | Leitura completa do post |
| `/login` | Público | Login do professor |
| `/posts/novo` | Protegido | Criação de post |
| `/posts/:id/editar` | Protegido | Edição de post |
| `/admin` | Protegido | Administração dos posts |

As rotas administrativas utilizam o componente `ProtectedRoute`.

Usuários não autenticados são redirecionados automaticamente para `/login`.

---

## Autenticação

O projeto utiliza um mecanismo de autenticação **simplificado para fins acadêmicos**.

### Credenciais de demonstração

```text
E-mail: professor@fiap.com.br
Senha: fiap2026
```

Após um login válido, o frontend armazena no `localStorage` o token:

```text
techchallenge2026
```

Nas operações protegidas, o serviço HTTP acrescenta:

```http
Authorization: Bearer techchallenge2026
```

O backend valida esse token através de `authMiddleware.js`.

### Operações protegidas

- criação de post;
- edição de post;
- exclusão de post;
- acesso às páginas administrativas no frontend.

> **Importante:** essa implementação simula autenticação para fins acadêmicos. As credenciais e o token são estáticos e não devem ser utilizados dessa forma em uma aplicação real de produção.

---

## Endpoints da API

| Método | Endpoint | Autenticação | Descrição |
|---|---|---|---|
| GET | `/posts` | Não | Lista todos os posts |
| GET | `/posts/:id` | Não | Busca um post por ID |
| GET | `/posts/search?termo=` | Não | Pesquisa posts |
| POST | `/posts` | Sim | Cria um novo post |
| PUT | `/posts/:id` | Sim | Atualiza um post |
| DELETE | `/posts/:id` | Sim | Exclui um post |

### Pesquisa

A pesquisa considera:

- título;
- conteúdo;
- autor.

Exemplo:

```http
GET /posts/search?termo=React
```

---

## Modelo de Dados

A entidade principal é `Post`.

| Campo | Tipo | Descrição |
|---|---|---|
| id | Integer | Identificador |
| titulo | String | Título |
| conteudo | String | Conteúdo |
| autor | String | Autor |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

---

# Execução com Docker

Esta é a forma mais simples de executar a aplicação completa.

## Pré-requisitos

- Docker Desktop
- Docker Compose

Na raiz:

```bash
docker compose up -d --build
```

Verifique:

```bash
docker compose ps
```

São iniciados três serviços:

| Container | Serviço | Porta |
|---|---|---|
| `blog-frontend` | React + Nginx | `8080` |
| `blog-api` | Node.js + Express | `3000` |
| `postgres-blog` | PostgreSQL | `5432` |

### Acessos

Frontend:

```text
http://localhost:8080
```

API:

```text
http://localhost:3000
```

Parar os containers:

```bash
docker compose down
```

---

# Execução em Desenvolvimento

## Backend

Na raiz do projeto:

```bash
npm install
```

Configure `.env`:

```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/blog"
PORT=3000
```

Inicie somente o PostgreSQL:

```bash
docker compose up -d banco
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Sincronize o banco:

```bash
npx prisma db push
```

Inicie a API:

```bash
npm run dev
```

API:

```text
http://localhost:3000
```

---

## Frontend

Em outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o Vite:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## CORS

O backend utiliza o middleware `cors` para permitir que o frontend executado em uma origem diferente realize chamadas HTTP à API.

Em desenvolvimento:

```text
React   → localhost:5173
API     → localhost:3000
```

Com Docker:

```text
React/Nginx → localhost:8080
API         → localhost:3000
```

---

## Responsividade e Acessibilidade

A interface foi desenvolvida para funcionar em diferentes tamanhos de tela.

Foram realizados testes em:

- desktop;
- tablet;
- dispositivos móveis.

A interface utiliza:

- layout responsivo;
- media queries;
- inputs e botões adaptáveis;
- navegação compatível com dispositivos móveis;
- foco visível para elementos interativos;
- labels associadas aos formulários;
- mensagens de erro com `role="alert"`;
- tamanhos adequados de áreas clicáveis.

---

## Testes

O backend utiliza:

- Jest;
- Supertest.

Executar:

```bash
npm test
```

Resultado validado:

```text
Test Suites: 1 passed
Tests:       6 passed
```

Cobertura observada:

```text
68.08%
```

---

## Validação do Frontend

### ESLint

```bash
cd frontend
npm run lint
```

### Build

```bash
npm run build
```

O build de produção é gerado em:

```text
frontend/dist/
```

---

## Docker do Frontend

O frontend utiliza um **Dockerfile multi-stage**.

### Etapa 1

Node.js é utilizado para:

```text
npm ci
npm run build
```

### Etapa 2

O Nginx serve os arquivos finais gerados pelo Vite.

```text
React
  ↓
Vite Build
  ↓
dist/
  ↓
Nginx
  ↓
Porta 80 no container
  ↓
localhost:8080
```

O `nginx.conf` utiliza:

```nginx
try_files $uri $uri/ /index.html;
```

Isso permite que rotas do React Router, como `/admin` e `/posts/:id`, funcionem mesmo quando acessadas diretamente ou após atualização da página.

---

## Docker Compose

O Docker Compose orquestra os três serviços:

```text
                 Docker Compose

                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ▼               ▼               ▼
 blog-frontend      blog-api      postgres-blog
 React/Nginx       Node/Express    PostgreSQL
     :8080            :3000          :5432
                         │
                         ▼
                     Prisma ORM
```

---

## Integração Contínua

O projeto utiliza **GitHub Actions**.

O workflow está localizado em:

```text
.github/workflows/ci.yml
```

Pode ser executado em:

- push para `main` ou `master`;
- pull request para `main` ou `master`;
- execução manual através de `workflow_dispatch`.

O runner utilizado é:

```text
ubuntu-22.04
```

### Validações do backend

1. Checkout do código;
2. Configuração do Node.js 20;
3. Instalação das dependências;
4. Geração do Prisma Client;
5. Sincronização do banco com `prisma db push`;
6. Execução dos testes Jest.

### Validações do frontend

1. Instalação das dependências;
2. Execução do ESLint;
3. Build de produção com Vite.

O pipeline foi validado com sucesso no GitHub Actions.

---

## Scripts do Backend

| Script | Descrição |
|---|---|
| `npm start` | Inicia a API |
| `npm run dev` | Desenvolvimento com Node Watch |
| `npm test` | Testes com Jest e cobertura |
| `npm run prisma:generate` | Gera Prisma Client |
| `npm run prisma:migrate` | Executa migrations |
| `npm run prisma:studio` | Prisma Studio |

---

## Scripts do Frontend

Executados dentro de `frontend/`.

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia Vite |
| `npm run build` | Gera build |
| `npm run lint` | Executa ESLint |
| `npm run preview` | Pré-visualiza o build |

---

## Tratamento de Erros

A API utiliza códigos HTTP compatíveis com cada cenário.

| Código | Significado |
|---|---|
| 200 | Sucesso |
| 201 | Recurso criado |
| 400 | Requisição inválida |
| 401 | Não autorizado |
| 404 | Recurso não encontrado |
| 500 | Erro interno |

O frontend também trata:

- carregamento dos dados;
- mensagens de erro da API;
- pesquisas sem resultados;
- posts inexistentes;
- credenciais inválidas.

---

## Funcionalidades

### Público

- ✅ Visualizar posts
- ✅ Pesquisar posts
- ✅ Ler conteúdo completo

### Professor autenticado

- ✅ Login
- ✅ Logout
- ✅ Criar post
- ✅ Editar post
- ✅ Excluir post
- ✅ Visualizar painel administrativo

### Infraestrutura

- ✅ PostgreSQL
- ✅ Prisma ORM
- ✅ Docker
- ✅ Docker Compose
- ✅ Nginx
- ✅ CORS
- ✅ GitHub Actions
- ✅ Build automatizado
- ✅ ESLint

---

## Experiências e Desafios Enfrentados

A evolução do projeto para uma solução Full Stack permitiu integrar conceitos de frontend, backend, banco de dados e infraestrutura.

Entre os principais desafios enfrentados estiveram:

- integração do React com uma API REST existente;
- configuração do CORS entre frontend e backend;
- utilização do React Router para navegação;
- implementação de rotas públicas e protegidas;
- gerenciamento simplificado de autenticação com Context API;
- integração das operações CRUD à interface;
- criação de uma interface responsiva;
- tratamento dos estados de carregamento e erro;
- configuração do Nginx para suportar React Router;
- criação de um Dockerfile específico para o frontend;
- orquestração de frontend, backend e PostgreSQL com Docker Compose;
- integração das validações do frontend ao GitHub Actions;
- resolução de questões relacionadas à disponibilidade de runners do GitHub Actions.

O desenvolvimento possibilitou consolidar conhecimentos sobre a comunicação entre diferentes camadas de uma aplicação Full Stack e sobre o ciclo completo de desenvolvimento, testes, containerização e integração contínua.

---

## Melhorias Futuras

Possíveis evoluções:

- autenticação JWT;
- cadastro real de usuários e professores;
- criptografia de senhas;
- autorização baseada em perfis;
- paginação;
- comentários nas publicações;
- Swagger/OpenAPI;
- validação com bibliotecas dedicadas;
- testes automatizados do frontend;
- ampliação da cobertura de testes do backend;
- configuração da URL da API por variáveis de ambiente;
- deploy em nuvem;
- Continuous Deployment (CD).

---

## Segurança

O sistema atual foi criado para fins acadêmicos.

O login e o token utilizados na aplicação são simplificados e não representam uma solução de segurança para produção.

Em um ambiente real seria necessário implementar, entre outros recursos:

- armazenamento seguro de senhas;
- hashing;
- tokens JWT;
- expiração de sessão;
- controle de usuários;
- controle de permissões;
- variáveis de ambiente para segredos.

---

## Licença

Projeto desenvolvido exclusivamente para fins acadêmicos como parte do **Tech Challenge da Pós Tech em Full Stack Development — FIAP**.

---

## Autor

**Daniel Romera**

Projeto desenvolvido durante a Pós Tech em Full Stack Development da FIAP.

### Contato

- **GitHub:** https://github.com/danielromera83
- **LinkedIn:** https://www.linkedin.com/in/daniel-romera-a5b522340/

---

⭐ Projeto desenvolvido para fins acadêmicos e de aprendizado em Desenvolvimento Full Stack.