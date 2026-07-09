# Tech Challenge Blog API 🚀

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Express](https://img.shields.io/badge/Express-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)
![Tests](https://img.shields.io/badge/Tests-Jest-red)
![Coverage](https://img.shields.io/badge/Coverage-65.85%25-brightgreen)
![CI](https://github.com/danielromera83/tech-challenge-blog/actions/workflows/ci.yml/badge.svg)

API REST desenvolvida como solução para o **Tech Challenge – Fase 2** da Pós Tech em **Full Stack Development (FIAP)**.

A aplicação implementa um **CRUD completo** para gerenciamento de posts de um blog utilizando **Node.js**, **Express**, **Prisma ORM** e **PostgreSQL**, seguindo uma arquitetura em camadas. O projeto também conta com **Docker**, **Docker Compose**, **testes automatizados** e **Integração Contínua (GitHub Actions)**.

---

## Demonstração

Projeto desenvolvido como requisito avaliativo da Pós Tech FIAP.

Tecnologias utilizadas:

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Docker
- Jest
- GitHub Actions

---

## Status do Projeto

🟢 **Projeto concluído**

### Recursos implementados

- ✅ API REST
- ✅ CRUD completo
- ✅ Arquitetura em camadas
- ✅ PostgreSQL
- ✅ Prisma ORM
- ✅ Docker
- ✅ Docker Compose
- ✅ Dockerfile
- ✅ Testes automatizados (Jest + Supertest)
- ✅ Integração Contínua (GitHub Actions)

---

## Objetivo

Desenvolver uma API REST para gerenciamento de posts de um blog utilizando boas práticas de desenvolvimento, arquitetura em camadas, ORM Prisma, banco PostgreSQL, testes automatizados e integração contínua.

---

## Características

- Arquitetura em camadas
- API REST seguindo boas práticas HTTP
- Persistência em PostgreSQL
- Prisma ORM
- Containerização completa da aplicação
- Testes automatizados com Jest e Supertest
- Integração Contínua utilizando GitHub Actions

---

## Sumário

- [Demonstração](#demonstração)
- [Status do Projeto](#status-do-projeto)
- [Objetivo](#objetivo)
- [Características](#características)
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando Localmente](#executando-localmente)
- [Executando com Docker](#executando-com-docker)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Como Testar a API](#como-testar-a-api)
- [Endpoints](#endpoints)
- [Modelo de Dados](#modelo-de-dados)
- [Testes](#testes)
- [Tratamento de Erros](#tratamento-de-erros)
- [Scripts](#scripts)
- [Docker](#docker)
- [Integração Contínua (CI)](#integração-contínua-ci)
- [Funcionalidades](#funcionalidades)
- [Melhorias Futuras](#melhorias-futuras)
- [Relato de Experiências e Desafios Enfrentados](#relato-de-experiências-e-desafios-enfrentados)
- [Licença](#licença)
- [Autor](#autor)

---

## Sobre o Projeto

O **Tech Challenge Blog API** foi desenvolvido como requisito avaliativo da **Fase 2 da Pós Tech em Full Stack Development (FIAP)**.

A proposta consiste no desenvolvimento de uma **API REST** para gerenciamento de posts de um blog, permitindo realizar operações completas de **CRUD (Create, Read, Update e Delete)**, além de pesquisa por palavras-chave.

O projeto foi construído seguindo uma **arquitetura em camadas (Layered Architecture)**, separando responsabilidades entre rotas, controladores, serviços e acesso ao banco de dados por meio do Prisma ORM.

Além da implementação da API, o projeto contempla boas práticas de desenvolvimento, incluindo:

- Arquitetura organizada em camadas;
- Persistência de dados com PostgreSQL;
- Prisma ORM para acesso ao banco;
- Containerização utilizando Docker;
- Orquestração com Docker Compose;
- Testes automatizados com Jest e Supertest;
- Integração Contínua (CI) utilizando GitHub Actions.

O objetivo é disponibilizar uma aplicação organizada, escalável e de fácil manutenção, aplicando conceitos fundamentais de desenvolvimento backend moderno.

---

## Tecnologias Utilizadas

As principais tecnologias utilizadas no desenvolvimento deste projeto foram:

| Tecnologia | Finalidade |
|------------|------------|
| Node.js 20 | Ambiente de execução JavaScript |
| Express.js | Framework para construção da API REST |
| Prisma ORM | ORM para comunicação com o banco de dados |
| PostgreSQL 16 | Banco de dados relacional |
| Docker | Containerização da aplicação |
| Docker Compose | Orquestração dos containers |
| Jest | Testes automatizados |
| Supertest | Testes de integração da API |
| GitHub Actions | Integração Contínua (CI) |
| Dotenv | Gerenciamento das variáveis de ambiente |

---

## Arquitetura

O projeto segue o padrão de **Arquitetura em Camadas (Layered Architecture)**, separando responsabilidades entre cada componente da aplicação.

O fluxo de uma requisição HTTP ocorre conforme o diagrama abaixo.

### Fluxo da Requisição

```text
Cliente
    │
    ▼
HTTP Request
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
    │
    ▼
HTTP Response
```

Cada camada possui uma responsabilidade específica.

| Camada | Responsabilidade |
|---------|------------------|
| Routes | Define os endpoints da API |
| Controllers | Recebe as requisições HTTP e retorna as respostas |
| Services | Implementa as regras de negócio |
| Prisma ORM | Realiza o acesso ao banco de dados |
| PostgreSQL | Armazena os dados da aplicação |

---

### Arquitetura da Aplicação

```text
                 API REST

        ┌─────────────────────┐
        │      Express        │
        └─────────┬───────────┘
                  │
        ┌─────────▼───────────┐
        │      Routes         │
        └─────────┬───────────┘
                  │
        ┌─────────▼───────────┐
        │    Controllers      │
        └─────────┬───────────┘
                  │
        ┌─────────▼───────────┐
        │      Services       │
        └─────────┬───────────┘
                  │
        ┌─────────▼───────────┐
        │    Prisma Client    │
        └─────────┬───────────┘
                  │
        ┌─────────▼───────────┐
        │    PostgreSQL 16    │
        └─────────────────────┘
```

---

### Arquitetura com Docker

A aplicação também pode ser executada utilizando Docker Compose.

```text
               Docker Compose
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
   API Node.js              PostgreSQL
        │                         │
        └────────────┬────────────┘
                     ▼
                 Prisma ORM
```

Essa arquitetura facilita a implantação da aplicação em diferentes ambientes, garantindo maior padronização e portabilidade.

---

## Estrutura do Projeto

```text
tech-challenge-blog/
│
├── .github/
│   └── workflows/
│       └── ci.yml                    # Pipeline de Integração Contínua
│
├── prisma/
│   ├── migrations/                   # Histórico das migrations
│   └── schema.prisma                 # Modelo do banco de dados
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
│   │   └── post.test.js
│   │
│   ├── app.js
│   └── server.js
│
├── coverage/                         # Relatórios de cobertura (gerado pelo Jest)
│
├── .dockerignore                     # Arquivos ignorados na construção da imagem Docker
├── .env                              # Variáveis de ambiente (não versionado)
├── .gitignore
├── Dockerfile                        # Imagem da aplicação Node.js
├── docker-compose.yml                # Orquestra API + PostgreSQL
├── jest.config.js                    # Configuração do Jest (opcional)
├── package.json
├── package-lock.json
├── prisma.config.ts                  # Configuração do Prisma
└── README.md
```

---

## Pré-requisitos

Antes de executar o projeto, certifique-se de possuir os seguintes softwares instalados:

- Node.js 20 LTS
- npm
- Docker Desktop
- Docker Compose

> **Observação:** o PostgreSQL é executado em um container Docker, portanto não é necessário instalá-lo localmente.

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/danielromera83/tech-challenge-blog.git
```

Acesse a pasta do projeto:

```bash
cd tech-challenge-blog
```

Instale as dependências:

```bash
npm install
```

---

## Executando Localmente

Após instalar as dependências, inicie o banco de dados PostgreSQL utilizando Docker Compose:

```bash
docker compose up -d banco
```

Verifique se o container está em execução:

```bash
docker ps
```

Configure o arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/blog"
PORT=3000
```

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Inicie a aplicação:

```bash
npm start
```

Ou execute em modo desenvolvimento:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

---

## Executando com Docker

A aplicação também pode ser executada totalmente em containers utilizando Docker Compose.

### Construir as imagens e iniciar os containers

```bash
docker compose up --build
```

Para executar em segundo plano:

```bash
docker compose up -d --build
```

Verificar os containers em execução:

```bash
docker ps
```

Parar os containers:

```bash
docker compose down
```

A API ficará disponível em:

```text
http://localhost:3000
```

O banco PostgreSQL será executado no container:

```text
postgres-blog
```

---
## Configuração do Banco de Dados

O banco de dados utilizado pela aplicação é o **PostgreSQL 16**.

As migrations são gerenciadas pelo Prisma ORM.

Principais comandos:

Aplicar as migrations:

```bash
npx prisma migrate dev
```

Gerar o Prisma Client:

```bash
npx prisma generate
```

Abrir o Prisma Studio:

```bash
npm run prisma:studio
```

Caso seja necessário recriar completamente o banco de dados durante o desenvolvimento:

```bash
npx prisma migrate reset
```

> **Atenção:** o comando `migrate reset` remove todos os dados do banco.

---

## Como Testar a API

Após iniciar a aplicação, os endpoints podem ser testados utilizando ferramentas como:

- Postman
- Insomnia
- cURL

### Exemplo utilizando cURL

Listar todos os posts:

```bash
curl http://localhost:3000/posts
```

Buscar um post por ID:

```bash
curl http://localhost:3000/posts/1
```

Criar um novo post:

```bash
curl -X POST http://localhost:3000/posts \
-H "Content-Type: application/json" \
-d '{
  "titulo":"Primeiro Post",
  "conteudo":"Conteúdo do post",
  "autor":"Daniel Romera"
}'
```

---

## Endpoints

A API disponibiliza os seguintes endpoints para gerenciamento dos posts.

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/posts` | Lista todos os posts |
| GET | `/posts/:id` | Busca um post por ID |
| GET | `/posts/search?termo=` | Pesquisa por palavra-chave |
| POST | `/posts` | Cria um novo post |
| PUT | `/posts/:id` | Atualiza um post existente |
| DELETE | `/posts/:id` | Remove um post |

---

### GET /posts

Retorna todos os posts cadastrados.

---

### GET /posts/:id

Retorna um único post a partir do seu identificador.

Exemplo:

```
GET /posts/1
```

---

### GET /posts/search?termo=

Pesquisa posts utilizando um termo informado.

A busca é realizada nos campos:

- título
- conteúdo
- autor

Exemplo:

```
GET /posts/search?termo=API
```

---

### POST /posts

Cria um novo post.

Body:

```json
{
  "titulo": "API REST",
  "conteudo": "Primeiro post",
  "autor": "Daniel Romera"
}
```

---

### PUT /posts/:id

Atualiza um post existente.

Body:

```json
{
  "titulo": "Novo título",
  "conteudo": "Novo conteúdo",
  "autor": "Daniel Romera"
}
```

---

### DELETE /posts/:id

Remove um post utilizando seu identificador.

Exemplo:

```
DELETE /posts/1
```

---

## Modelo de Dados

A aplicação possui atualmente a entidade **Post**, responsável pelo armazenamento das publicações do blog.

| Campo | Tipo | Descrição |
|--------|------|-----------|
| id | Integer | Identificador único do post |
| titulo | String | Título da publicação |
| conteudo | String | Conteúdo do post |
| autor | String | Nome do autor |
| createdAt | DateTime | Data e hora da criação |

Representação simplificada:

```text
Post
────────────────────────────
id          Integer
titulo      String
conteudo    String
autor       String
createdAt   DateTime
```

---

## Testes

O projeto utiliza testes automatizados para validar o funcionamento da API.

Ferramentas utilizadas:

- Jest
- Supertest

Executar todos os testes:

```bash
npm test
```

Executar os testes com relatório de cobertura:

```bash
npm test -- --coverage
```

Cobertura atual:

**65,85%**

> A cobertura pode evoluir conforme novos testes forem adicionados ao projeto.

Atualmente os testes contemplam cenários como:

- ✅ Listagem de posts
- ✅ Busca por ID
- ✅ Busca por palavra-chave
- ✅ Validação de campos obrigatórios
- ✅ Tratamento de post inexistente
- ✅ Retornos HTTP esperados

---

## Tratamento de Erros

A API retorna códigos HTTP apropriados para cada situação, seguindo boas práticas de desenvolvimento REST.

| Código | Descrição |
|---------|-----------|
| 200 | Requisição realizada com sucesso |
| 201 | Recurso criado com sucesso |
| 400 | Requisição inválida ou campos obrigatórios não informados |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

Os principais cenários tratados incluem:

- validação de campos obrigatórios;
- identificação de parâmetros inválidos;
- pesquisa sem termo informado;
- tentativa de acesso a posts inexistentes;
- tratamento de exceções provenientes do Prisma ORM.

---

## Scripts

Os principais scripts disponíveis no projeto são:

| Script | Descrição |
|---------|-----------|
| `npm start` | Inicia a aplicação |
| `npm run dev` | Executa a aplicação em modo de desenvolvimento |
| `npm test` | Executa os testes automatizados com relatório de cobertura |
| `npm run prisma:generate` | Gera o Prisma Client |
| `npm run prisma:migrate` | Executa as migrations do banco de dados |
| `npm run prisma:studio` | Abre o Prisma Studio |

---

## Docker

O projeto está preparado para execução utilizando **Docker** e **Docker Compose**, permitindo que a API e o banco de dados sejam executados de forma isolada e padronizada.

### Dockerfile

O `Dockerfile` é responsável por criar a imagem da aplicação Node.js.

A imagem da aplicação é construída automaticamente utilizando o Dockerfile presente na raiz do projeto.

Durante o processo de build são realizadas as seguintes etapas:

- utilização da imagem oficial do Node.js 20;
- instalação das dependências do projeto;
- cópia dos arquivos da aplicação;
- geração do Prisma Client;
- exposição da porta 3000;
- inicialização da API.

### Docker Compose

O arquivo `docker-compose.yml` realiza a orquestração dos serviços da aplicação.

Os serviços definidos são:

- **api** — aplicação Node.js
- **banco** — banco de dados PostgreSQL

Docker Compose

┌───────────────┐
│   blog-api    │
└──────┬────────┘
       │
       ▼
┌───────────────┐
│ postgres-blog │
└───────────────┘

### .dockerignore

O arquivo `.dockerignore` evita que arquivos desnecessários sejam enviados para o processo de build da imagem Docker, reduzindo o tamanho da imagem e acelerando sua construção.

Entre os itens ignorados estão:

- node_modules
- coverage
- .git
- arquivos de log

---

## Integração Contínua (CI)

O projeto utiliza **GitHub Actions** para automatizar a validação do código a cada alteração enviada ao repositório.

A pipeline é executada automaticamente em cada **Push** e **Pull Request** para as branches `main` e `master`.

Durante a execução são realizadas as seguintes etapas:

1. Checkout do código-fonte;
2. Configuração do ambiente Node.js;
3. Instalação das dependências;
4. Geração do Prisma Client;
5. Aplicação das migrations;
6. Execução dos testes automatizados.

Esse processo garante que novas alterações sejam validadas antes de serem incorporadas ao projeto.

---

## Funcionalidades

Atualmente a API disponibiliza as seguintes funcionalidades:

- ✅ Cadastro de posts
- ✅ Listagem de todos os posts
- ✅ Consulta por ID
- ✅ Pesquisa por palavra-chave
- ✅ Atualização de posts
- ✅ Exclusão de posts
- ✅ Validação dos dados recebidos
- ✅ Persistência em PostgreSQL
- ✅ Prisma ORM
- ✅ Containerização com Docker
- ✅ Orquestração com Docker Compose
- ✅ Testes automatizados
- ✅ Integração Contínua (GitHub Actions)

---

## Melhorias Futuras

Como evolução do projeto, estão previstas as seguintes melhorias:

- Implementação de autenticação com JWT;
- Cadastro e gerenciamento de usuários;
- Paginação na listagem de posts;
- Documentação da API utilizando Swagger/OpenAPI;
- Validação de dados com bibliotecas específicas;
- Deploy em ambiente de nuvem (Render, Railway ou AWS);
- Ampliação da cobertura dos testes automatizados;
- Pipeline de CD (Continuous Deployment).

---

## Relato de Experiências e Desafios Enfrentados

O desenvolvimento deste projeto proporcionou uma experiência prática na construção de uma API REST utilizando tecnologias modernas do ecossistema Node.js.

Os principais desafios enfrentados foram:

- compreensão da arquitetura em camadas (Routes, Controllers, Services e Prisma);
- configuração inicial do Prisma ORM e gerenciamento das migrations;
- integração entre Node.js e PostgreSQL;
- implementação de testes automatizados utilizando Jest e Supertest;
- containerização da aplicação com Docker e Docker Compose;
- configuração da pipeline de Integração Contínua utilizando GitHub Actions;
- elaboração de uma documentação técnica completa e organizada.

Durante o desenvolvimento foi possível consolidar conhecimentos sobre arquitetura de aplicações backend, persistência de dados, testes automatizados, containerização e automação de processos de integração contínua.

Além do aspecto técnico, o projeto contribuiu para o desenvolvimento de boas práticas de organização de código, documentação e versionamento utilizando Git e GitHub.

---

## Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos como requisito do **Tech Challenge – Fase 2** da Pós Tech em Full Stack Development (FIAP).

---

## Autor

**Daniel Romera**

Profissional com sólida experiência no mercado financeira e liderança de equipes, atualmente em transição para a área de Desenvolvimento Full Stack.

Este projeto foi desenvolvido como parte do Tech Challenge da Pós Tech em Full Stack Development (FIAP), aplicando conceitos de desenvolvimento backend, arquitetura em camadas, bancos de dados relacionais, testes automatizados, Docker e integração contínua.

### Contato

- **GitHub:** https://github.com/danielromera83
- **LinkedIn:** https://www.linkedin.com/in/daniel-romera-a5b522340/

---

⭐ Caso este projeto tenha sido útil, considere deixar uma estrela no repositório.