# Glossário Técnico (Léxico Ampliado) - Projeto Pivot

**Versão:** 1.0
**Status:** Ativo

Este documento estabelece a **Linguagem Ubíqua** (*Ubiquitous Language*) do projeto **Pivot**. Ele mapeia os termos utilizados na interface do usuário e define o padrão estrito de nomenclatura para o código-fonte (TypeScript/React/NestJS) e banco de dados (Prisma).

---

## 1. Dicionário de Domínio

| Termo na Interface (PT-BR) | Identificador no Código (Inglês) | Definição no Domínio do Projeto |
| :--- | :--- | :--- |
| **Nó** | `Node` | Unidade fundamental de estruturas (Listas, Árvores, Grafos). Contém um valor e referências (ponteiros) para outros nós. |
| **Aresta** | `Edge` | A conexão visual e lógica entre dois vértices/nós em um grafo ou árvore. |
| **Vértice** | `Vertex` | Termo matemático para o "Nó" quando estamos lidando estritamente com o Módulo de Grafos. |
| **Pivô** | `Pivot` | (1) Nome da plataforma. (2) Elemento de referência escolhido para particionamento no algoritmo *Quick Sort*. |
| **Troca** | `Swap` | Ação de inverter a posição de dois elementos na memória durante algoritmos de ordenação (*Bubble*, *Selection*, etc). |
| **Raiz** | `Root` | O primeiro nó absoluto no topo de uma estrutura de Árvore. |
| **Folha** | `Leaf` | Um nó de uma árvore que não possui filhos (`children = null`). |
| **Fator de Balanço** | `BalanceFactor` | Propriedade crucial da Árvore AVL. Representa a diferença matemática de altura entre a subárvore direita e esquerda. |
| **Rotação** | `Rotation` | Operação para rebalancear a Árvore AVL (classificada como `LeftRotation` ou `RightRotation`). |
| **Estado Visual** | `Snapshot` | Uma "fotografia" imutável da estrutura de dados em um milissegundo de tempo, gerada pelo motor do algoritmo para renderização na interface. |
| **Passo** | `Step` | A unidade de avanço ou retrocesso na linha do tempo do simulador visual. |
| **Fila de Prioridade** | `PriorityQueue` | Estrutura de dados linear onde os elementos são ordenados e removidos com base em um valor de peso (`weight` ou `priority`). |
| **Cabeça da Lista** | `Head` | Ponteiro para o primeiro nó de uma estrutura linear (Lista ou Fila). |
| **Cauda da Lista** | `Tail` | Ponteiro para o último nó de uma estrutura linear. |
| **Próximo** | `Next` | Ponteiro em um nó que aponta para o nó sucessor. |
| **Anterior** | `Prev` | Ponteiro em um nó de Lista Duplamente Encadeada que aponta para o nó antecessor. |
| **Esquerda / Direita** | `Left` / `Right` | Ponteiros estruturais de nós em Árvores Binárias ou ponteiros dinâmicos em algoritmos de particionamento (ex: Quick Sort). |
| **Empilhar** | `Push` | Operação linear de inserção de um elemento no topo de uma Pilha. |
| **Desempilhar** | `Pop` | Operação linear de remoção do elemento no topo de uma Pilha. |
| **Enfileirar** | `Enqueue` | Operação linear de inserção de um elemento no final de uma Fila. |
| **Desenfileirar** | `Dequeue` | Operação linear de remoção do elemento inicial de uma Fila. |
| **LIFO** | `LIFO` | Last-In-First-Out (Último a Entrar, Primeiro a Sair). Conceito central da Pilha. |
| **FIFO** | `FIFO` | First-In-First-Out (Primeiro a Entrar, Primeiro a Sair). Conceito central da Fila. |
| **Em Comparação** | `comparingNodes` / `isComparing` | Estado visual (booleano ou lista de IDs) que marca nós que estão ativamente sendo comparados pelo algoritmo em um passo específico. |

## 2. Convenções de Código (Code Conventions)

Para garantir a manutenção e legibilidade do projeto, as seguintes regras devem ser aplicadas em todo o ecossistema (Frontend e Backend):

- **Código Estritamente em Inglês (No Tupiniquim Code):** Variáveis, funções, classes, tabelas de banco de dados e rotas de API devem ser escritas em inglês. Textos em português são restritos aos dicionários JSON de internacionalização (`i18next`) e a esta documentação.
- **Prefixos para Booleanos:** Variáveis que armazenam estados de verdadeiro/falso devem iniciar com verbos de estado para leitura semântica.
  - *Correto:* `isBalanced`, `hasChildren`, `isVisited`, `hasSwapped`
  - *Incorreto:* `balanced`, `childrenStatus`, `checkVisit`
- **Isolamento de UI vs. Lógica:** Termos como `Color`, `Border`, `Canvas` não devem existir dentro dos motores dos algoritmos. O algoritmo gera o `Snapshot`, e o componente React decide como estilizá-lo.
- **Evitar Sinônimos:** Utilize os termos exatos desta tabela. Não crie uma variável chamada `element` ou `item` se o domínio estabelece que aquele dado é um `Node`.