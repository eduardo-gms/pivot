# Documentação de Arquitetura: Pivot (C4 Model)

Este documento descreve a arquitetura de software da plataforma **Pivot** utilizando a abordagem **C4 Model** (Contexto, Containers e Componentes). 

A arquitetura foi desenhada visando **custo zero** de infraestrutura inicial, utilizando **containerização** para portabilidade (Azure for Students como provedor principal e Render como plano B), além da simplificação de escopo (MVP sem login).

---

## 1. Nível 1: Diagrama de Contexto

O diagrama de contexto descreve a plataforma Pivot em sua visão mais macro, detalhando quem interage com o sistema e quais integrações externas existem.

Neste MVP, as integrações externas em tempo de execução são mantidas ao mínimo para evitar custos. A geração automatizada de conteúdo baseada em IA (via LLM) ocorre de forma **offline** por meio de um script/pipeline, apenas populando o banco de dados.

```mermaid
C4Context
    title Diagrama de Contexto (Nível 1) - Pivot

    Person(student, "Estudante / Desenvolvedor", "Usuário que busca aprender ou revisar estruturas de dados e algoritmos, visualizar passo a passo e ler artigos técnicos.")
    
    System(pivot, "Plataforma Pivot", "Plataforma interativa de ensino visual e blog técnico multilíngue focado em algoritmos (Open Source).")
    
    System_Ext(offline_ai, "Pipeline de Dados Offline (LLM)", "Script isolado usando LLM (IA generativa) para gerar conteúdo teórico que alimentará a plataforma.")

    Rel(student, pivot, "Interage com o motor visual e lê artigos técnicos", "Navegador Web")
    Rel(offline_ai, pivot, "Alimenta a base de dados com teorias e artigos gerados (Prisma Seeds)", "Offline / CI")
```

---

## 2. Nível 2: Diagrama de Containers

O diagrama de containers "abre a caixa" do sistema Pivot, mostrando os aplicativos executáveis e serviços de armazenamento de dados. O ecossistema é fortemente baseado em **Docker** para garantir flexibilidade de hospedagem (Azure, Render, etc.).

As imagens utilizadas nos artigos não são persistidas na nuvem do projeto, utilizando **100% de URLs externas** para minimizar custos de Storage.

```mermaid
C4Container
    title Diagrama de Container (Nível 2) - Pivot

    Person(student, "Estudante / Dev", "Usuário do sistema.")

    System_Boundary(pivot, "Plataforma Pivot") {
        Container(spa, "Frontend (SPA)", "React, Zustand, D3.js", "Fornece a interface web completa: o Motor Visual interativo e o leitor do Blog. Executado como Container.")
        
        Container(api, "Backend API", "NestJS, Node.js", "Gerencia o fornecimento dos conteúdos (artigos, metadados) via REST API, filtrando idiomas. Executado como Container.")
        
        ContainerDb(db, "Banco de Dados Relacional", "PostgreSQL (Neon)", "Armazena estruturalmente os artigos do blog, suporte i18n, e metadados dos algoritmos suportados. Plano Free Serverless.")
    }

    System_Ext(seed_pipeline, "Script / CI Pipeline", "Node.js / Prisma Seed", "Executa as Prisma Seeds em tempo de build/deploy para popular o banco Neon com os textos gerados por LLM.")

    Rel(student, spa, "Navega pela plataforma", "HTTPS")
    Rel(spa, api, "Requisita artigos e configurações", "JSON / HTTPS")
    Rel(api, db, "Realiza leitura de dados", "Prisma ORM / TCP")
    Rel(seed_pipeline, db, "Insere conteúdo pré-gerado", "Prisma Client")
```

---

## 3. Nível 3: Diagrama de Componentes

Este nível aprofunda o detalhamento interno dos containers de Frontend (React) e Backend (NestJS). 

Como não há sistema de login no MVP, os blocos lógicos são focados na entrega eficiente do conteúdo de leitura (Motor de Blog) e no gerenciamento das animações e estados (Motor de Simulação).

