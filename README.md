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
- **Internacionalização (i18n):** Suporte nativo para Português (BR), Inglês, Hindi e Mandarim.

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
- Passport.js (Fundação de Segurança e Autenticação)
- PostgreSQL (Neon ou Supabase)

## 🏗️ Como Contribuir
*(Instruções de setup do ambiente de desenvolvimento e arquitetura do monorepo serão adicionadas assim que a infraestrutura base for configurada).*

## 📄 Licença
Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
