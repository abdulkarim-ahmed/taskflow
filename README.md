# taskflow

A tiny in-memory task-tracking API — create tasks, complete them, list what's
open. Deliberately small so the interesting parts live in the pull requests.

```bash
npm install
npm run dev      # http://localhost:3000
npm test
```

## API

| Method | Route                    | Body                     |
|--------|--------------------------|--------------------------|
| GET    | `/tasks`                 | —                        |
| POST   | `/tasks`                 | `{ title, dueAt? }`      |
| POST   | `/tasks/:id/complete`    | —                        |

## Layout

- `src/types.ts` — the `Task` shape
- `src/store.ts` — the in-memory store
- `src/tasks.ts` — domain logic (create / complete / list)
- `src/server.ts` — the HTTP layer
