# Tech Challenge Blog — Mobile

Aplicação mobile desenvolvida em **React Native com Expo** para a **Fase 4 do Tech Challenge — Pós Tech Full Stack Development (FIAP)**.

O aplicativo consome a API REST desenvolvida nas fases anteriores e disponibiliza uma interface mobile para consulta de postagens e gerenciamento administrativo por professores.

---

## Tecnologias

- React Native
- Expo SDK 57
- Expo Router
- React 19
- TypeScript
- Expo Secure Store
- REST API
- JWT / Bearer Token
- Node.js
- Express
- PostgreSQL
- Prisma ORM

---

## Funcionalidades

### Área pública

O aplicativo permite:

- Listar os posts disponíveis;
- Visualizar título, autor e resumo das postagens;
- Buscar posts por palavras-chave;
- Visualizar o conteúdo completo de uma postagem.

### Área do Professor

Após autenticação, professores podem:

- Criar posts;
- Editar posts;
- Excluir posts;
- Listar professores;
- Cadastrar professores;
- Editar professores;
- Excluir professores;
- Navegar pela listagem paginada de professores;
- Listar alunos;
- Cadastrar alunos;
- Editar alunos;
- Excluir alunos;
- Navegar pela listagem paginada de alunos.

---

## Autenticação e autorização

A autenticação do aplicativo utiliza **JWT**.

Após o login, a API retorna um token que é armazenado no dispositivo utilizando:

```text
expo-secure-store
```

As requisições protegidas enviam o token através do cabeçalho HTTP:

```text
Authorization: Bearer <token>
```

O backend continua compatível com a autenticação utilizada pela aplicação web e também aceita Bearer Token para o cliente mobile.

As operações administrativas são protegidas no backend, permitindo criação, alteração e exclusão de recursos somente para usuários com perfil:

```text
PROFESSOR
```

Alunos possuem acesso de visualização das postagens, sem permissão para alterar conteúdo administrativo.

---

## Arquitetura do Mobile

A aplicação utiliza uma organização baseada em rotas, telas e serviços.

Estrutura principal:

```text
mobile/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   │
│   │   ├── post/
│   │   │   └── [id].tsx
│   │   │
│   │   └── admin/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       │
│   │       ├── posts/
│   │       │   ├── new.tsx
│   │       │   └── [id].tsx
│   │       │
│   │       ├── professores/
│   │       │   ├── index.tsx
│   │       │   ├── new.tsx
│   │       │   └── [id].tsx
│   │       │
│   │       └── alunos/
│   │           ├── index.tsx
│   │           ├── new.tsx
│   │           └── [id].tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   └── auth.ts
│   │
│   ├── constants/
│   └── hooks/
│
├── assets/
├── app.json
├── package.json
└── tsconfig.json
```

### `src/app`

Contém as telas e as rotas da aplicação utilizando **Expo Router**.

### `src/services/api.ts`

Centraliza a comunicação com os endpoints REST da API.

Responsabilidades principais:

- Consulta de posts;
- Busca de posts;
- CRUD de posts;
- CRUD de professores;
- CRUD de alunos;
- Inclusão do Bearer Token nas requisições autenticadas.

### `src/services/auth.ts`

Responsável pela autenticação do usuário.

Principais responsabilidades:

- Login;
- Armazenamento seguro do JWT;
- Recuperação do token;
- Consulta do usuário autenticado;
- Logout;
- Exclusão do token.

### `src/app/admin`

Concentra as telas administrativas acessíveis aos professores.

O layout administrativo também realiza validação do usuário autenticado antes da utilização das telas protegidas.

A autorização definitiva das operações é realizada pelo backend.

---

## Pré-requisitos

Para executar o projeto é necessário possuir:

