API Palpite Certo
=================

Rápido servidor Node/Express usando SQLite para desenvolvimento local.

Instalação
----------

```bash
npm install
```

Execução
-------

Copie e ajuste variáveis em `.env.example` para `.env` se desejar.

```bash
npm start
# ou em desenvolvimento
npm run dev
```

Endpoints
---------

- `GET /api/palpites` — lista todos
- `GET /api/palpites/:id` — obtém um por id
- `POST /api/palpites` — cria (body: `texto`, opcional `usuario`, `valor`)
- `PUT /api/palpites/:id` — atualiza
- `DELETE /api/palpites/:id` — remove

Configuração de DB
------------------

Por padrão o arquivo do DB é `./data/palpite-certo.db`. Para usar outro DB (ex: Postgres), substitua `src/db.js` por um adaptador e use `DATABASE_FILE`/outras env vars.
