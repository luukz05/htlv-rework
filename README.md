# WikiHowl (HLTV Rework)

Reimplementação do HLTV.org como um portal moderno de Counter-Strike — notícias, partidas ao vivo, rankings, perfis de times e jogadores, fórum, fantasy, betting odds, galleries, highlights, academy e uma suíte de minigames com sistema de XP/níveis/achievements.

Monorepo simples com **frontend Next.js 16 / React 19** e **backend Express 5 + MongoDB**, ambos em TypeScript.

---

## Sumário

- [Stack](#stack)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Pré-requisitos](#pré-requisitos)
- [Setup rápido](#setup-rápido)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Rodando em desenvolvimento](#rodando-em-desenvolvimento)
- [Build e produção](#build-e-produção)
- [Backend — arquitetura](#backend--arquitetura)
- [Frontend — arquitetura](#frontend--arquitetura)
- [API REST](#api-rest)
- [Autenticação e sessão](#autenticação-e-sessão)
- [Sistema de gamificação](#sistema-de-gamificação)
- [Modelo de dados (MongoDB)](#modelo-de-dados-mongodb)
- [Segurança](#segurança)
- [Scripts disponíveis](#scripts-disponíveis)
- [Convenções de UI](#convenções-de-ui)

---

## Stack

**Frontend**
- Next.js `16.1.6` (App Router, Turbopack como root)
- React `19.2.3`
- TypeScript `5.9.3`
- Tailwind CSS `v4` (via `@tailwindcss/postcss`)
- `lucide-react` para ícones
- Fontes: Roboto + Passion One via `next/font/google`

**Backend**
- Node.js 20+
- **Express `5.x`** + `cors` middleware
- TypeScript `5.9.3`, ESM (`NodeNext`)
- MongoDB driver `7.x`
- `bcryptjs` para hash de senha
- `jsonwebtoken` para sessões via cookie HttpOnly
- `tsx` para dev (hot-reload de TS)

**Observações**
- Tema **dark only**, container central com `max-width: 1480px` (`globals.css`)
- Paleta CS-inspired: blue `#3b5bdb`, green `#22c55e`, red `#ef4444`, yellow `#eab308`, orange `#f97316`

---

## Estrutura do repositório

```
htlv-rework/
├── package.json              # scripts agregadores do monorepo
├── backend/
│   ├── .env                  # MONGODB_URI, JWT_SECRET, PORT, ...
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── server.ts         # bootstrap: createApp() + listen, aguarda Mongo
│       ├── routes/
│       │   └── index.ts      # createApp(): monta cors + express.json + rotas
│       ├── controllers/      # handlers Express por domínio
│       │   ├── usersController.ts
│       │   ├── playersController.ts
│       │   ├── teamsController.ts
│       │   ├── matchesController.ts
│       │   ├── contentController.ts   # news/events/maps/academy/highlights/streams/galleries
│       │   ├── forumsController.ts
│       │   ├── commentsController.ts
│       │   ├── platformController.ts  # navigation, games, achievements, fantasy, betting
│       │   └── searchController.ts    # busca global
│       ├── http/
│       │   ├── response.ts   # helpers json/notFound/badRequest/... sobre res
│       │   └── cookies.ts    # cookie de sessão HttpOnly (parse/set/clear)
│       ├── lib/
│       │   ├── auth.ts       # bcrypt + jwt (sign/verify)
│       │   ├── session.ts    # getAuthedUser, rankForLevel, relativeTime
│       │   ├── scoring.ts    # validação + cálculo de XP por minigame
│       │   └── tournament.ts # geração de chaveamento simulado
│       ├── data/
│       │   ├── types.ts      # contratos de domínio (Team, Match, Player, ...)
│       │   └── config.ts     # navegação, games, achievements, daily challenges
│       └── db/
│           ├── client.ts     # MongoClient singleton + ensureIndexes
│           ├── users.ts
│           ├── teams.ts
│           ├── teamProfiles.ts
│           ├── players.ts
│           ├── matches.ts
│           ├── ranking.ts
│           ├── news.ts
│           ├── events.ts
│           ├── maps.ts
│           ├── content.ts    # academy/highlights/round/streams/galleries
│           ├── forums.ts
│           └── comments.ts
└── frontend/
    ├── package.json
    ├── tsconfig.json         # paths { "@/*": ["./src/*"] }
    ├── next.config.ts        # basePath/assetPrefix opcionais + redirect /rankings → /rankings/teams
    ├── eslint.config.mjs
    ├── postcss.config.mjs
    ├── public/               # logo, mapas, ícones, news, players, teams
    └── src/
        ├── app/              # Next App Router
        │   ├── layout.tsx
        │   ├── page.tsx      # home
        │   ├── globals.css
        │   ├── loading.tsx, not-found.tsx
        │   ├── login/, register/, profile/
        │   ├── news/, news/[id]/
        │   ├── matches/, matches/[id]/
        │   ├── results/
        │   ├── events/, events/[id]/
        │   ├── teams/[id]/
        │   ├── rankings/teams, rankings/players, rankings/players/[id]
        │   ├── hall-of-fame/
        │   ├── highlights/, galleries/, academy/, academy/[id]/
        │   ├── forums/, forums/[id]/
        │   ├── fantasy/, betting/
        │   └── games/        # csdle, guess-lineup, higher-lower,
        │                     # map-guesser, crosshair-challenge, transfer-trivia
        ├── components/       # Header, Footer, Sidebar, SearchBar, HeroMatch,
        │                     # NewsSection, CommentList, ForumReplyList,
        │                     # NewThreadDialog, UserMenu, SignInWall,
        │                     # CountryFlag, TeamLogo, StatusPill
        ├── lib/
        │   ├── auth-context.tsx     # AuthProvider + useAuth
        │   ├── gamification.ts      # thresholds, level names, achievements
        │   ├── country-flags.ts
        │   ├── daily-seed.ts        # PRNG determinístico por dia
        │   ├── maps.ts              # backgrounds e ícones por mapa
        │   ├── page-title.ts, use-page-title.ts
        │   └── resolve-page-data.ts # Promise.all helper para SSR
        ├── services/
        │   ├── api.ts        # cliente fetch tipado de toda a API
        │   └── types.ts      # contratos espelhando o backend
        └── data/
            └── hall-of-fame.ts      # dataset estático
```

---

## Pré-requisitos

- **Node.js 20+** (o backend usa `--env-file` e o frontend depende de Next 16)
- **npm** (lockfiles `package-lock.json` versionados)
- **MongoDB**: instância local ou cluster Atlas. O backend cria índices automaticamente no primeiro boot.

---

## Setup rápido

```bash
# instala dependências de backend e frontend
npm run setup

# ou separadamente:
npm --prefix backend install
npm --prefix frontend install
```

---

## Variáveis de ambiente

### Backend (`backend/.env`)

| Variável            | Descrição                                                  | Default                   |
| ------------------- | ---------------------------------------------------------- | ------------------------- |
| `MONGODB_URI`       | Connection string do MongoDB (obrigatório)                 | —                         |
| `MONGODB_DB`        | Nome do banco                                              | `hltv`                    |
| `JWT_SECRET`        | Segredo para assinar tokens (obrigatório)                  | —                         |
| `JWT_EXPIRES_IN`    | TTL do token JWT (ex: `7d`, `12h`)                         | `7d`                      |
| `FRONTEND_ORIGIN`   | Origens permitidas em CORS (CSV; previews `*.vercel.app` derivados do host base) | `http://localhost:3000,https://htlv-rework.vercel.app` |
| `PORT`              | Porta do servidor HTTP                                     | `4000`                    |
| `COOKIE_SECURE`     | Força flag `Secure` no cookie (`true`/`false`)             | `true` se `NODE_ENV=production` |

> O cookie de sessão (`hltv_session`) é `HttpOnly`, `Path=/`, `Max-Age=7d`. `SameSite=None; Secure` em cross-site HTTPS (ex.: Vercel → Render) e `SameSite=Lax` em dev local HTTP — decidido em runtime por `http/cookies.ts` a partir de `Origin` / `X-Forwarded-Proto` / `COOKIE_SECURE`.

### Frontend

| Variável                    | Descrição                                              | Default                  |
| --------------------------- | ------------------------------------------------------ | ------------------------ |
| `NEXT_PUBLIC_API_URL`       | URL do backend que o cliente vai consumir              | `http://localhost:4000`  |
| `NEXT_PUBLIC_BASE_PATH`     | Prefixo para deploy em subpath (ex: `/wikihowl`)       | (vazio)                  |

---

## Rodando em desenvolvimento

Em terminais separados:

```bash
# Backend (http://localhost:4000)
npm run backend:dev

# Frontend (http://localhost:3000)
npm run dev          # alias de frontend:dev
```

`backend:dev` usa `tsx --env-file=.env src/server.ts` (hot reload de TS sem build prévio).
`frontend:dev` roda `next dev` com Turbopack.

Verificação rápida:

```bash
curl http://localhost:4000/health
# → {"ok":true}
```

---

## Build e produção

```bash
# Backend (gera dist/)
npm run backend:build
npm run backend:start    # node --env-file=.env dist/server.js

# Frontend (gera .next/)
npm run frontend:build   # next build --webpack
npm run frontend:start   # next start -p 3000
```

Para deploy, hospede backend e frontend separadamente e configure `NEXT_PUBLIC_API_URL` no ambiente do frontend apontando para a URL pública do backend.

---

## Backend — arquitetura

### Stack interna

- **Express 5** como camada HTTP. Toda a configuração de app vive em `src/routes/index.ts:createApp()`, que retorna o `Express` já com middlewares + rotas montadas. `src/server.ts` apenas aguarda `getDb()` e chama `app.listen(PORT)`.
- **CORS** via pacote `cors` com função `origin: (origin, cb) => …`. Allowlist vem de `FRONTEND_ORIGIN` (CSV) + derivação automática de previews `https://<projeto>-*.vercel.app` para cada host base configurado. Credentials habilitadas.
- **Body parsing** via `express.json({ limit: "100kb" })`. Handlers leem `req.body` direto.
- **Handlers** usam `RequestHandler` do Express (path params tipados onde existem: `RequestHandler<{ id: string }>`, `{ slug }`, `{ gameId }`). Respondem JSON via helpers `json/notFound/badRequest/unauthorized/conflict` em `src/http/response.ts`, que envelopam `res.status().json(...)`.
- **Camada `db/`** expõe `*Collection()` + funções `*FromDb()` por domínio. `getDb()` é singleton com `ensure*Indexes` no primeiro acesso.
- Dados estáticos de configuração (navegação, games, achievements, daily challenges) ficam em `src/data/config.ts`. Domain types em `src/data/types.ts`.
- O dataset *seed* foi removido — coleções precisam ser populadas manualmente (ou via script externo) no MongoDB. Apenas índices são garantidos no boot.

### Padrões

- **ESM puro** (`"type": "module"`), imports usam `.js` mesmo em arquivos `.ts` (requirement do `NodeNext`).
- Erros do Mongo crasham o boot com `process.exit(1)` (visível em `server.ts`).
- Bodies JSON com limite de **100kb** (`express.json`). Bodies inválidos viram `400 Bad Request` automaticamente.
- Ordem de registro de rotas no `createApp()` importa: rotas específicas (`/players/top`, `/teams/cards`, `/matches/live`, etc.) **antes** de `/<resource>/:id`.
- Tipos do Express (`@types/express`, `@types/cors`) ficam em `dependencies` (não em devDependencies) porque o build em produção (Render) só instala `dependencies`.
- Debounce de submissão de minigames em memória (`Map<userId:gameId, lastTimestamp>`) para evitar spam (2s).

---

## Frontend — arquitetura

### Padrão de páginas

- **Server Components por padrão**. Páginas em `src/app/<rota>/page.tsx` chamam o backend via `api.*` (de `services/api.ts`) com `cache: "no-store"` e `credentials: "include"`.
- Páginas grandes/interativas extraem o conteúdo em `*Client.tsx` `"use client"` (ex: `ResultsClient.tsx`, `HighlightsClient.tsx`, `GalleriesClient.tsx`, `TeamsClient.tsx`, `StatsClient.tsx`).
- `resolvePageData({ a: api.x(), b: api.y() })` é um wrapper sobre `Promise.all` para coletar várias promessas tipadas em paralelo no SSR.

### Layout

- `app/layout.tsx` envolve tudo em `<AuthProvider>` + `<Header />` + `<Footer />` dentro de `.site-page-frame` (1480px central, com gradiente lateral fixo).
- Paths absolutos via `@/*` (mapeado em `tsconfig.json` para `./src/*`).
- Header tem dropdowns para Rankings/Media/Community e busca global integrada (`SearchBar` chama `api.search`).

### Estado de auth

- `AuthProvider` (`lib/auth-context.tsx`) mantém o usuário corrente. Em mount chama `api.me()`; rejeita 401 silenciosamente.
- Expõe `login`, `register`, `logout`, `refresh`, `recordGameResult` (esse último também atualiza o usuário com a resposta do backend, refletindo XP/level imediatamente na UI).

### Páginas existentes

| Rota                              | Conteúdo                                              |
| --------------------------------- | ----------------------------------------------------- |
| `/`                               | Home: hero match, news, sidebar, MVP da semana        |
| `/news`, `/news/[id]`             | Listagem e artigo com comentários                     |
| `/matches`, `/matches/[id]`       | Calendário, partida ao vivo, head-to-head, comments   |
| `/results`                        | Resultados (cliente)                                  |
| `/events`, `/events/[id]`         | Eventos/torneios                                      |
| `/teams/[id]`                     | Perfil de time (roster, mapas, achievements, H2H)     |
| `/rankings/teams`, `/players`     | Tabs (`NavTabs.tsx`) + tabelas filtráveis             |
| `/rankings/players/[id]`          | Perfil completo de jogador                            |
| `/hall-of-fame`                   | Dataset estático em `src/data/hall-of-fame.ts`        |
| `/highlights`, `/galleries`       | Vídeos/galerias                                       |
| `/academy`, `/academy/[id]`       | Guias                                                 |
| `/forums`, `/forums/[id]`         | Threads + replies + likes (autenticado)               |
| `/fantasy`, `/betting`            | Fantasy leaderboard e odds simuladas                  |
| `/login`, `/register`, `/profile` | Auth e perfil do usuário                              |
| `/games`                          | Hub dos minigames + 6 sub-rotas                       |

---

## API REST

Base URL: `http://localhost:4000` (configurável). Todas as rotas retornam JSON. Campos protegidos exigem cookie `hltv_session`.

### Health & meta

```
GET  /health
GET  /navigation
GET  /search?q=<term>
GET  /auth/diag                             # diagnóstico de cookie/JWT
```

### Auth & usuário

```
POST /auth/register      { username, email, password }
POST /auth/login         { email, password }
POST /auth/logout
GET  /users/me                              [auth]
PATCH /users/me/profile  { username? }      [auth]
POST /users/me/games/:gameId/result         [auth] — payload depende do gameId
```

`gameId ∈ { csdle, higherLower, crosshair, mapGuesser, guessLineup, transferTrivia }`

### Catálogo de jogos / plataforma

```
GET /achievements
GET /daily-challenges
GET /games
GET /fantasy/leaderboard
GET /fantasy/players
GET /betting/bookmakers
GET /betting/odds
```

### Conteúdo competitivo

```
GET /players                  GET /players/top
GET /players/of-the-week      GET /players/:id

GET /teams                    GET /teams/cards
GET /teams/rosters            GET /teams/:id
GET /rankings

GET /matches                  GET /matches/live
GET /matches/upcoming         GET /matches/results
GET /matches/:id

GET /news                     GET /news/:id
GET /news/:id/comments        POST /news/:id/comments         [auth]

GET /matches/:id/comments     POST /matches/:id/comments      [auth]
POST /comments/:id/like                                       [auth]

GET /events                   GET /events/:id

GET /forums                   GET /forums/:id
GET /forums/:id/replies       POST /forums                    [auth]
POST /forums/:id/replies                                      [auth]
POST /forum-replies/:id/like                                  [auth]

GET /maps                     GET /maps/:slug
GET /map-callout-quizzes

GET /academy                  GET /academy/:id
GET /highlights               GET /highlights/round
GET /streams                  GET /galleries
```

### Exemplos

```bash
curl http://localhost:4000/health
curl http://localhost:4000/players/top
curl -i -X POST http://localhost:4000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","email":"alice@example.com","password":"hunter2hunter"}'
```

---

## Autenticação e sessão

1. `register`/`login` criam um JWT (`{ userId }`, expira em `JWT_EXPIRES_IN`, default `7d`) assinado com `JWT_SECRET`.
2. O token é gravado num cookie `hltv_session` (`HttpOnly`, `Path=/`, `Max-Age=7d`). O modo de cookie é decidido em runtime: `SameSite=None; Secure` em cross-site HTTPS (Origin/X-Forwarded-Proto `https://...`) e `SameSite=Lax` em dev HTTP. `COOKIE_SECURE=true|false` força o modo. O cliente nunca lê o token.
3. Em requests subsequentes, `getAuthedUser(req)` em `lib/session.ts` lê o cookie, verifica o JWT e busca o documento de usuário no Mongo.
4. CORS no `createApp()` aceita as origens listadas em `FRONTEND_ORIGIN` (CSV) **mais** previews `https://<projeto>-*.vercel.app` derivados de cada host base. `Access-Control-Allow-Credentials: true`.

**Validações de input**
- `username`: regex `^[a-zA-Z0-9_]{3,20}$`
- `email`: regex simples (`^[^\s@]+@[^\s@]+\.[^\s@]+$`)
- `password`: mínimo 8 caracteres; bcrypt rounds = 10

---

## Sistema de gamificação

Implementado em `backend/src/lib/scoring.ts` + `controllers/usersController.ts` e refletido no cliente em `frontend/src/lib/gamification.ts`.

### Minigames e XP máximo por jogada

| Game             | XP cap | Regra resumida                                                       |
| ---------------- | ------ | -------------------------------------------------------------------- |
| `csdle`          | 100    | 1 tentativa = 100 XP, 2-3 = 60, 4-5 = 40, 6+ = 25, falha = 5         |
| `higherLower`    | 100    | streak ≥15 → 100, ≥10 → 60, ≥5 → 30, ≥3 → 15, senão 5                |
| `crosshair`      | 220    | `score×3` + bônus por accuracy (≥90 → +40, ≥70 → +20)                |
| `mapGuesser`     | 200    | `score×12` (+80 se 10/10)                                            |
| `guessLineup`    | 280    | `correctCount×15 + timeLeft×2` (+50 se acerta 5 em <60s)             |
| `transferTrivia` | 290    | soma dos scores positivos + 15                                       |

- **Daily XP cap global**: `5000 XP/dia` (`DAILY_XP_CAP`). Excedente é cortado e o backend retorna `xpCapped: true`.
- **Debounce**: cada par `(userId, gameId)` só pode submeter resultado a cada 2s (HTTP 429).
- **Achievements**: 16 conquistas em `data/config.ts`. Recomputadas a cada submissão; novas conquistas concedem XP extra (também respeitando o daily cap).
- **Streak diário**: `dailyStreak` incrementa se o último jogo foi ontem; reseta caso contrário.
- **Níveis**: tabela de thresholds em `usersController.ts:31` (mesma tabela espelhada no frontend para previsão visual). Após o nível 40, +25.000 XP por nível.
- **Ranks por nível** (`rankForLevel`): Silver → Gold Nova → Master Guardian → Distinguished MG → Legendary Eagle (Master) → Supreme → Global Elite.

---

## Modelo de dados (MongoDB)

### Coleções e índices

| Coleção          | Índices únicos                              | Propósito                       |
| ---------------- | ------------------------------------------- | ------------------------------- |
| `users`          | `email`, `username`                         | Auth + perfil + gamestats       |
| `teams`          | `name`                                      | Cards de times (lista enxuta)   |
| `teamProfiles`   | `id`                                        | Perfis completos de time        |
| `teamRosters`    | `teamName`                                  | Lineup atual                    |
| `topPlayers`     | `id` (+ index `rank`)                       | Tabela curta para home/listas   |
| `playerProfiles` | `id` (+ index `rank`)                       | Perfis completos de jogador     |
| `matches`        | `id` (+ composto `status, id`)              | Partidas manuais                |
| `ranking`        | `rank`                                      | Ranking mundial                 |
| `events`         | `id`                                        | Torneios                        |
| `news`           | `id`                                        | Artigos                         |
| `gameMaps`       | `slug`                                      | Mapas (Mirage, Inferno, ...)    |
| `academyGuides`  | `id`                                        | Guias                           |
| `highlights`     | `id`                                        | Catálogo de highlights          |
| `roundHighlight` | `key` (`"current"`)                         | Highlight em destaque           |
| `streams`        | `id`                                        | Streams                         |
| `galleries`      | `id`                                        | Galerias                        |
| `forumThreads`   | `pinned, lastActivityAt` (não único)        | Threads do fórum                |
| `forumReplies`   | `threadId, createdAt`                       | Respostas                       |
| `comments`       | `targetType, targetId, createdAt`           | News e match comments           |

### Geração derivada (sem persistência)

- **Chaveamento simulado**: `lib/tournament.ts` gera partidas `live`/`upcoming`/`finished` para cada `event.progress > 0` quando há menos de 5 partidas manuais cadastradas. IDs partem de `20000 + event.id*1000` para não colidir.
- **Map callout quizzes**: derivados de `gameMaps.callouts` em `db/maps.ts:buildMapCalloutQuizzesFromDb`.
- **Fantasy players**: top-8 de `topPlayers` enriquecido com `fantasyPoints/price/owned` em `db/players.ts`.
- **Betting odds**: derivado de `matches` upcoming × `bookmakers` em `db/matches.ts:getBettingOddsFromDb`.
- **Player of the week**: meta em `data/config.ts` + lookup do player real por id.

---

## Segurança

Esforços já aplicados (commit `9e89701` / observados no código):

- **Cookies**: `HttpOnly` sempre; `SameSite=None; Secure` em cross-site HTTPS, `SameSite=Lax` em dev HTTP (decidido por request).
- **CORS** com allowlist (não `*`): origens explícitas em `FRONTEND_ORIGIN` + previews `*.vercel.app` derivados, com credentials habilitadas.
- **Validação** de IDs com `ObjectId.isValid` + regex (`TARGET_ID_RE`, `USERNAME_RE`, `EMAIL_RE`).
- **Bcrypt** para senhas (rounds = 10).
- **JWT** com `JWT_SECRET` obrigatório (não usa default).
- **Authorization checks** em mutations (`getAuthedUser`/`unauthorized`).
- **Rate limit básico** por debounce em submissão de minigames (2s).
- **Sem bulk delete arbitrário** nas rotas (apenas operações pontuais validadas).

Pontos de atenção:

- `backend/.env` está em `.gitignore` mas **mesmo assim contém credenciais reais** localmente — não comitar.
- Não há rate limit global (apenas debounce nos games). Considere reverse proxy / WAF em produção.
- Body JSON está limitado a 100kb via `express.json`. Ajuste em `routes/index.ts` se algum endpoint precisar de mais.

---

## Scripts disponíveis

Na raiz:

```bash
npm run setup            # instala deps de backend + frontend
npm run dev              # alias de frontend:dev
npm run build            # alias de frontend:build
npm run start            # alias de frontend:start
npm run lint             # eslint no frontend

npm run frontend:dev
npm run frontend:build
npm run frontend:start

npm run backend:dev
npm run backend:build
npm run backend:start
```

---

## Convenções de UI

(Padrões observados no código — úteis ao adicionar novas telas.)

- Cards: `rounded-xl border border-border bg-bg-card` + `card-glow` para hover.
- Cores semânticas via tokens Tailwind: `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-blue-light`, `text-green`, `text-red`, `text-yellow`, `text-orange`.
- Animações utilitárias em `globals.css`: `animate-fade-in-up`, `animate-slide-in`, `animate-scale-in`, `animate-pulse-dot`, `animate-live-glow`, `animate-marquee`, `delay-1`...`delay-5`.
- Container central: `.site-page-frame` (1480px). Em `<640px` o frame perde a borda/box-shadow.
- Fontes: `--font-roboto` (sans) e `--font-display` (Passion One para títulos).
- Tabelas/listas com scroll horizontal usam `.table-scroll` + `.scroll-fade-x` / `.scroll-fade-right`.
