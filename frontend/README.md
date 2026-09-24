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
| `/login` | Público | Login |
| `/posts/novo` | PROFESSOR | Criação de post |
| `/posts/:id/editar` | PROFESSOR | Edição de post |
| `/admin` | PROFESSOR | Administração |

As rotas administrativas utilizam o componente:

```text
ProtectedRoute.jsx
```

O `ProtectedRoute` verifica o estado da sessão disponibilizado pelo `AuthProvider`.

Usuários não autenticados são redirecionados para:

```text
/login
```

Usuários autenticados sem o papel `PROFESSOR` são redirecionados para:

```text
/
```

A validação realizada no frontend controla a navegação e a experiência do usuário. A autorização efetiva das operações administrativas também é realizada pelo backend.

---

## Autenticação

O frontend utiliza autenticação integrada à API.

O fluxo funciona da seguinte forma:

```text
Usuário informa e-mail e senha
        ↓
POST /auth/login
        ↓
API valida as credenciais
        ↓
API gera um JWT
        ↓
JWT é enviado em cookie HttpOnly
        ↓
AuthProvider consulta GET /auth/me
        ↓
Usuário e papel são armazenados no estado da aplicação
```

O token de autenticação não é armazenado no `localStorage` e não é manipulado diretamente pelo JavaScript do frontend.

O cookie é enviado automaticamente nas requisições através da configuração:

```js
credentials: "include"
```

### Estado de autenticação

O `AuthProvider` mantém informações como:

```text
user
autenticado
professor
carregando
```

Ao iniciar a aplicação, o frontend consulta:

```http
GET /auth/me
```

para verificar se já existe uma sessão válida.

O login utiliza:

```http
POST /auth/login
```

e o logout utiliza:

```http
POST /auth/logout
```

As páginas administrativas somente são liberadas quando o usuário possui o papel:

```text
PROFESSOR
```

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

O serviço centraliza as chamadas HTTP e envia o cookie de autenticação através de:

```js
credentials: "include"
```

### Autenticação

```text
POST   /auth/login
GET    /auth/me
POST   /auth/logout
```

### Posts

```text
GET    /posts
GET    /posts/:id
GET    /posts/search
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
```

As operações:

```text
POST
PUT
DELETE
```

exigem usuário autenticado com papel `PROFESSOR`.

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
npm ci
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

O frontend não armazena o JWT em `localStorage` nem utiliza token estático.

A autenticação é controlada pelo backend, e o JWT é recebido em cookie `HttpOnly`.

No frontend:

- o `AuthProvider` mantém apenas o estado do usuário e da sessão;
- as requisições utilizam `credentials: "include"`;
- o `ProtectedRoute` exige sessão válida;
- as rotas administrativas exigem o papel `PROFESSOR`;
- o token não é acessado diretamente pelo JavaScript.

A proteção visual do frontend não substitui a autorização do backend. As operações administrativas também são protegidas na API.

Possíveis evoluções incluem:

- configuração da URL da API por variável de ambiente;
- testes automatizados dos componentes e fluxos de autenticação;
- tratamento global de expiração de sessão;
- melhorias adicionais de acessibilidade e feedback ao usuário.

---

## Autor

**Daniel Romera**

Pós Tech em Full Stack Development — FIAP.