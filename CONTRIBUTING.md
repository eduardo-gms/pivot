# Contribuindo para o Pivot

Obrigado pelo interesse em contribuir! Este guia explica como configurar o ambiente local, as convenções do projeto e o fluxo de trabalho para Pull Requests.

## Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para rodar com containers)
- [Node.js 20+](https://nodejs.org/) (para desenvolvimento local sem Docker)
- Git

## Setup Local

### Com Docker (recomendado)

```bash
git clone https://github.com/eduardo-gms/pivot.git
cd pivot
cp .env.example .env
cp backend/.env.example backend/.env
docker-compose up --build
```

O `backend` estará em `http://localhost:3000/api` e o `frontend` em `http://localhost`.

### Sem Docker

```bash
# Backend
cd backend
cp .env.example .env   # Preencha DATABASE_URL e DIRECT_URL
npm install
npx prisma migrate dev
npm run seed
npm run start:dev

# Frontend (outra janela)
cd frontend
npm install
npm run dev
```

## Convenções de Código

- **Idioma do código:** Inglês (variáveis, comentários, nomes de função).
- **Idioma da UI:** Controlado pelo i18next — todas as strings visíveis ao usuário devem estar em `i18n.ts` com chaves em ambos os idiomas (EN e PT-BR).
- **Glossário:** Consulte o [GLOSSARY.md](./GLOSSARY.md) para a linguagem ubíqua do domínio.
- **Prefixos booleanos:** `is`, `has`, `can`, `should` (ex: `isPublished`, `hasTranslations`).
- **Linting:** `npm run lint` no frontend e backend.

## Branches

Modelo **trunk-based**: sem branch `develop`, PRs obrigatórios em `main` com CI verde.

| Tipo | Padrão | Base | Merge para | Exemplo |
|:---|:---|:---|:---|:---|
| Feature | `feature/<descrição>` | `main` | `main` via PR | `feature/add-binary-search` |
| Bug fix | `fix/<descrição>` | `main` | `main` via PR | `fix/bubble-sort-i18n` |
| Hotfix | `hotfix/<descrição>` | `main` | `main` via PR (expedited) | `hotfix/fix-health-probe` |
| Documentação | `docs/<descrição>` | `main` | `main` via PR | `docs/update-readme` |
| Testes | `test/<descrição>` | `main` | `main` via PR | `test/add-queue-tests` |

> **Branch protection**: `main` é protegida com `enforce_admins: true` — push direto é rejeitado mesmo para o owner. CI deve passar antes do merge.

## Database Migrations

A partir da migration inicial (`20260610011740_init`), toda alteração no schema Prisma deve gerar uma migration incremental:

```bash
cd backend
npx prisma migrate dev --name <descricao-curta>
# Exemplo: npx prisma migrate dev --name add-user-table
```

**Regras:**
- Nunca editar migrations já aplicadas em produção
- Rodar `npx prisma migrate deploy` no CI (já configurado no CD workflow)
- Commitar a migration gerada junto com a alteração do `schema.prisma`

## Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add preset scenarios for non-array engines
fix: correct descriptionVariables in bubbleSort
docs: update C4 model locale references
test: add unit tests for simulation store
chore: update dependencies
```

## Pull Requests

1. Crie uma branch a partir de `main`.
2. Faça seus commits seguindo as convenções acima.
3. Garanta que os testes passam:
   ```bash
   cd frontend && npm test
   cd backend && npm test
   ```
4. Abra o PR com:
   - **Descrição** do que mudou e por quê.
   - **Como testar** — passos para validar a mudança.
   - **Screenshots/GIF** se envolver mudança visual.

## Testes

```bash
# Frontend (Vitest)
cd frontend && npm test

# Backend (Jest)
cd backend && npm test

# E2E (Backend)
cd backend && npm run test:e2e
```

### Padrão de testes para engines

Cada engine de algoritmo deve ter um arquivo `.test.ts` que verifica:
1. Geração de steps para input padrão → `steps.length > 0`
2. Step inicial → `descriptionKey` correto (`*_initial`)
3. Step final → `descriptionKey` de conclusão (`*_done` / `*_final`)
4. Resultado final → dados ordenados ou estado esperado
5. IDs únicos → `new Set(ids).size === ids.length`
6. Isolamento de stepCounter → duas chamadas geram mesmos IDs