- Node.js 22 ou versão compatível;
- npm;
- Docker e Docker Compose para os serviços do projeto;
- Expo CLI através do `npx`;
- Xcode para execução no iOS;
- Android Studio para execução em Android, quando utilizado.

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/danielromera83/tech-challenge-blog.git
```

Entre no projeto:

```bash
cd tech-challenge-blog
```

Instale as dependências do backend:

```bash
npm install
```

Depois entre no mobile:

```bash
cd mobile
```

Instale as dependências:

```bash
npm install
```

---

## Configuração da API

O aplicativo utiliza a variável:

```text
EXPO_PUBLIC_API_URL
```

Ela deve apontar para o endereço da API Node.js.

Exemplo utilizando o IP da máquina na rede local:

```text
EXPO_PUBLIC_API_URL=http://192.168.0.100:3000
```

Substitua o endereço pelo IP da máquina onde o backend estiver sendo executado.

### Importante

Ao utilizar simulador ou dispositivo físico, evite depender de:

```text
http://localhost:3000
```

pois `localhost` pode representar o próprio dispositivo ou simulador.

É recomendado utilizar o IP da máquina na rede local.

---

## Executando o backend

Na raiz do repositório, certifique-se de que o PostgreSQL esteja disponível.

Os serviços do projeto podem ser iniciados através do Docker conforme a configuração da raiz do repositório.

Depois execute a API localmente:

```bash
node src/server.js
```

A API deverá ficar disponível na porta:

```text
3000
```

Teste:

```bash
curl http://localhost:3000/posts
```

---

## Executando o Mobile

Entre na pasta:

```bash
cd mobile
```

### Development Build utilizando rede local

Exemplo:

```bash
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000 npx expo start --dev-client --lan -c
```

Substitua:

```text
SEU_IP_LOCAL
```

pelo IP da máquina onde a API está sendo executada.

---

## iOS

Para gerar e instalar o development build:

```bash
npx expo run:ios
```

Depois, com o build instalado, o Metro pode ser executado com:

```bash
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000 npx expo start --dev-client --lan
```

### Xcode e suporte ao UIScene

O projeto utiliza `expo-build-properties` com suporte ao ciclo de vida baseado em `UIScene`, necessário para compatibilidade com versões recentes do SDK do iOS/Xcode.

A configuração está presente no `app.json`.

---

## Android

Para gerar o projeto Android:

```bash
npx expo run:android
```

A variável `EXPO_PUBLIC_API_URL` também deve apontar para um endereço acessível pelo emulador ou dispositivo.

---

## Fluxo de utilização

### Visualização pública

1. Abra o aplicativo;
2. A tela inicial apresenta as postagens;
3. Utilize o campo de busca para pesquisar conteúdo;
4. Toque em um post para visualizar seu conteúdo completo.

### Login de professor

1. Na Home, selecione **Área do Professor**;
2. Informe e-mail e senha de um professor cadastrado;
3. Após a autenticação, o aplicativo direcionará para a área administrativa.

### Gerenciamento de posts

Na Área do Professor é possível:

- Criar um novo post;
- Editar posts;
- Excluir posts.

### Gerenciamento de professores

Selecione:

```text
Gerenciar professores
```

A tela permite:

- Listar professores;
- Navegar pela paginação;
- Criar professor;
- Editar professor;
- Excluir professor.

### Gerenciamento de alunos

Selecione:

```text
Gerenciar alunos
```

A tela permite:

- Listar alunos;
- Navegar pela paginação;
- Criar aluno;
- Editar aluno;
- Excluir aluno.

---

## Integração com a API REST

O mobile utiliza os endpoints disponibilizados pelo backend para:

### Posts

```text
GET    /posts
GET    /posts/search
GET    /posts/:id
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
```

### Autenticação

```text
POST /auth/login
GET  /auth/me
```

### Professores

```text
GET    /professores
GET    /professores/:id
POST   /professores
PUT    /professores/:id
DELETE /professores/:id
```

### Alunos

```text
GET    /alunos
GET    /alunos/:id
POST   /alunos
PUT    /alunos/:id
DELETE /alunos/:id
```

---

## Segurança

O token JWT não é armazenado diretamente em arquivos da aplicação.

No mobile é utilizado:

```text
expo-secure-store
```

As rotas administrativas também são protegidas pelo backend através dos middlewares de autenticação e autorização.

Dessa forma, mesmo que uma tela administrativa seja acessada diretamente, uma operação protegida não é executada sem um token JWT válido associado a um professor.

---

## Testes

O backend possui testes automatizados utilizando Jest e Supertest.

A suíte contempla, entre outros cenários:

- Autenticação;
- Autorização;
- Operações de posts;
- Proteção de rotas;
- Bearer Token;
- CRUD de professores;
- CRUD de alunos;
- Paginação.

Para executar os testes do backend:

```bash
npm test
```

---

## Validações realizadas no Mobile

Durante o desenvolvimento foram validados manualmente:

- Inicialização da aplicação;
- Comunicação mobile → API REST;
- Listagem de posts;
- Busca de posts;
- Leitura completa de post;
- Login do professor;
- Logout;
- Criação de posts;
- Edição de posts;
- Exclusão de posts;
- Criação de professores;
- Edição de professores;
- Exclusão de professores;
- Paginação de professores;
- Criação de alunos;
- Edição de alunos;
- Exclusão de alunos;
- Paginação de alunos.

A validação principal do desenvolvimento foi realizada utilizando simulador iOS.

---

## Experiências e desafios encontrados

### Integração entre Mobile e API local

Um dos principais desafios foi a comunicação entre o aplicativo executado no simulador e a API disponível na máquina de desenvolvimento.

Durante os testes foi necessário substituir referências a `localhost` pelo IP da máquina na rede local para permitir que o development build acessasse corretamente o backend e o Metro Bundler.

### Autenticação para aplicação mobile

A aplicação web existente utilizava autenticação baseada em cookie.

Para preservar a compatibilidade com o frontend existente e permitir autenticação no aplicativo mobile, o backend passou a aceitar também:

```text
Authorization: Bearer <JWT>
```

O login continua compatível com a aplicação web, enquanto o mobile armazena o token utilizando Secure Store.

### Compatibilidade com versões recentes do iOS/Xcode

Durante a criação do development build foi necessário adequar o projeto ao ciclo de vida baseado em `UIScene`.

A configuração foi realizada utilizando:

```text
expo-build-properties
```

com suporte ao Scene Lifecycle habilitado.

### Manutenção da segurança no backend

Além da proteção visual das telas administrativas, a segurança das operações permanece centralizada na API.

Os endpoints responsáveis pela alteração dos dados verificam autenticação e perfil do usuário, impedindo operações administrativas sem autorização válida.

---

## Decisões técnicas

Algumas decisões adotadas no desenvolvimento:

- **Expo Router** para navegação baseada na estrutura de arquivos;
- **TypeScript** para melhorar segurança de tipos;
- **Secure Store** para armazenamento do JWT;
- Serviços separados para comunicação com API e autenticação;
- Reutilização da API REST desenvolvida nas fases anteriores;
- Compatibilidade simultânea com autenticação web por cookie e mobile por Bearer Token;
- Uso de componentes funcionais e hooks do React.

---

## Considerações finais

A Fase 4 adiciona ao Tech Challenge Blog uma interface mobile integrada ao mesmo backend utilizado pela aplicação web.

A solução mantém a separação entre interface e regras de negócio, centralizando persistência, autenticação e autorização na API REST.

O aplicativo permite acesso público às postagens e disponibiliza aos professores uma área administrativa completa para gerenciamento de posts, professores e alunos.

---

## Autor

**Daniel de Araújo Romera**

Pós Tech — Full Stack Development  
FIAP