### 3.1 Componentes do Frontend (React SPA)

O Frontend é dividido em dois grandes blocos lógicos principais.

```mermaid
C4Component
    title Diagrama de Componentes (Nível 3) - Frontend (SPA)

    Container_Boundary(spa, "Frontend (React SPA)") {
        Component(router, "Application Router", "React Router DOM", "Gerencia as rotas (/, /algorithms, /blog/:id).")
        
        Container_Boundary(sim, "Motor de Simulação Visual") {
            Component(zustand, "Simulation Store", "Zustand", "Gerenciamento de estado global focado no motor de execução. Controla a fila de animação, o estado atual (Play/Pause) e o step do algoritmo.")
            Component(renderer, "Visual Renderer", "D3.js / Canvas API", "Motor de renderização de alto desempenho que reage aos estados do Zustand para desenhar as formas geométricas na tela.")
            Component(controls, "Player UI", "React Components", "Interface que permite ao usuário interagir (botões Next, Prev, Pause, Play, Range de Velocidade).")
        }

        Container_Boundary(blog, "Motor de Leitura e Blog") {
            Component(blog_ui, "Article Engine", "React Components", "Renderiza o texto rico (Markdown/HTML), tabelas de Big-O e exibe imagens (via URLs externas).")
            Component(i18n, "Localization Service", "i18next", "Controla o idioma atual (PT-BR, EN) e orquestra quais dados pedir para a API. A arquitetura suporta adição de idiomas futuros via novas entradas nas tabelas de tradução.")
        }
        
        Component(api_client, "HTTP Client", "Axios ou Fetch", "Camada de abstração para consumir os dados da API REST do NestJS.")
    }

    Rel(router, controls, "Inicializa visualização")
    Rel(router, blog_ui, "Inicializa leitura")
    
    Rel(controls, zustand, "Despacha ações (ex: play, pause, next)")
    Rel(zustand, renderer, "O estado é consumido para gerar novas coordenadas")
    
    Rel(blog_ui, api_client, "Demanda artigos e tutoriais")
    Rel(api_client, i18n, "Injeta idioma atual nos parâmetros da requisição")
```

### 3.2 Componentes do Backend (NestJS)

A arquitetura do NestJS foi projetada inicialmente com os módulos mínimos necessários para fornecer as informações aos motores do Frontend.

```mermaid
C4Component
    title Diagrama de Componentes (Nível 3) - Backend API

    Container_Boundary(api, "Backend API (NestJS)") {
        
        Container_Boundary(article_module, "Articles Module") {
            Component(article_ctrl, "Articles Controller", "Nest Controller", "Endpoints RESTful: GET /api/articles, GET /api/articles/:slug.")
            Component(article_svc, "Articles Service", "Nest Service", "Regra de negócio: filtragem por idioma e suporte a paginação dos textos do blog.")
        }

        Container_Boundary(algo_module, "Algorithms Module") {
            Component(algo_ctrl, "Algorithms Controller", "Nest Controller", "Endpoints RESTful: GET /api/algorithms.")
            Component(algo_svc, "Algorithms Service", "Nest Service", "Fornece os metadados (Big-O, categorias) dos algoritmos suportados no motor visual.")
        }

        Component(prisma_module, "Database Module", "Prisma Service", "Abstração de acesso aos dados para evitar acoplamento direto com SQL. Utilizado por todos os services.")
    }

    Rel(article_ctrl, article_svc, "Delega buscas e regras de paginação")
    Rel(algo_ctrl, algo_svc, "Delega buscas de metadados")
    Rel(article_svc, prisma_module, "Busca artigos do banco (filtrando por locale)")
    Rel(algo_svc, prisma_module, "Busca lista de algoritmos do banco")
```

---

*Nota: Todas as decisões refletidas aqui seguem o princípio de manter o sistema agnóstico (totalmente dockerizado) e dentro da premissa de custo base zero para a v1.0.*
