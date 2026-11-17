# Tech Challenge Blog — Full Stack 🚀

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green)
![React Web](https://img.shields.io/badge/React_Web-19.2.8-61DAFB)
![React Native](https://img.shields.io/badge/React_Native-0.86.3-61DAFB)
![Expo](https://img.shields.io/badge/Expo-SDK_57-000020)
![Express](https://img.shields.io/badge/Express-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)
![Tests](https://img.shields.io/badge/Tests-Jest-red)
![CI](https://github.com/danielromera83/tech-challenge-blog/actions/workflows/ci.yml/badge.svg)

Aplicação Full Stack desenvolvida para o **Tech Challenge da Pós Tech em Full Stack Development — FIAP**.

O projeto reúne uma API REST, uma aplicação Web e um aplicativo Mobile. As interfaces Web e Mobile compartilham o mesmo backend e a mesma base de dados, mantendo as regras de negócio, autenticação, autorização e persistência centralizadas na API.

**Fases documentadas neste repositório:**
- **Fase 2 — Backend:** API REST, persistência e operações de gerenciamento.
- **Fase 3 — Web:** interface com React para consulta de publicações e administração de posts.
- **Fase 4 — Mobile:** aplicativo com React Native e Expo, integrado à API para consulta de posts e gerenciamento de posts, professores e alunos.

---

## Status do projeto

🟢 **Fase 4 implementada — aplicativo Mobile integrado e validado manualmente no simulador iOS.**

O workflow de Integração Contínua está configurado para executar testes do backend, validações e build do frontend Web e verificação de tipos do Mobile. O resultado de cada execução pode ser consultado na aba Actions do GitHub.

### Funcionalidades disponíveis

**Área pública — Web e Mobile**
- Listagem de publicações;
- Pesquisa de posts por palavra-chave;
- Visualização do conteúdo completo de uma publicação.

**Área administrativa — Web**
- Login de professor;
- Painel administrativo;
- Criação, edição e exclusão de posts.

**Área administrativa — Mobile**
- Login e logout de professor;
- Criação, edição e exclusão de posts;
- Listagem, cadastro, edição e exclusão de professores;
- Listagem, cadastro, edição e exclusão de alunos;
- Paginação nas listagens de professores e alunos.

**Backend e infraestrutura**
- API REST com Node.js e Express;
- Persistência PostgreSQL com Prisma ORM;
- Autenticação com JWT;
- Autorização baseada em papéis (PROFESSOR e ALUNO);
- Compatibilidade com sessão Web por cookie e autenticação Mobile por Bearer Token;
- Docker e Docker Compose;
- Testes automatizados com Jest e Supertest;
- Integração Contínua com GitHub Actions.

---

## Arquitetura geral

As aplicações Web e Mobile consomem a mesma API REST. A API concentra a autenticação, autorização, regras de negócio e acesso ao banco de dados.

    ┌──────────────────────┐       ┌────────────────────────┐
    │    Aplicação Web     │       │    Aplicativo Mobile   │
    │ React + Vite         │       │ React Native + Expo    │
    │ React Router         │       │ Expo Router            │
    └──────────┬───────────┘       └────────────┬───────────┘
               │                                │
               └──────────────┬─────────────────┘
                              │ HTTP / REST
                              ▼
                 ┌────────────────────────┐
                 │      Backend API       │
                 │    Node.js + Express   │
                 │       Porta 3000       │
                 └────────────┬───────────┘
                              │
                              ▼
                 ┌────────────────────────┐
                 │       Prisma ORM       │
                 └────────────┬───────────┘
                              │
                              ▼
                 ┌────────────────────────┐
                 │     PostgreSQL 16      │
                 │       Porta 5432       │
                 └────────────────────────┘

### Responsabilidades por camada

| Camada | Responsabilidade |
|---|---|
| Web | Interface para consulta de posts e administração de publicações |
| Mobile | Interface para consulta de posts e gerenciamento de posts, professores e alunos |
| API REST | Endpoints, autenticação, autorização e regras de negócio |
| Prisma ORM | Comunicação entre backend e banco de dados |
| PostgreSQL | Persistência de usuários e publicações |

---

## Tecnologias utilizadas

### Backend e banco de dados

| Tecnologia | Finalidade |
|---|---|
| Node.js (>= 20) | Ambiente de execução |
| Express 5 | API REST |
| Prisma ORM 7 | Mapeamento e acesso ao banco |
| PostgreSQL 16 | Banco de dados relacional |
| bcryptjs | Hash e validação de senhas |
| jsonwebtoken | Geração e validação de JWT |
| cookie-parser | Leitura do cookie de autenticação |
| CORS | Comunicação entre as interfaces e a API |
| Jest | Testes automatizados |
| Supertest | Testes HTTP da API |

### Frontend Web

| Tecnologia | Finalidade |
|---|---|
| React 19 | Construção da interface |
| React Router DOM 7 | Navegação |
| Vite 8 | Ambiente de desenvolvimento e build |
| CSS | Estilização e responsividade |
| Context API | Estado de autenticação |
| ESLint | Análise estática do código |

### Aplicativo Mobile

| Tecnologia | Finalidade |
|---|---|
| React Native 0.86 | Desenvolvimento multiplataforma |
| Expo SDK 57 | Plataforma e ferramentas de desenvolvimento |
| Expo Router | Navegação baseada em arquivos |
| React 19 | Construção da interface |
| TypeScript 6 | Tipagem estática |
| Expo Secure Store | Armazenamento seguro do JWT |
| Expo Build Properties | Configurações nativas do aplicativo |

### Infraestrutura e ferramentas

| Tecnologia | Finalidade |
|---|---|
| Docker | Containerização |
| Docker Compose | Orquestração dos serviços |
| Nginx | Servidor da aplicação Web em produção |
| GitHub Actions | Integração Contínua |
| Xcode | Desenvolvimento e testes no iOS |
| Android Studio | Desenvolvimento e testes no Android |

---

## Funcionalidades por aplicação

### Web — Fase 3

A aplicação Web utiliza React, Vite e React Router.

**Área pública**
- Visualização da lista de posts;
- Pesquisa por palavra-chave;
- Acesso ao conteúdo completo das publicações.

**Área do professor**
- Login;
- Painel administrativo;
- Criação de posts;
- Edição de posts;
- Exclusão de posts.

### Mobile — Fase 4

O aplicativo foi desenvolvido com React Native, Expo Router e TypeScript.

**Área pública**
- Listagem de posts;
- Visualização de título, autor e resumo;
- Busca por palavras-chave;
- Leitura completa de uma publicação.

**Área do professor**
- Login e logout;
- Painel administrativo;
- Criação, edição e exclusão de posts;
- Listagem e paginação de professores;
- Cadastro, edição e exclusão de professores;
- Listagem e paginação de alunos;
- Cadastro, edição e exclusão de alunos.

A documentação específica do aplicativo está em [mobile/README.md](mobile/README.md).

---

## Arquitetura do backend

O backend segue uma organização em camadas:

- **Routes:** mapeamento dos endpoints HTTP;
- **Middleware:** autenticação e autorização;
- **Controllers:** tratamento das requisições e respostas;
- **Services:** regras de negócio e operações sobre os dados;
- **Prisma Client:** acesso ao PostgreSQL.

O middleware de autenticação valida o JWT e disponibiliza os dados do usuário em req.user. O middleware de autorização verifica o papel do usuário antes de permitir operações administrativas.

---

## Autenticação e segurança

A autenticação é realizada pelo backend e compartilhada pelas aplicações Web e Mobile, respeitando as necessidades de cada plataforma.

### Aplicação Web

A aplicação Web utiliza autenticação baseada em cookie:
- Login realizado pela API;
- JWT assinado pelo backend;
- Cookie auth_token configurado como HttpOnly;
- Envio de credenciais nas requisições com credentials: "include";
- Consulta da sessão através de GET /auth/me;
- Encerramento da sessão através de POST /auth/logout.

### Aplicativo Mobile

O aplicativo Mobile utiliza autenticação por Bearer Token:
- Login realizado pela API;
- Token JWT retornado pelo backend;
- Armazenamento no dispositivo com expo-secure-store;
- Envio do token no cabeçalho Authorization: Bearer JWT;
- Recuperação e exclusão do token durante o ciclo de autenticação.

### Autorização por papel

O sistema possui dois papéis:
- PROFESSOR
- ALUNO

As operações administrativas são protegidas no backend. A autorização efetiva não depende apenas da navegação ou da proteção visual das telas.

Comportamento esperado:
- Usuário sem autenticação válida: 401 Unauthorized;
- Usuário autenticado sem permissão: 403 Forbidden;
- Professor autenticado e autorizado: operação permitida.

As senhas são armazenadas como hashes gerados com bcryptjs. Segredos e credenciais devem ser definidos por variáveis de ambiente e não devem ser enviados ao repositório.

---

## Endpoints da API REST

A API é compartilhada pelas aplicações Web e Mobile.

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| POST | /auth/login | Autentica o usuário |
| GET | /auth/me | Consulta o usuário da sessão/token |
| POST | /auth/logout | Encerra a sessão Web |

### Posts

| Método | Endpoint | Acesso |
|---|---|---|
| GET | /posts | Público |
| GET | /posts/:id | Público |
| GET | /posts/search?termo= | Público |
| POST | /posts | Professor |
| PUT | /posts/:id | Professor |
| DELETE | /posts/:id | Professor |

A pesquisa considera título, conteúdo e autor.

Exemplo:

    GET /posts/search?termo=React

### Professores

| Método | Endpoint | Operação |
|---|---|---|
| GET | /professores | Listagem paginada |
| GET | /professores/:id | Consulta individual |
| POST | /professores | Cadastro |
| PUT | /professores/:id | Atualização |
| DELETE | /professores/:id | Exclusão |

### Alunos

| Método | Endpoint | Operação |
|---|---|---|
| GET | /alunos | Listagem paginada |
| GET | /alunos/:id | Consulta individual |
| POST | /alunos | Cadastro |
| PUT | /alunos/:id | Atualização |
| DELETE | /alunos/:id | Exclusão |

As rotas administrativas exigem autenticação e autorização conforme as regras implementadas no backend.

As listagens administrativas utilizam paginação e retornam dados de paginação, como página atual, limite, total de registros e total de páginas.

---

## Modelo de dados

O banco utiliza PostgreSQL e Prisma ORM.

### Post

| Campo | Tipo | Descrição |
|---|---|---|
| id | Integer | Identificador |
| titulo | String | Título da publicação |
| conteudo | String | Conteúdo |
| autor | String | Autor |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

Tabela: posts.

### User

| Campo | Tipo | Descrição |
|---|---|---|
| id | Integer | Identificador |
| email | String | E-mail único |
| password | String | Hash da senha |
| role | Role | Papel de acesso |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

Tabela: users.

O enum Role possui os valores PROFESSOR e ALUNO.

---

## Estrutura do repositório

    tech-challenge-blog/
    │
    ├── .github/
    │   └── workflows/
    │       └── ci.yml
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── contexts/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   ├── App.jsx
    │   │   └── main.jsx
    │   ├── Dockerfile
    │   ├── nginx.conf
    │   └── package.json
    │
    ├── mobile/
    │   ├── src/
    │   │   ├── app/
    │   │   │   ├── admin/
    │   │   │   ├── post/
    │   │   │   ├── _layout.tsx
    │   │   │   ├── index.tsx
    │   │   │   └── login.tsx
    │   │   └── services/
    │   │       ├── api.ts
    │   │       └── auth.ts
    │   ├── assets/
    │   ├── app.json
    │   └── package.json
    │
    ├── prisma/
    │   ├── migrations/
    │   └── schema.prisma
    │
    ├── scripts/
    │   └── createProfessor.js
    │
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── prisma/
    │   ├── routes/
    │   ├── services/
    │   ├── tests/
    │   ├── app.js
    │   └── server.js
    │
    ├── .env.example
    ├── Dockerfile
    ├── docker-compose.yml
    ├── package.json
    └── README.md

O arquivo .env contém configurações locais e segredos e é ignorado pelo Git. O arquivo .env.example apresenta o modelo das variáveis necessárias.

---

## Pré-requisitos

- Node.js 20 ou superior;
- npm;
- Docker Desktop e Docker Compose;
- Xcode para desenvolvimento e execução no iOS;
- Android Studio para desenvolvimento e execução no Android;
- Expo CLI, utilizado através do npx.

O ambiente Mobile foi desenvolvido com Expo SDK 57 e React Native 0.86.

---

## Configuração do ambiente

Clone o repositório:

    git clone https://github.com/danielromera83/tech-challenge-blog.git
    cd tech-challenge-blog

Instale as dependências do backend:

    npm ci

Crie o arquivo de configuração local:

    cp .env.example .env

Configure as variáveis de ambiente no arquivo .env. Exemplo:

    DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/blog"
    PORT=3000
    JWT_SECRET="substitua_por_um_segredo_seguro"
    PROFESSOR_EMAIL="professor@fiap.com.br"
    PROFESSOR_PASSWORD="substitua_por_uma_senha_segura"
    CORS_ORIGINS="http://localhost:5173,http://localhost:8080"

Utilize credenciais próprias e seguras. Não compartilhe o conteúdo do arquivo .env.

---

## Executando com Docker

O Docker Compose disponibiliza três serviços:

| Serviço | Container | Porta |
|---|---|---|
| banco | postgres-blog | 5432 |
| api | blog-api | 3000 |
| frontend | blog-frontend | 8080 |

O serviço da API aguarda o PostgreSQL ficar saudável e executa as migrations, cria ou atualiza o professor configurado e inicia o servidor.

Na raiz do projeto:

    docker compose up -d --build

Verifique os serviços:

    docker compose ps

Acessos:
- Web: http://localhost:8080
- API: http://localhost:3000

Para acompanhar os logs:

    docker compose logs -f

Para encerrar os serviços:

    docker compose down

O banco utiliza volume Docker para persistência dos dados.

---

## Executando em desenvolvimento

### 1. Banco de dados

Na raiz do projeto, inicie somente o PostgreSQL:

    docker compose up -d banco

### 2. Backend

Na raiz do projeto:

    npm ci
    npx prisma generate
    npx prisma migrate deploy
    node scripts/createProfessor.js
    npm run dev

A API ficará disponível em:

    http://localhost:3000

A rota raiz pode ser utilizada para verificar se a API está em execução:

    curl http://localhost:3000/

Para consultar os posts:

    curl http://localhost:3000/posts

### 3. Frontend Web

Em outro terminal:

    cd frontend
    npm ci
    npm run dev

O Vite disponibilizará a aplicação em:

    http://localhost:5173

Para gerar o build de produção:

    npm run build

Para executar o ESLint:

    npm run lint

### 4. Aplicativo Mobile

Em outro terminal:

    cd mobile
    npm ci

O aplicativo utiliza a variável EXPO_PUBLIC_API_URL para localizar a API.

Em simulador ou dispositivo físico, configure um endereço acessível pela rede. Exemplo:

    EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000 npx expo start --dev-client --lan -c

Substitua SEU_IP_LOCAL pelo endereço IP da máquina onde o backend está sendo executado.

**Importante:** em dispositivo físico, não utilize localhost para acessar a API executada no computador. Utilize o IP da máquina na rede local.

#### iOS

Para gerar e instalar o development build:

    npx expo run:ios

Com o development build instalado, inicie o Metro:

    EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000 npx expo start --dev-client --lan

#### Android

Para gerar e executar o aplicativo:

    npx expo run:android

A variável EXPO_PUBLIC_API_URL deve apontar para um endereço acessível pelo emulador ou dispositivo.

A documentação específica do Mobile contém orientações complementares de instalação, configuração e execução: [mobile/README.md](mobile/README.md).

---

## Integração Contínua — GitHub Actions

O workflow está localizado em:

    .github/workflows/ci.yml

O workflow pode ser executado:
- Em push para main ou master;
- Em Pull Requests direcionados a main ou master;
- Manualmente através de workflow_dispatch.

O ambiente de CI utiliza Ubuntu 22.04, Node.js 22 e PostgreSQL 16.

### Validações do backend

1. Instalação das dependências;
2. Geração do Prisma Client;
3. Aplicação das migrations;
4. Execução dos testes automatizados com Jest e cobertura.

### Validações do frontend Web

1. Instalação das dependências;
2. Execução do ESLint;
3. Build de produção com Vite.

### Validações do Mobile

1. Instalação das dependências;
2. Verificação de tipos TypeScript com tsc --noEmit.

Consulte as execuções e seus resultados em [GitHub Actions](https://github.com/danielromera83/tech-challenge-blog/actions).

---

## Testes e validações

### Backend

Os testes automatizados utilizam Jest e Supertest.

Execute na raiz do projeto:

    npm test

A suíte contempla cenários de API, autenticação, autorização e operações de gerenciamento.

Durante a validação local também foram conferidos:
- Disponibilidade do PostgreSQL;
- Estado das migrations Prisma;
- Inicialização da API;
- Consulta pública de posts;
- Login de professor;
- Acesso autenticado às rotas administrativas;
- Cadastro, login, atualização e exclusão de aluno;
- Bloqueio de acesso administrativo para usuário sem permissão.

### Mobile

A validação manual foi realizada no simulador iOS e contemplou:

- Inicialização do aplicativo;
- Comunicação com a API REST;
- Listagem, busca e leitura de posts;
- Login e logout;
- Acesso à área administrativa;
- Criação, edição e exclusão de posts;
- Listagem, cadastro, edição e exclusão de professores;
- Listagem, cadastro, edição e exclusão de alunos;
- Navegação paginada nas listagens administrativas;
- Retorno à Home.

A validação manual no simulador é complementar às verificações automatizadas configuradas no GitHub Actions.

---

## Decisões técnicas

- **Backend centralizado:** Web e Mobile reutilizam a mesma API REST e o mesmo banco de dados.
- **Separação de responsabilidades:** interfaces, API, regras de negócio e persistência possuem responsabilidades distintas.
- **Autenticação compatível com as plataformas:** cookie HttpOnly na Web e Bearer Token no Mobile.
- **Armazenamento seguro no Mobile:** utilização de Expo Secure Store para o JWT.
- **Autorização no backend:** operações administrativas verificam autenticação e papel do usuário na API.
- **Expo Router:** navegação do Mobile baseada na estrutura de arquivos.
- **TypeScript:** tipagem estática no aplicativo Mobile.
- **Docker Compose:** execução integrada do banco, API e frontend Web.
- **GitHub Actions:** automação das validações do backend, Web e Mobile.

---

## Melhorias futuras

Possíveis evoluções para versões posteriores:
- Documentação interativa da API com Swagger/OpenAPI;
- Testes automatizados de interface Web e Mobile;
- Ampliação da cobertura de testes;
- Deploy em nuvem;
- Continuous Deployment (CD);
- Recuperação de senha e gerenciamento de sessões;
- Melhorias adicionais de acessibilidade e experiência de uso.

---

## Licença e finalidade

Projeto desenvolvido como parte do **Tech Challenge da Pós Tech em Full Stack Development — FIAP**, com finalidade acadêmica e de aprendizado em desenvolvimento Full Stack.

---

## Autor

**Daniel de Araújo Romera**

Pós Tech — Full Stack Development  
FIAP

- **GitHub:** https://github.com/danielromera83
- **LinkedIn:** https://www.linkedin.com/in/daniel-romera-a5b522340/

---

⭐ Projeto desenvolvido para fins acadêmicos e de aprendizado em Desenvolvimento Full Stack.
