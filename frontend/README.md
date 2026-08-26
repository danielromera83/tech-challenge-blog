# Frontend — Tech Challenge Blog

Frontend desenvolvido com **React** para a Fase 3 do Tech Challenge da Pós Tech em **Full Stack Development — FIAP**.

A aplicação fornece uma interface responsiva para consulta e gerenciamento das publicações disponibilizadas pela API REST do projeto.

---

## Tecnologias

- React 19.2.8
- React DOM 19.2.8
- React Router DOM 7.18.2
- Vite 8.2.2
- ESLint 10.9.0
- Context API
- CSS responsivo
- Nginx
- Docker

---

## Funcionalidades

### Acesso público

- Listagem de posts
- Pesquisa por palavra-chave
- Leitura completa de uma publicação

### Professor autenticado

- Login
- Logout
- Criação de posts
- Edição de posts
- Exclusão de posts
- Painel administrativo

---

## Estrutura

```text
src/
│
├── components/
│   ├── Header.jsx
│   ├── PostCard.jsx
│   └── ProtectedRoute.jsx
│
├── contexts/
│   ├── auth.js
│   └── AuthProvider.jsx
│
├── pages/
│   ├── Admin.jsx
│   ├── CreatePost.jsx
│   ├── EditPost.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   └── PostDetail.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── index.css
└── main.jsx
```

---

## Arquitetura

```text
                 React
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
      Pages               Components
        │
        ├──────────┐
        │          │
        ▼          ▼
   Context API   api.js
                   │
                   ▼
             REST API
                   │
                   ▼
          Node.js / Express
```

O arquivo `services/api.js` centraliza as requisições HTTP realizadas pelo frontend.

---

## Rotas

| Rota | Acesso | Descrição |
|---|---|---|
| `/` | Público | Lista e pesquisa posts |
| `/posts/:id` | Público | Leitura completa |
| `/login` | Público | Login do professor |
| `/posts/novo` | Protegido | Criação de post |
| `/posts/:id/editar` | Protegido | Edição de post |
| `/admin` | Protegido | Administração |

As rotas protegidas utilizam o componente:

```text
ProtectedRoute.jsx
```

Usuários não autenticados são redirecionados para:

```text
/login
```

---

## Autenticação

A autenticação implementada neste projeto é uma **simulação acadêmica**.

Credenciais de demonstração:

```text
E-mail: professor@fiap.com.br
Senha: fiap2026
```

Após o login, o token:

```text
techchallenge2026
```

é armazenado no `localStorage`.

O serviço de API utiliza esse token nas operações protegidas:

```http
Authorization: Bearer techchallenge2026
```

> As credenciais e o token estáticos são utilizados exclusivamente para fins acadêmicos e não representam uma implementação indicada para produção.

---

## Integração com a API

Por padrão, o frontend utiliza:

```text
http://localhost:3000
```

como endereço da API.

Arquivo responsável:

```text
src/services/api.js
```

Operações disponíveis:

```text
GET    /posts
GET    /posts/:id
GET    /posts/search
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
```

---

## Executando em Desenvolvimento

O backend deve estar disponível em:

```text
http://localhost:3000
```

Entre na pasta do frontend:

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

A aplicação ficará disponível normalmente em:

```text
http://localhost:5173
```

---

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor Vite |
| `npm run build` | Gera o build de produção |
| `npm run lint` | Executa o ESLint |
| `npm run preview` | Pré-visualiza o build |

---

## Build

Para gerar a aplicação de produção:

```bash
npm run build
```

Os arquivos são criados em:

```text
dist/
```

---

## ESLint

Executar a análise estática:

```bash
npm run lint
```

A validação também faz parte do pipeline de Integração Contínua.

---

## Responsividade

A interface foi desenvolvida para funcionar em:

- desktop;
- tablet;
- smartphones.

Foram utilizadas media queries para reorganizar:

- navegação;
- cards;
- formulários;
- campo de pesquisa;
- botões administrativos.

Também foram aplicados cuidados de acessibilidade, incluindo:

- labels associadas aos campos;
- foco visível;
- áreas clicáveis adequadas;
- mensagens de erro com `role="alert"`.

---

## Docker

O frontend possui um Dockerfile multi-stage.

### Build

```text
Node.js
   │
   ▼
npm ci
   │
   ▼
npm run build
   │
   ▼
dist/
```

### Produção

```text
dist/
  │
  ▼
Nginx
  │
  ▼
Porta 80
```

Quando executado através do Docker Compose do projeto, o frontend fica disponível em:

```text
http://localhost:8080
```

---

## React Router e Nginx

O Nginx está configurado para suportar acesso direto às rotas da aplicação:

```nginx
try_files $uri $uri/ /index.html;
```

Dessa forma, URLs como:

```text
/admin
/login
/posts/14
```

continuam funcionando mesmo após atualização direta do navegador.

---

## CI

O frontend é validado pelo GitHub Actions.

As etapas executadas são:

```text
npm ci
npm run lint
npm run build
```

O workflow está localizado na raiz do projeto:

```text
.github/workflows/ci.yml
```

---

## Segurança

O fluxo atual de autenticação foi criado para atender ao contexto acadêmico do Tech Challenge.

Uma implementação de produção deverá substituir o mecanismo atual por recursos como:

- autenticação real de usuários;
- senhas com hash;
- JWT;
- expiração de sessão;
- autorização por perfil;
- armazenamento seguro de segredos.

---

## Autor

**Daniel Romera**

Pós Tech em Full Stack Development — FIAP.