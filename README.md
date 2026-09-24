# Tech Challenge Blog — Full Stack 🚀

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB)
![Vite](https://img.shields.io/badge/Vite-8.2.2-646CFF)
![Express](https://img.shields.io/badge/Express-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)
![Tests](https://img.shields.io/badge/Tests-Jest-red)
![Coverage](https://img.shields.io/badge/Coverage-76%25-brightgreen)
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
- ✅ Autenticação real de usuários com PostgreSQL, bcrypt, JWT e autorização baseada em papéis
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
    │   valida JWT e sessão
    │
    ├── Middleware de autorização
    │   restringe operações ao PROFESSOR
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

Responsável pela autenticação e autorização das operações protegidas.

O middleware `autenticar` valida o JWT armazenado no cookie `HttpOnly`, verifica sua assinatura e expiração e disponibiliza os dados do usuário em `req.user`.

O middleware `autorizarProfessor` verifica se o usuário autenticado possui o papel `PROFESSOR` antes de permitir operações administrativas.

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
| Node.js >= 20 | Ambiente de execução do backend |
| Express 5 | API REST |
| Prisma ORM 7 | Acesso ao banco |
| PostgreSQL 16 | Banco relacional |
| bcryptjs 3.0.3 | Hash e validação de senhas |
| jsonwebtoken 9.0.3 | Geração e validação de JWT |
| cookie-parser 1.4.7 | Leitura do cookie de autenticação |
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
│   │   ├── 20260623143608_criar_posts/
│   │   ├── 20260923114500_reconciliar_posts/
│   │   ├── 20260923151250_adicionar_usuarios_autenticacao/
│   │   └── 20260924124552_definir_role_padrao_aluno/
│   └── schema.prisma
│
├── scripts/
│   └── createProfessor.js
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── postController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── prisma/
│   │   └── client.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── postService.js
│   │
│   ├── tests/
│   │   └── post.test.js
│   │
│   ├── app.js
│   └── server.js
│
├── .dockerignore
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── prisma.config.ts
└── README.md
```

O arquivo `.env` contém configurações locais e segredos e, por isso, é ignorado pelo Git. O arquivo `.env.example` serve como modelo seguro das variáveis necessárias.

---

## Rotas do Frontend

| Rota | Acesso | Função |
|---|---|---|
| `/` | Público | Listagem e pesquisa de posts |
| `/posts/:id` | Público | Leitura completa do post |
| `/login` | Público | Login |
| `/posts/novo` | PROFESSOR | Criação de post |
| `/posts/:id/editar` | PROFESSOR | Edição de post |
| `/admin` | PROFESSOR | Administração dos posts |

As rotas administrativas utilizam o componente `ProtectedRoute`.

O componente verifica o estado da sessão através do `AuthProvider`.

Quando o usuário não está autenticado, o acesso a uma rota administrativa redireciona para:

```text
/login
```

Quando existe uma sessão válida, mas o usuário não possui o papel `PROFESSOR`, o acesso administrativo é bloqueado e o usuário é redirecionado para:

```text
/
```

A proteção do frontend melhora a navegação e a experiência do usuário, mas a autorização efetiva também é realizada no backend.

---

## Autenticação

A aplicação utiliza autenticação integrada ao backend, com usuários persistidos no PostgreSQL.

### Fluxo de autenticação

```text
Usuário informa e-mail e senha
        ↓
POST /auth/login
        ↓
Backend consulta o usuário no PostgreSQL
        ↓
bcryptjs compara a senha com o hash armazenado
        ↓
API gera um JWT assinado
        ↓
JWT é enviado em cookie HttpOnly
        ↓
Frontend consulta GET /auth/me
        ↓
Backend valida o JWT
        ↓
Sessão e papel do usuário são disponibilizados ao frontend
```

### Senhas

As senhas não são armazenadas em texto puro.

O `bcryptjs` é utilizado para gerar e validar hashes de senha.

O professor inicial pode ser criado ou atualizado através do script:

```text
scripts/createProfessor.js
```

As credenciais são obtidas das variáveis:

```text
PROFESSOR_EMAIL
PROFESSOR_PASSWORD
```

### JWT e cookie de autenticação

Após um login válido, a API gera um JWT assinado com validade de **1 hora**.

O token contém informações necessárias para identificar o usuário e seu papel de acesso.

O JWT é armazenado no cookie:

```text
auth_token
```

O cookie é configurado com `HttpOnly`, impedindo que o JavaScript executado no navegador acesse diretamente o token.

O frontend envia o cookie nas chamadas à API utilizando:

```js
credentials: "include"
```

O backend permite o envio de credenciais através da configuração de CORS com:

```js
credentials: true
```

### Sessão

A sessão atual é consultada por:

```http
GET /auth/me
```

O logout é realizado por:

```http
POST /auth/logout
```

No logout, o backend remove o cookie de autenticação e o frontend limpa o estado do usuário.

### Autorização por papel

O sistema possui dois papéis definidos pelo enum `Role`:

```text
PROFESSOR
ALUNO
```

O middleware:

```text
autenticar
```

valida o JWT e disponibiliza os dados do usuário em `req.user`.

O middleware:

```text
autorizarProfessor
```

permite operações administrativas somente quando:

```text
role = PROFESSOR
```

Assim:

```text
Sem sessão válida          → HTTP 401 Unauthorized
Usuário ALUNO autenticado  → HTTP 403 Forbidden
Usuário PROFESSOR          → acesso permitido
```

As operações de criação, edição e exclusão de posts são protegidas no backend.

---

## Endpoints da API

| Método | Endpoint | Autenticação | Descrição |
|---|---|---|---|
| POST | `/auth/login` | Não | Autentica o usuário e cria a sessão |
| GET | `/auth/me` | Sim | Retorna o usuário da sessão atual |
| POST | `/auth/logout` | Não | Encerra a sessão |
| GET | `/posts` | Não | Lista todos os posts |
| GET | `/posts/:id` | Não | Busca um post por ID |
| GET | `/posts/search?termo=` | Não | Pesquisa posts |
| POST | `/posts` | PROFESSOR | Cria um novo post |
| PUT | `/posts/:id` | PROFESSOR | Atualiza um post |
| DELETE | `/posts/:id` | PROFESSOR | Exclui um post |

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

O banco possui as entidades `Post` e `User`, além do enum `Role`.

### Post

| Campo | Tipo | Descrição |
|---|---|---|
| id | Integer | Identificador |
| titulo | String | Título |
| conteudo | String | Conteúdo |
| autor | String | Autor |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

A tabela correspondente no PostgreSQL é:

```text
posts
```

### User

| Campo | Tipo | Descrição |
|---|---|---|
| id | Integer | Identificador |
| email | String | E-mail único do usuário |
| password | String | Hash bcrypt da senha |
| role | Role | Papel de acesso do usuário |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

A tabela correspondente no PostgreSQL é:

```text
users
```

### Role

Os papéis disponíveis são:

```text
PROFESSOR
ALUNO
```

`PROFESSOR` possui acesso às funcionalidades administrativas.

`ALUNO` não possui autorização para criar, editar ou excluir posts.

---

## Execução com Docker

Esta é a forma mais simples de executar a aplicação completa.

### Pré-requisitos

- Docker Desktop
- Docker Compose

### Configuração das variáveis de ambiente

Crie o arquivo `.env` a partir do modelo:

```bash
cp .env.example .env
```

Depois configure valores próprios para:

```env
JWT_SECRET="substitua_por_um_segredo_seguro"
PROFESSOR_EMAIL="professor@fiap.com.br"
PROFESSOR_PASSWORD="substitua_por_uma_senha_segura"
```

O arquivo `.env` é ignorado pelo Git e não deve conter valores que sejam versionados no repositório.

### Subir a aplicação

Na raiz do projeto:

```bash
docker compose up -d --build
```

O Docker Compose inicia três serviços:

| Container | Serviço | Porta |
|---|---|---|
| `blog-frontend` | React + Nginx | `8080` |
| `blog-api` | Node.js + Express | `3000` |
| `postgres-blog` | PostgreSQL 16 | `5432` |

O PostgreSQL utiliza o volume:

```text
postgres_data
```

para persistência dos dados.

O serviço da API aguarda o PostgreSQL ficar saudável e executa automaticamente:

```text
npx prisma migrate deploy
        ↓
node scripts/createProfessor.js
        ↓
npm start
```

Dessa forma, ao iniciar os containers:

1. as migrations pendentes são aplicadas;
2. o professor definido no `.env` é criado ou atualizado;
3. a API é iniciada.

Verifique o estado dos containers:

```bash
docker compose ps
```

### Acessos

Frontend:

```text
http://localhost:8080
```

API:

```text
http://localhost:3000
```

Para acompanhar os logs:

```bash
docker compose logs -f
```

Para encerrar os containers:

```bash
docker compose down
```

---

## Execução em Desenvolvimento

Para executar backend e frontend diretamente no ambiente local, utilize Node.js **20 ou superior**.

O projeto declara:

```text
Node.js >= 20
```

O projeto suporta Node.js 20 ou superior. O ambiente de desenvolvimento local foi validado com Node.js 22, o Docker do backend utiliza Node.js 20 e o workflow de CI está configurado para Node.js 22.

### Backend

Na raiz do projeto, instale as dependências:

```bash
npm ci
```

Crie o arquivo local de configuração, caso ainda não exista:

```bash
cp .env.example .env
```

Configure as variáveis conforme o seu ambiente.

Exemplo:

```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/blog"
PORT=3000
JWT_SECRET="substitua_por_um_segredo_seguro"
PROFESSOR_EMAIL="professor@fiap.com.br"
PROFESSOR_PASSWORD="substitua_por_uma_senha_segura"
CORS_ORIGINS="http://localhost:5173,http://localhost:8080"
```

Inicie somente o PostgreSQL:

```bash
docker compose up -d banco
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Aplique as migrations existentes:

```bash
npx prisma migrate deploy
```

Crie ou atualize o professor configurado no `.env`:

```bash
node scripts/createProfessor.js
```

Inicie a API em modo de desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

#### Desenvolvimento do schema Prisma

Quando for necessário criar uma **nova migration** durante o desenvolvimento, utilize:

```bash
npm run prisma:migrate
```

Esse script executa:

```text
prisma migrate dev
```

Para ambientes que apenas precisam aplicar migrations já versionadas, utilize:

```bash
npx prisma migrate deploy
```

---

### Frontend

Em outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm ci
```

Inicie o Vite:

```bash
npm run dev
```

O frontend ficará disponível em:

```text
http://localhost:5173
```

---

### CORS e envio do cookie

O backend utiliza o middleware `cors` para permitir a comunicação entre o frontend e a API executados em origens diferentes.

Por padrão, são permitidas:

```text
http://localhost:5173
http://localhost:8080
```

Essas origens podem ser configuradas através de:

```text
CORS_ORIGINS
```

Como a autenticação utiliza cookie, o backend habilita:

```js
credentials: true
```

e o frontend envia as requisições utilizando:

```js
credentials: "include"
```

Em desenvolvimento:

```text
React        → localhost:5173
API          → localhost:3000
PostgreSQL   → localhost:5432
```

Com Docker:

```text
React/Nginx  → localhost:8080
API          → localhost:3000
PostgreSQL   → localhost:5432
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

Os testes automatizados cobrem operações da API, autenticação e autorização.

Entre os cenários validados estão:

- login válido de professor;
- rejeição de senha inválida;
- recuperação da sessão através de `/auth/me`;
- encerramento da sessão com logout;
- rejeição de operação protegida sem autenticação (`401`);
- rejeição de operação administrativa para usuário `ALUNO` (`403`);
- listagem e consulta de posts;
- pesquisa de posts;
- validação de dados obrigatórios;
- criação de post por usuário `PROFESSOR`.

Executar:

```bash
npm test
```

Resultado validado:

```text
Test Suites: 1 passed
Tests:       12 passed
```

Cobertura geral observada:

```text
76%
```

Os testes também foram executados com sucesso sobre um banco PostgreSQL vazio após a aplicação de todas as migrations com:

```bash
npx prisma migrate deploy
```

Isso valida o funcionamento do histórico completo de migrations em uma instalação limpa.

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
2. configuração do Node.js 22;
3. instalação das dependências;
4. geração do Prisma Client;
5. aplicação das migrations com `prisma migrate deploy`;
6. execução dos testes Jest com cobertura.

### Validações do frontend

1. Instalação das dependências;
2. Execução do ESLint;
3. Build de produção com Vite.

O workflow foi configurado para reproduzir um ambiente limpo com PostgreSQL 16, aplicar as migrations versionadas e executar as validações automatizadas do backend e do frontend.

---

## Scripts do Backend

| Script | Descrição |
|---|---|
| `npm start` | Inicia a API |
| `npm run dev` | Desenvolvimento com Node Watch |
| `npm test` | Testes com Jest e cobertura |
| `npm run prisma:generate` | Gera Prisma Client |
| `npm run prisma:migrate` | Cria e aplica migrations durante o desenvolvimento |
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
| 403 | Usuário autenticado sem permissão para a operação |
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
- evolução da autenticação simulada para autenticação real com PostgreSQL, bcrypt, JWT, cookie HttpOnly e autorização baseada em papéis;
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

A aplicação utiliza autenticação integrada ao backend com usuários persistidos no PostgreSQL.

As principais medidas implementadas são:

- senhas armazenadas como hash utilizando `bcryptjs`;
- autenticação realizada pela API;
- geração de JWT assinado pelo backend;
- expiração do JWT após 1 hora;
- armazenamento do JWT em cookie `HttpOnly`;
- segredo do JWT definido por variável de ambiente;
- credenciais não versionadas no Git;
- validação da sessão no backend;
- autorização baseada no papel do usuário;
- operações administrativas restritas ao papel `PROFESSOR`;
- retorno `401 Unauthorized` para usuários não autenticados;
- retorno `403 Forbidden` para usuários autenticados sem permissão.

O frontend utiliza o estado retornado pela API para controlar a navegação, mas a proteção efetiva dos recursos ocorre no backend.

O cookie de autenticação utiliza:

```text
HttpOnly
SameSite=Lax
Secure quando NODE_ENV=production
```

A opção `Secure` exige que a aplicação em produção utilize HTTPS para que o cookie seja enviado pelo navegador.

### Possíveis evoluções de segurança

Para uma aplicação de produção, ainda poderiam ser adicionados recursos como:

- política de complexidade e troca de senha;
- recuperação de senha;
- refresh tokens;
- revogação de sessões;
- bloqueio ou limitação após tentativas consecutivas de login;
- rate limiting;
- proteção CSRF adicional conforme a arquitetura de implantação;
- auditoria de acessos;
- gerenciamento administrativo de usuários;
- níveis adicionais de permissão.

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