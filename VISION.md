# Documento de Visão: Plataforma Educacional de Algoritmos e Estruturas de Dados

**Versão:** 1.0
**Licença:** MIT
**Status:** MVP em Desenvolvimento

---

## 1. O Problema
O aprendizado de Estruturas de Dados e Algoritmos costuma ser excessivamente abstrato e focado em saídas estáticas de terminal. Estudantes de Ciência da Computação e desenvolvedores em preparação para entrevistas técnicas sentem dificuldade em visualizar o comportamento interno da memória, a manipulação de ponteiros e as transições de estado (como o balanceamento de uma Árvore AVL), tornando a curva de aprendizado frustrante.

## 2. A Solução (O Produto)
Uma aplicação web interativa (Open Source) que atua simultaneamente como **simulador visual** e **blog técnico**. A plataforma permite a execução de operações em estruturas de dados passo a passo em um canvas visual, acompanhada de artigos teóricos. A arquitetura é modular, prevendo a futura escalabilidade para um juiz online de programação.

## 3. Perfis de Usuário (Personas)
- **Universitário de TI:** Busca entender o funcionamento passo a passo das estruturas clássicas para aprovação em disciplinas curriculares.
- **Desenvolvedor Profissional:** Busca revisar rapidamente a teoria, complexidades assintóticas (Big-O) e o comportamento dos algoritmos para testes de nivelamento em processos seletivos.

## 4. Escopo do MVP (Versão 1.0)
- **Motor Visual (Desktop/Tablet):** Renderizador gráfico com controle de tempo (play, pause, next, prev). *Restrição:* O simulador interativo será bloqueado em smartphones para garantir a integridade da visualização. Acesso mobile restrito à leitura teórica.
- **Estruturas Lineares:** Listas (Simples e Duplamente Encadeadas), Pilha, Fila e Fila de Prioridade.
- **Ordenação (Sorting):** Bubble, Selection, Insertion, Quick e Merge Sort.
- **Árvore de Prova de Conceito:** Árvore AVL (foco em visualização de rotações).
- **Blog Teórico Multilíngue (i18n):** Suporte arquitetural para PT-BR, EN, HI e ZH.
- **Acessibilidade (a11y):** Uso simultâneo de cores e formas geométricas (ex: bordas tracejadas vs. sólidas) para indicar mudanças de estado, garantindo suporte para usuários com daltonismo.

## 5. Abordagem de Dados e Licenciamento
- **Origem do Conteúdo:** Geração automatizada dos artigos e teorias via Inteligência Artificial, populados no PostgreSQL através de rotinas de `Prisma Seeds` durante a esteira de CI/CD.
- **Licenciamento:** Código aberto sob a **Licença MIT**, publicado em repositório público (GitHub).

## 6. Fora do Escopo Atual (Versões 2.0 e 3.0)
- **v2.0:** Grafos Complexos (Dijkstra, Kruskal, Bellman-Ford, DFS, BFS) e Árvores Avançadas (Red-Black, Árvore B).
- **v3.0:** Módulo de Juiz Online (submissão de código), contas de usuário corporativas (Google AD/Workspace) e monetização via Google AdSense com domínio próprio.

## 7. Stack Tecnológica
- **Frontend:** React, Zustand (Estado do Simulador), D3.js / Canvas API (Renderização), i18next (Tradução). *Hospedagem: Vercel.*
- **Backend:** Node.js, NestJS, Passport.js (preparo de Auth), Prisma ORM. *Hospedagem: Render/Railway.*
- **Banco de Dados:** PostgreSQL Serverless. *Provedor: Neon ou Supabase.*