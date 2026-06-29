# Pivot: Plataforma Educacional de Algoritmos e Estruturas de Dados

[![CI/CD Pipeline](https://github.com/eduardo-gms/pivot/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/eduardo-gms/pivot/actions/workflows/ci-cd.yml)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-MVP_em_Desenvolvimento-blue)

> **Simulador visual interativo** para Estruturas de Dados e Algoritmos + **blog técnico** com suporte multilíngue. Projetado para universitários e desenvolvedores se preparando para entrevistas técnicas.

<!-- TODO: Adicionar GIF/screenshot do app rodando aqui -->
<!-- ![Demo](./docs/assets/demo.gif) -->

---

## 🎯 Escopo do MVP (Versão 1.0)
Nesta primeira fase, o Pivot foca em fornecer uma experiência visual robusta e acessível:
- **Motor Visual Interativo:** Controle de tempo (play, pause, next, prev) para algoritmos. (Restrito a Desktop/Tablet para garantir integridade do Canvas).
- **Estruturas Lineares:** Pilhas, Filas, Fila de Prioridade e Listas (Simples e Duplamente Encadeadas).
- **Ordenação (Sorting):** Bubble, Selection, Insertion, Merge e Quick Sort.
- **Árvores:** Árvore AVL (com foco visual nas rotações e fator de balanceamento).
- **Acessibilidade (a11y):** Uso de padrões geométricos para garantir compreensão da interface por usuários com daltonismo.
- **Internacionalização (i18n):** Suporte nativo para Português (BR) e Inglês.
- **Dívida Técnica Conhecida:** Atualmente, apenas o algoritmo `bubble-sort` possui um artigo associado no banco de dados. Os endpoints de artigos para os outros algoritmos retornarão erro 404. Isso é esperado para a fase atual do MVP.

## 📚 Documentação do Projeto
A fundação de requisitos e a linguagem do domínio estão rigorosamente documentadas. Para entender o projeto a fundo, leia os arquivos abaixo:
- 📖 [Visão do Produto (VISION.md)](./VISION.md): Entenda o problema, a solução, as personas e os módulos futuros (Juiz Online).
- 📖 [Glossário Técnico (GLOSSARY.md)](./GLOSSARY.md): Mapeamento da *Linguagem Ubíqua* adotada pelo time. Essencial para entender os termos utilizados nas *Issues* e na nomeação de variáveis do código fonte.
- 🏗️ [Arquitetura C4 (c4-model.md)](./docs/architecture/c4-model.md): Diagramas de contexto, container e componentes.
- 🗄️ [Modelo de Dados (database.md)](./docs/architecture/database.md): Esquema do banco, relações e estratégia de i18n.

## 🛠️ Stack Tecnológica

| Camada | Tecnologias |
|:---|:---|
| **Frontend** | React · Zustand · D3.js · i18next · React Router · Vite |
| **Backend** | Node.js · NestJS · Prisma ORM · Swagger |
| **Banco** | PostgreSQL (Neon serverless) |
| **CI/CD** | GitHub Actions · Docker · Azure Container Apps |
| **Testes** | Vitest (frontend) · Jest (backend) |

## 🏗️ Como Rodar Localmente

### Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- Node.js 20+ (para desenvolvimento sem Docker)

### Com Docker (recomendado)
```bash
# Clone o repositório
git clone https://github.com/eduardo-gms/pivot.git
cd pivot

# (Opcional) Copie e ajuste variáveis de ambiente
cp .env.example .env
cp backend/.env.example backend/.env

# Suba todos os serviços
docker-compose up --build
```

O banco de dados (`db`), o `backend` (porta 3000) e o `frontend` (porta 80) estarão rodando. O comando já executa `prisma migrate deploy` e `prisma db seed` automaticamente.

### Sem Docker (desenvolvimento)
```bash
# Backend
cd backend
cp .env.example .env  # Preencha DATABASE_URL e DIRECT_URL
npm install
npx prisma migrate dev
npm run seed
npm run start:dev

# Frontend (outra janela)
cd frontend
npm install
npm run dev
```

### Testes
```bash
cd frontend && npm test   # Vitest — engines + store (56 tests)
cd backend && npm test    # Jest — services + controller (14 tests)
```

## 🚀 Runbook de Deploy & Produção

A infraestrutura atual roda na Azure Container Apps (ACA) com scale-to-zero ativado (`minReplicas: 0`) para custo zero.

**Comportamento Esperado:**
- **Cold Start:** Devido ao `scale-to-zero` e ao uso de bancos serverless (Neon), a primeira requisição após um período de inatividade pode demorar de 10 a 30 segundos, ou ocasionalmente gerar timeout. O backend demora um pouco para iniciar e conectar ao banco.
- **Seed Automático:** O Dockerfile de produção roda o `prisma migrate deploy` e `prisma db seed` durante o boot. O seed usa `upsert` em todos os registros, então é seguro rodar a cada deploy.
- **Prevenção de Hibernação:** Se a latência de cold start se tornar um problema, você pode usar serviços como UptimeRobot para realizar um ping a cada 5 minutos no endpoint `GET /api/health` do backend, mantendo a instância ativa.

## 🤝 Como Contribuir

Consulte o [CONTRIBUTING.md](./CONTRIBUTING.md) para guias de setup, convenções de código, branches e PRs.

## 📄 Licença
Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
