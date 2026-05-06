# HLTV Rework

Projeto reorganizado em um monorepo simples, com frontend e backend em pastas separadas.

## Estrutura

- `frontend/`: aplicacao Next.js com o visual atual, assets, logo e favicon.
- `backend/`: dados centralizados dos jogadores e API inicial para evoluir depois.

Os dados que o frontend usa ficam no backend em `backend/src/data/mock.ts`. O frontend importa esses dados pelo pacote local `hltv-backend`, configurado como `file:../backend`.

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
GET /players/:id
GET /players/top
```

Exemplos:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/players
curl http://localhost:4000/players/1
curl http://localhost:4000/players/top
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
