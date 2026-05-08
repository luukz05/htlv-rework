# HLTV Rework

Projeto reorganizado em um monorepo simples, com frontend e backend em pastas separadas.

## Estrutura

- `frontend/`: aplicacao Next.js com o visual atual, assets, logo e favicon.
- `backend/`: dados centralizados dos jogadores e API inicial para evoluir depois.

Os dados ficam centralizados no backend em `backend/src/data/mock.ts`. O backend ja tem uma API Node basica com `routes`, `controllers` e helpers HTTP. O frontend ainda mantem a ponte `frontend/src/data/mock.ts` para preservar as telas atuais, e tambem ganhou `frontend/src/services/api.ts` para migrarmos as paginas aos poucos para chamadas HTTP.

## Instalar dependencias

Forma mais simples:

```bash
npm run setup
```

Se preferir, ainda pode instalar por parte:

```bash
npm --prefix backend install
npm --prefix frontend install
```

## Rodar em desenvolvimento

Frontend:

```bash
npm run dev
```

Alias equivalente:

```bash
npm run frontend:dev
```

Backend:

```bash
npm run backend:dev
```

Por padrao:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## Build e start

Gerar build do frontend:

```bash
npm run build
```

Alias equivalente:

```bash
npm run frontend:build
```

Esse comando tambem compila o backend antes, porque o frontend consome os dados compilados do pacote local.

Rodar frontend exportado:

```bash
npm run start
```

Alias equivalente:

```bash
npm run frontend:start
```

Rodar backend compilado:

```bash
npm run backend:build
npm run backend:start
```

Observacao: o frontend usa `output: "export"` no Next, entao `next start` nao deve ser usado. O start correto serve a pasta `frontend/out` com `serve`.

## API inicial

Endpoints disponiveis no backend:

```txt
GET /health
GET /players
GET /players/top
GET /players/of-the-week
GET /players/:id
GET /teams
GET /teams/cards
GET /teams/rosters
GET /teams/:id
GET /rankings
GET /matches
GET /matches/live
GET /matches/upcoming
GET /matches/results
GET /matches/:id
GET /news
GET /news/:id
GET /events
GET /events/:id
GET /forums
GET /forums/:id
GET /forums/:id/replies
GET /maps
GET /maps/:slug
GET /map-callout-quizzes
GET /academy
GET /academy/:id
GET /highlights
GET /highlights/round
GET /streams
GET /galleries
```

Exemplos:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/players
curl http://localhost:4000/players/1
curl http://localhost:4000/players/top
curl http://localhost:4000/matches/live
curl http://localhost:4000/news/1
```

## Scripts da raiz

```bash
npm run setup
npm run dev
npm run build
npm run start
npm run lint

npm run frontend:dev
npm run frontend:build
npm run frontend:start

npm run backend:dev
npm run backend:build
npm run backend:start
```
