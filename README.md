# Pivot: Plataforma Educacional de Algoritmos e Estruturas de Dados

![Status](https://img.shields.io/badge/Status-MVP_em_Desenvolvimento-blue)
![License](https://img.shields.io/badge/License-MIT-green)

O **Pivot** é uma aplicação web interativa (Open Source) focada em desmistificar o aprendizado de Estruturas de Dados e Algoritmos. Atuando simultaneamente como um **simulador visual** passo a passo e um **blog técnico**, a plataforma foi desenhada tanto para universitários que buscam fixar fundamentos, quanto para desenvolvedores profissionais se preparando para processos seletivos e entrevistas técnicas (foco em Big-O).

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

## 🛠️ Stack Tecnológica

**Frontend:**
- React
- Zustand (Gerenciamento de Estado do Motor de Algoritmos)
- D3.js / Canvas API (Renderização Visual)
- i18next (Tradução e Localização)

**Backend:**
- Node.js & NestJS
- Prisma ORM
- PostgreSQL (Neon ou Supabase)

## 🏗️ Como Contribuir

Para rodar o projeto localmente:

1. Clone o repositório.
2. Certifique-se de ter o [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.
3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` dentro de `backend/` para `.env` e ajuste se necessário.
4. Suba os containers de desenvolvimento:
   ```bash
   docker-compose up --build
   ```
5. O banco de dados (`db`), o `backend` (na porta 3000) e o `frontend` (na porta 80) estarão rodando. O comando já executará o `prisma db seed` automaticamente, populando os algoritmos e categorias de demonstração.

## 🚀 Runbook de Deploy & Produção

A infraestrutura atual roda na Azure Container Apps (ACA) com scale-to-zero ativado (`minReplicas: 0`) para custo zero.

**Comportamento Esperado:**
- **Cold Start:** Devido ao `scale-to-zero` e ao uso de bancos serverless (Neon), a primeira requisição após um período de inatividade pode demorar de 10 a 30 segundos, ou ocasionalmente gerar timeout. O backend demora um pouco para iniciar e conectar ao banco.
- **Seed Automático:** O Dockerfile de produção roda o `prisma migrate deploy` e `prisma db seed` durante o boot. O seed usa `upsert` em todos os registros, então é seguro rodar a cada deploy.
- **Prevenção de Hibernação:** Se a latência de cold start se tornar um problema, você pode usar serviços como UptimeRobot para realizar um ping a cada 5 minutos no endpoint `GET /api/health` do backend, mantendo a instância ativa.

## 📄 Licença
Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
