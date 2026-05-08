# Backend

Backend Node simples para centralizar os dados e servir a API.

## Estrutura

- `src/server.ts`: inicializacao HTTP e CORS
- `src/http/`: router e helpers de resposta
- `src/routes/`: registro das rotas
- `src/controllers/`: regras basicas por dominio
- `src/data/mock.ts`: fonte temporaria dos dados

## Endpoints

- `GET /health`
- `GET /players`
- `GET /players/top`
- `GET /players/of-the-week`
- `GET /players/:id`
- `GET /teams`
- `GET /teams/cards`
- `GET /teams/rosters`
- `GET /teams/:id`
- `GET /rankings`
- `GET /matches`
- `GET /matches/live`
- `GET /matches/upcoming`
- `GET /matches/results`
- `GET /matches/:id`
- `GET /news`
- `GET /news/:id`
- `GET /events`
- `GET /events/:id`
- `GET /forums`
- `GET /forums/:id`
- `GET /forums/:id/replies`
- `GET /maps`
- `GET /maps/:slug`
- `GET /map-callout-quizzes`
- `GET /academy`
- `GET /academy/:id`
- `GET /highlights`
- `GET /highlights/round`
- `GET /streams`
- `GET /galleries`

## Rodar

```bash
npm install
npm run dev
```

Para rodar a versao compilada:

```bash
npm run build
npm run start
```
