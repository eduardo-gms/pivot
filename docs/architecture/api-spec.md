# Especificação de API (Backend NestJS)

Este documento detalha os contratos (endpoints) da REST API que será construída no **NestJS**. O principal objetivo dessa API no MVP é servir conteúdo de leitura (Blog) e metadados estruturais (Categorias e Algoritmos) para consumo no Frontend (React).

---

## 1. Padrão de Internacionalização (i18n)

A arquitetura do banco de dados separa traduções em tabelas secundárias. Para que o Frontend não precise lidar com essa complexidade, a API fará o *flattening* (achatamento) dos dados na resposta.

O idioma da resposta será definido através da Query String `?lang`.
- **Exemplo:** `GET /api/algorithms?lang=pt-BR`
- **Fallback:** Se o parâmetro não for enviado (ou se a tradução para aquele idioma não existir no banco), a API usará o idioma padrão, que será o Inglês (`en`).

---

## 2. Endpoints: Algoritmos e Estruturas

Rotas destinadas a alimentar os menus do simulador e as páginas de detalhes dos algoritmos.

### `GET /api/categories`
Retorna a lista de categorias disponíveis no motor (ex: "Sorting", "Trees").
- **Query Params:** `?lang=en`
- **Exemplo de Resposta (200 OK):**
```json
[
  {
    "id": "uuid-1",
    "slug": "sorting",
    "name": "Algoritmos de Ordenação", // Campo que veio da tabela CategoryTranslation
    "description": "Algoritmos focados em organizar coleções de dados..."
  }
]
```

### `GET /api/algorithms`
Retorna a lista de todos os algoritmos, ou os filtra por categoria.
- **Query Params:** `?lang=en`, `?categoryId=uuid` (opcional)
- **Exemplo de Resposta (200 OK):**
```json
[
  {
    "id": "uuid-2",
    "slug": "bubble-sort",
    "categoryId": "uuid-1",
    "name": "Bubble Sort", // Veio da tabela de tradução
    "shortDescription": "Um algoritmo simples de ordenação...",
    "timeComplexity": "O(n^2)", // Dado universal
    "spaceComplexity": "O(1)"   // Dado universal
  }
]
```

### `GET /api/algorithms/:slug`
Retorna os detalhes precisos de um algoritmo específico (usado na página antes de dar play na simulação).

---

## 3. Endpoints: Blog e Artigos

Rotas destinadas a alimentar a área de leitura e tutoriais da plataforma.

### `GET /api/articles`
Lista artigos técnicos de forma paginada para a homepage do blog.
- **Query Params:**
  - `?lang=pt-BR` (Idioma)
  - `?page=1` (Paginação: default 1)
  - `?limit=10` (Limite por página: default 10)
  - `?algorithmId=uuid` (Opcional. Para listar artigos associados a uma estrutura específica).
- **Exemplo de Resposta (200 OK):**
```json
{
  "meta": {
    "total": 45,
    "page": 1,
    "lastPage": 5
  },
  "data": [
    {
      "id": "uuid-3",
      "slug": "entendendo-o-bubble-sort",
      "algorithmId": "uuid-2",
      "createdAt": "2026-06-05T10:00:00Z",
      "title": "Entendendo o Bubble Sort passo a passo", // Tabela Translation
      "seoDescription": "Um guia completo sobre complexidade..." // Tabela Translation
    }
  ]
}
```

### `GET /api/articles/:slug`
Busca o conteúdo completo de um artigo para renderização na tela de leitura.
- **Query Params:** `?lang=pt-BR`
- **Exemplo de Resposta (200 OK):**
```json
{
  "id": "uuid-3",
  "slug": "entendendo-o-bubble-sort",
  "algorithmId": "uuid-2",
  "createdAt": "2026-06-05T10:00:00Z",
  "title": "Entendendo o Bubble Sort passo a passo",
  "content": "# O que é o Bubble Sort?\n\nO Bubble sort é...", // Conteúdo em Markdown gerado pela LLM
  "seoDescription": "Um guia completo sobre complexidade..."
}
```

---

## 4. Design Patterns no NestJS

Para implementar esta API mantendo o código limpo e de fácil manutenção, a aplicação Node.js usará a seguinte stack dentro do NestJS:
- **DTOs (Data Transfer Objects):** Para validar as Query Strings (ex: verificar se `page` é numérico via `class-validator`).
- **Prisma Services:** Os serviços injetarão o `PrismaClient` e usarão o recurso `include` do Prisma para fazer o JOIN transparente com as tabelas de `Translation`, filtrando pelo *locale* requisitado na rota.
- **Swagger:** O pacote `@nestjs/swagger` deverá ser utilizado para expor uma interface interativa (geralmente em `/api/docs`) listando todos os *schemas* e permitindo testes manuais.
