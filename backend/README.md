# Backend

API Express 5 + MongoDB que serve o frontend Next.js do WikiHowl.

## Stack

- **Express 5** + `cors` middleware
- **MongoDB** (driver oficial `mongodb` 7.x)
- **bcryptjs** (hash de senha) + **jsonwebtoken** (sessão por cookie)
- TypeScript 5.9 (ESM `NodeNext`), `tsx` em dev

## Estrutura

- `src/server.ts`: bootstrap — aguarda `getDb()` e chama `app.listen(PORT)`
- `src/routes/index.ts`: `createApp()` monta `cors`, `express.json({ limit: "100kb" })` e registra todas as rotas
- `src/controllers/`: handlers Express por domínio (players, teams, matches, content, forums, comments, users, search, platform)
- `src/db/`: acesso ao MongoDB — `*Collection()` e `*FromDb()` por domínio + `ensure*Indexes` no boot
- `src/http/`:
  - `response.ts` — helpers `json/notFound/badRequest/unauthorized/conflict`
  - `cookies.ts` — sessão `hltv_session` (`HttpOnly`, `SameSite=None|Lax` decidido em runtime)
- `src/lib/`:
  - `auth.ts` — `bcrypt` + `jsonwebtoken` (sign/verify)
  - `session.ts` — `getAuthedUser(req)`, `rankForLevel`, `relativeTime`
  - `scoring.ts` — validação e cálculo de XP dos minigames
  - `tournament.ts` — chaveamento simulado a partir dos `events`
- `src/data/`: `config.ts` (navigation, games, achievements, daily challenges, bookmakers) e `types.ts` (contratos de domínio)

> Não há `mock.ts` — coleções precisam ser populadas no MongoDB (apenas índices são garantidos no boot).

## Endpoints (resumo)

Health/meta: `/health`, `/navigation`, `/search?q=`, `/auth/diag`
Auth: `POST /auth/{register,login,logout}`, `GET /users/me`, `PATCH /users/me/profile`, `POST /users/me/games/:gameId/result`
Plataforma: `/achievements`, `/daily-challenges`, `/games`, `/fantasy/{leaderboard,players}`, `/betting/{bookmakers,odds}`
Competitivo: `/players[...]`, `/teams[...]`, `/rankings`, `/matches[...]`, `/news[...]`, `/events[...]`, `/maps[...]`, `/academy[...]`, `/highlights[...]`, `/streams`, `/galleries`
Comunidade: `/forums[...]` + replies/likes, `/comments/:id/like`, comments em `/news/:id/comments` e `/matches/:id/comments`

Lista completa e payloads no README da raiz.

## Variáveis de ambiente

Mínimo: `MONGODB_URI` e `JWT_SECRET`. Opcionais: `MONGODB_DB` (`hltv`), `JWT_EXPIRES_IN` (`7d`), `PORT` (`4000`), `FRONTEND_ORIGIN` (CSV — default cobre `localhost:3000` + `htlv-rework.vercel.app` e previews), `COOKIE_SECURE` (`true`/`false` para forçar o modo do cookie).

## Rodar

```bash
npm install
npm run dev          # tsx --env-file=.env src/server.ts
```

Build/produção:

```bash
npm run build        # tsc -p tsconfig.json → dist/
npm run start        # node --env-file-if-exists=.env dist/server.js
```

## Notas

- Tipos `@types/express` e `@types/cors` ficam em `dependencies` (não em devDependencies) — ambiente de build no Render só instala `dependencies`.
- Ordem de registro de rotas em `createApp()` importa: específicas (`/players/top`, `/teams/cards`, `/matches/live`, …) **antes** de `/<resource>/:id`.
- Erro de conexão com Mongo no boot derruba o processo (`process.exit(1)`).
