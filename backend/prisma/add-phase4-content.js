/**
 * Script to add Phase 4 missing content sections to seed.ts
 * Inserts: "How it works", "Comparison", and "Common mistakes" for each algorithm
 */

const fs = require('fs');
const path = require('path');

// Algoritmos and their slugs
const algorithms = [
  'bubble-sort',
  'selection-sort',
  'insertion-sort',
  'merge-sort',
  'quick-sort',
  'stack',
  'queue',
  'linked-list',
  'avl-tree',
  'priority-queue',
];

// Content to add after "## Complexity" / "## Complexidade" and before "## When to use" / "## Quando usar"
const sections = {
  'bubble-sort': {
    en: `## How it works

Bubble Sort repeatedly walks through the list, compares adjacent elements, and swaps them if they are in the wrong order. In each pass, the largest unsorted element "bubbles" to its correct position. This continues until no swaps are needed.

## Comparison with related algorithms

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space | Stable |
|-----------|-------------|-----------|------------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

## Common mistakes

1. **Not implementing the "sorted" flag**: Without tracking if a pass had swaps, you'll always do n passes instead of stopping early
2. **Wrong comparison direction**: Ensure consistent ascending or descending order (arr[i] > arr[i+1])
3. **Off-by-one in range**: Shrink the comparison range after each pass since the end is already sorted
4. **Incorrect swap logic**: Be careful with temporary variable handling in-place swaps`,
    pt: `## Como funciona

Bubble Sort percorre repetidamente a lista, compara elementos adjacentes e os troca se estão na ordem errada. A cada passagem, o maior elemento não ordenado "flutua" para sua posição correta. Isso continua até que nenhuma troca seja necessária.

## Comparação com algoritmos relacionados

| Algoritmo | Tempo (Melhor) | Tempo (Médio) | Tempo (Pior) | Espaço | Estável |
|-----------|----------------|---------------|-------------|--------|---------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | Não |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Sim |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | Não |

## Erros comuns

1. **Não implementar a flag "sorted"**: Sem rastrear trocas, você fará n passagens em vez de parar cedo
2. **Direção de comparação errada**: Garanta ordem consistente crescente ou decrescente (arr[i] > arr[i+1])
3. **Off-by-one no range**: Encolha o range de comparação após cada passagem já que o final está ordenado
4. **Lógica de troca incorreta**: Cuidado com variáveis temporárias em trocas in-place`
  },
  'selection-sort': {
    en: `## How it works

Selection Sort divides the array into sorted and unsorted portions. It repeatedly finds the minimum element from the unsorted portion and moves it to the end of the sorted portion. Unlike Bubble Sort, it makes one swap per iteration.

## Comparison with related algorithms

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space | Stable |
|-----------|-------------|-----------|------------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

## Common mistakes

1. **Finding minimum in wrong range**: Only search the unsorted portion (from current index to end)
2. **Confusing with Bubble Sort**: Selection makes one swap per iteration, not multiple
3. **Not tracking minimum index**: Collect the minimum index first, then swap once
4. **Off-by-one in final iteration**: You don't need to process the last element since it's automatically in place`,
    pt: `## Como funciona

Selection Sort divide o array em porções ordenada e não ordenada. Repetidamente encontra o elemento mínimo da porção não ordenada e o move para o final da porção ordenada. Diferente de Bubble Sort, faz uma troca por iteração.

## Comparação com algoritmos relacionados

| Algoritmo | Tempo (Melhor) | Tempo (Médio) | Tempo (Pior) | Espaço | Estável |
|-----------|----------------|---------------|-------------|--------|---------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | Não |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Sim |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | Não |

## Erros comuns

1. **Encontrar mínimo no range errado**: Pesquise apenas a porção não ordenada (do índice atual até o final)
2. **Confundir com Bubble Sort**: Selection faz uma troca por iteração, não múltiplas
3. **Não rastrear índice mínimo**: Coleta o índice mínimo primeiro, depois troca uma vez
4. **Off-by-one na iteração final**: Você não precisa processar o último elemento pois está automaticamente no lugar`
  },
  'insertion-sort': {
    en: `## How it works

Insertion Sort builds the sorted array one element at a time. It iterates through an unsorted array and inserts each element into its correct position in the already-sorted portion. Like sorting playing cards in your hand.

## Comparison with related algorithms

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space | Stable |
|-----------|-------------|-----------|------------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

## Common mistakes

1. **Inserting in wrong position**: Use proper linear search to find where the element belongs
2. **Shifting vs swapping**: Shift elements right before inserting, don't just swap pairs
3. **Boundary conditions**: Be careful with comparison operators (< vs ≤) for stable sorting
4. **Starting index**: The sorted portion starts with just the first element`,
    pt: `## Como funciona

Insertion Sort constrói o array ordenado um elemento por vez. Itera através de um array não ordenado e insere cada elemento em sua posição correta na porção já ordenada. Como ordenar cartas na sua mão.

## Comparação com algoritmos relacionados

| Algoritmo | Tempo (Melhor) | Tempo (Médio) | Tempo (Pior) | Espaço | Estável |
|-----------|----------------|---------------|-------------|--------|---------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | Não |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Sim |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | Não |

## Erros comuns

1. **Inserir na posição errada**: Use busca linear apropriada para encontrar onde o elemento pertence
2. **Deslocar vs trocar**: Desloque elementos para a direita antes de inserir, não apenas troque pares
3. **Condições limite**: Cuidado com operadores de comparação (< vs ≤) para ordenação estável
4. **Índice inicial**: A porção ordenada começa com apenas o primeiro elemento`
  },
  'merge-sort': {
    en: `## How it works

Merge Sort uses a divide-and-conquer approach. It recursively divides the array into halves until each subarray has one element, then merges them back together in sorted order. The merge operation combines two sorted arrays into one sorted array.

## Comparison with related algorithms

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space | Stable |
|-----------|-------------|-----------|------------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

## Common mistakes

1. **Not properly dividing**: Use middle = (left + right) / 2 to avoid integer overflow
2. **Incorrect merge**: Compare current elements from both subarrays and take the smaller one
3. **Index management**: Track indices for both halves and the merged array carefully
4. **Edge cases**: Handle subarrays of size 0 and 1 correctly (size 1 is already sorted)`,
    pt: `## Como funciona

Merge Sort usa uma abordagem divide-e-conquista. Recursivamente divide o array em metades até que cada subarray tenha um elemento, depois os mescla de volta em ordem ordenada. A operação de merge combina dois arrays ordenados em um.

## Comparação com algoritmos relacionados

| Algoritmo | Tempo (Melhor) | Tempo (Médio) | Tempo (Pior) | Espaço | Estável |
|-----------|----------------|---------------|-------------|--------|---------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | Não |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Sim |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | Não |

## Erros comuns

1. **Não dividir adequadamente**: Use middle = (left + right) / 2 para evitar overflow de inteiros
2. **Merge incorreto**: Compare elementos atuais de ambos os subarrays e pegue o menor
3. **Gestão de índices**: Rastreie índices para ambas as metades e o array mesclado cuidadosamente
4. **Casos extremos**: Lide com subarrays de tamanho 0 e 1 corretamente (tamanho 1 já está ordenado)`
  },
  'quick-sort': {
    en: `## How it works

Quick Sort uses a divide-and-conquer strategy by selecting a "pivot" element and partitioning the array so that all elements smaller than the pivot are on the left, and all larger elements are on the right. It then recursively sorts each partition.

## Comparison with related algorithms

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space | Stable |
|-----------|-------------|-----------|------------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

## Common mistakes

1. **Poor pivot selection**: Random pivot or median-of-three is better than always picking first/last element
2. **Partitioning incorrectly**: Ensure all elements ≤ pivot are on one side, and all > pivot on the other
3. **Not handling duplicates**: With many duplicates, consider 3-way partitioning
4. **Stack overflow risk**: Deep recursion on already-sorted arrays can cause stack overflow in naive implementations`,
    pt: `## Como funciona

Quick Sort usa uma estratégia divide-e-conquista selecionando um elemento "pivô" e particionando o array de forma que todos os elementos menores que o pivô estejam à esquerda e todos os maiores à direita. Depois ordena recursivamente cada partição.

## Comparação com algoritmos relacionados

| Algoritmo | Tempo (Melhor) | Tempo (Médio) | Tempo (Pior) | Espaço | Estável |
|-----------|----------------|---------------|-------------|--------|---------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | Não |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Sim |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | Não |

## Erros comuns

1. **Seleção ruim de pivô**: Pivô aleatório ou mediana-de-três é melhor que sempre pegar primeiro/último elemento
2. **Particionamento incorreto**: Garanta que todos os elementos ≤ pivô estejam em um lado, e todos os > pivô no outro
3. **Não lidar com duplicatas**: Com muitas duplicatas, considere particionamento 3-via
4. **Risco de estouro de pilha**: Recursão profunda em arrays já ordenados pode causar estouro em implementações ingênuas`
  },
  'stack': {
    en: `## How it works

A Stack is a Last-In-First-Out (LIFO) data structure where elements are added (pushed) and removed (popped) from the same end, called the "top". Think of a stack of plates: you add new plates on top and remove from the top.

## Comparison with related data structures

| Structure | Push | Pop | Peek | Space | Order |
|-----------|------|-----|------|-------|-------|
| Stack | O(1) | O(1) | O(1) | O(n) | LIFO |
| Queue | O(1) | O(1) | O(1) | O(n) | FIFO |
| Deque | O(1) | O(1) | O(1) | O(n) | Both |
| Array | O(1) | O(n) | O(1) | O(n) | Random |
| Linked List | O(1) | O(1) | O(1) | O(n) | Sequential |

## Common mistakes

1. **Not checking for empty on pop**: Always verify the stack isn't empty before popping to avoid underflow errors
2. **Confusion with Queue**: Remember LIFO for Stack vs FIFO for Queue
3. **Infinite loops**: Make sure your base case uses proper stack emptiness check
4. **Memory leaks**: When removing elements, ensure you're dereferencing properly (not leaving dangling pointers)`,
    pt: `## Como funciona

Uma Stack é uma estrutura de dados Last-In-First-Out (LIFO) onde elementos são adicionados (empilhados) e removidos (desempilhados) do mesmo extremo, chamado "topo". Pense em uma pilha de pratos: você adiciona novos pratos no topo e remove do topo.

## Comparação com estruturas de dados relacionadas

| Estrutura | Push | Pop | Peek | Espaço | Ordem |
|-----------|------|-----|------|--------|-------|
| Stack | O(1) | O(1) | O(1) | O(n) | LIFO |
| Queue | O(1) | O(1) | O(1) | O(n) | FIFO |
| Deque | O(1) | O(1) | O(1) | O(n) | Ambas |
| Array | O(1) | O(n) | O(1) | O(n) | Aleatório |
| Linked List | O(1) | O(1) | O(1) | O(n) | Sequencial |

## Erros comuns

1. **Não verificar vazio em pop**: Sempre verifique se a stack não está vazia antes de desempilhar para evitar erros de underflow
2. **Confusão com Queue**: Lembre LIFO para Stack vs FIFO para Queue
3. **Loops infinitos**: Certifique-se que seu caso base usa verificação apropriada de stack vazia
4. **Vazamento de memória**: Ao remover elementos, garanta que está desreferenciando apropriadamente (sem ponteiros soltos)`
  },
  'queue': {
    en: `## How it works

A Queue is a First-In-First-Out (FIFO) data structure where elements are added (enqueued) at the rear and removed (dequeued) from the front. Like a line at a grocery store: you join at the back and leave from the front.

## Comparison with related data structures

| Structure | Enqueue | Dequeue | Peek | Space | Order |
|-----------|---------|---------|------|-------|-------|
| Stack | O(1) | O(1) | O(1) | O(n) | LIFO |
| Queue | O(1) | O(1) | O(1) | O(n) | FIFO |
| Deque | O(1) | O(1) | O(1) | O(n) | Both |
| Array | O(1) | O(n) | O(1) | O(n) | Random |
| Linked List | O(1) | O(1) | O(1) | O(n) | Sequential |

## Common mistakes

1. **Not checking for empty on dequeue**: Always verify the queue isn't empty before dequeuing
2. **Confusion with Stack**: Remember FIFO for Queue vs LIFO for Stack
3. **Index management in circular queue**: If implementing with array, handle wrap-around correctly
4. **Not maintaining rear pointer**: Track both front and rear indices to avoid O(n) enqueue operations`,
    pt: `## Como funciona

Uma Queue é uma estrutura de dados First-In-First-Out (FIFO) onde elementos são adicionados (enfileirados) na retaguarda e removidos (desenfileirados) da frente. Como uma fila em um supermercado: você entra na volta e sai da frente.

## Comparação com estruturas de dados relacionadas

| Estrutura | Enqueue | Dequeue | Peek | Espaço | Ordem |
|-----------|---------|---------|------|--------|-------|
| Stack | O(1) | O(1) | O(1) | O(n) | LIFO |
| Queue | O(1) | O(1) | O(1) | O(n) | FIFO |
| Deque | O(1) | O(1) | O(1) | O(n) | Ambas |
| Array | O(1) | O(n) | O(1) | O(n) | Aleatório |
| Linked List | O(1) | O(1) | O(1) | O(n) | Sequencial |

## Erros comuns

1. **Não verificar vazio em dequeue**: Sempre verifique se a queue não está vazia antes de desenfileirar
2. **Confusão com Stack**: Lembre FIFO para Queue vs LIFO para Stack
3. **Gestão de índice em queue circular**: Se implementar com array, trate wrap-around corretamente
4. **Não manter ponteiro de retaguarda**: Rastreie tanto índices de frente como retaguarda para evitar operações O(n) de enqueue`
  },
  'linked-list': {
    en: `## How it works

A Linked List is a linear data structure where each element (node) contains data and a reference (pointer/link) to the next node. Unlike arrays, linked lists don't require contiguous memory and allow efficient insertion/deletion at any position.

## Comparison with related data structures

| Structure | Access | Insert | Delete | Space | Memory |
|-----------|--------|--------|--------|-------|--------|
| Array | O(1) | O(n) | O(n) | O(n) | Contiguous |
| Linked List | O(n) | O(1)* | O(1)* | O(n) | Non-contiguous |
| Doubly Linked | O(n) | O(1)* | O(1)* | O(n) | Non-contiguous |
| Circular Linked | O(n) | O(1)* | O(1)* | O(n) | Non-contiguous |
| Skip List | O(log n) | O(log n) | O(log n) | O(n) | Variable |

*O(1) if you have the node reference, O(n) if searching first

## Common mistakes

1. **Not checking for null pointers**: Always check if the node exists before accessing its properties
2. **Memory leaks**: When deleting a node, ensure you properly unlink it from the chain
3. **Off-by-one in traversal**: Be careful with loop conditions to avoid missing the first/last node
4. **Losing references**: Don't lose the reference to the head node or you'll lose the entire list`,
    pt: `## Como funciona

Uma Linked List é uma estrutura de dados linear onde cada elemento (nó) contém dados e uma referência (ponteiro/link) para o próximo nó. Diferente de arrays, linked lists não requerem memória contígua e permitem inserção/exclusão eficiente em qualquer posição.

## Comparação com estruturas de dados relacionadas

| Estrutura | Acesso | Inserir | Deletar | Espaço | Memória |
|-----------|--------|--------|--------|--------|---------|
| Array | O(1) | O(n) | O(n) | O(n) | Contígua |
| Linked List | O(n) | O(1)* | O(1)* | O(n) | Não-contígua |
| Doubly Linked | O(n) | O(1)* | O(1)* | O(n) | Não-contígua |
| Circular Linked | O(n) | O(1)* | O(1)* | O(n) | Não-contígua |
| Skip List | O(log n) | O(log n) | O(log n) | O(n) | Variável |

*O(1) se você tem a referência do nó, O(n) se procurando primeiro

## Erros comuns

1. **Não verificar ponteiros nulos**: Sempre verifique se o nó existe antes de acessar suas propriedades
2. **Vazamento de memória**: Ao deletar um nó, garanta que está desviculando-o apropriadamente da cadeia
3. **Off-by-one na traversal**: Cuidado com condições de loop para não perder o primeiro/último nó
4. **Perder referências**: Não perca a referência ao nó head ou você perderá toda a lista`
  },
  'avl-tree': {
    en: `## How it works

An AVL Tree is a self-balancing binary search tree where the heights of the left and right subtrees differ by at most 1. After insertions or deletions, the tree performs rotations (single or double) to restore balance and maintain O(log n) search/insert/delete operations.

## Comparison with related tree structures

| Structure | Search | Insert | Delete | Balance | Space |
|-----------|--------|--------|--------|---------|-------|
| BST | O(n)* | O(n)* | O(n)* | Manual | O(n) |
| AVL Tree | O(log n) | O(log n) | O(log n) | Auto | O(n) |
| Red-Black | O(log n) | O(log n) | O(log n) | Auto | O(n) |
| B-Tree | O(log n) | O(log n) | O(log n) | Auto | O(n) |
| Heap | O(n) | O(log n) | O(log n) | Partial | O(n) |

*O(log n) average, O(n) worst case (degenerate tree)

## Common mistakes

1. **Not checking balance after operations**: Always recalculate heights and check balance factor after insert/delete
2. **Wrong rotation type**: Determine correctly when to use single vs double rotation
3. **Losing subtrees during rotation**: Carefully update parent pointers during rotations
4. **Not handling duplicate keys**: Decide how to handle duplicate values (reject, allow, or use counter)`,
    pt: `## Como funciona

Uma AVL Tree é uma árvore binária de busca auto-balanceada onde as alturas das subárvores esquerda e direita diferem por no máximo 1. Após inserções ou exclusões, a árvore executa rotações (simples ou duplas) para restaurar o equilíbrio e manter operações de busca/inserção/exclusão O(log n).

## Comparação com estruturas de árvore relacionadas

| Estrutura | Busca | Inserir | Deletar | Balanceamento | Espaço |
|-----------|-------|---------|---------|----------------|--------|
| BST | O(n)* | O(n)* | O(n)* | Manual | O(n) |
| AVL Tree | O(log n) | O(log n) | O(log n) | Auto | O(n) |
| Red-Black | O(log n) | O(log n) | O(log n) | Auto | O(n) |
| B-Tree | O(log n) | O(log n) | O(log n) | Auto | O(n) |
| Heap | O(n) | O(log n) | O(log n) | Parcial | O(n) |

*O(log n) em média, O(n) no pior caso (árvore degenerada)

## Erros comuns

1. **Não verificar equilíbrio após operações**: Sempre recalcule alturas e verifique o fator de equilíbrio após inserção/exclusão
2. **Tipo de rotação errado**: Determine corretamente quando usar rotação simples vs dupla
3. **Perder subárvores durante rotação**: Atualize cuidadosamente os ponteiros pai durante rotações
4. **Não lidar com chaves duplicadas**: Decida como lidar com valores duplicados (rejeitar, permitir, ou usar contador)`
  },
  'priority-queue': {
    en: `## How it works

A Priority Queue is an abstract data structure where elements are retrieved based on their priority rather than insertion order. Commonly implemented using a min-heap or max-heap binary tree structure, where the highest priority element is always at the root.

## Comparison with related structures

| Structure | Enqueue | Dequeue | Peek | Implementation | Order |
|-----------|---------|---------|------|-----------------|--------|
| Queue | O(1) | O(1) | O(1) | Linked/Array | FIFO |
| Stack | O(1) | O(1) | O(1) | Linked/Array | LIFO |
| Priority Queue | O(log n) | O(log n) | O(1) | Heap | By priority |
| Binary Tree | O(log n) | O(log n) | O(1) | Balanced | Ordered |
| Hash Map | O(1) | N/A | O(1) | Hash Table | Unordered |

## Common mistakes

1. **Not maintaining heap property**: After insertion/deletion, ensure the heap property (parent ≤ children in min-heap) is restored
2. **Incorrect priority comparison**: Be clear on whether lower values = higher priority or vice versa
3. **Index arithmetic errors**: In array-based heaps, parent = (i-1)/2, left = 2i+1, right = 2i+2
4. **Not handling underflow**: Check if the queue is empty before dequeuing to avoid errors`,
    pt: `## Como funciona

Uma Priority Queue é uma estrutura de dados abstrata onde elementos são recuperados baseado em sua prioridade em vez da ordem de inserção. Comumente implementada usando uma estrutura de árvore binária min-heap ou max-heap, onde o elemento com maior prioridade está sempre na raiz.

## Comparação com estruturas relacionadas

| Estrutura | Enqueue | Dequeue | Peek | Implementação | Ordem |
|-----------|---------|---------|------|------------------|--------|
| Queue | O(1) | O(1) | O(1) | Linked/Array | FIFO |
| Stack | O(1) | O(1) | O(1) | Linked/Array | LIFO |
| Priority Queue | O(log n) | O(log n) | O(1) | Heap | Por prioridade |
| Binary Tree | O(log n) | O(log n) | O(1) | Balanceada | Ordenada |
| Hash Map | O(1) | N/A | O(1) | Hash Table | Desordenada |

## Erros comuns

1. **Não manter propriedade heap**: Após inserção/exclusão, garanta que a propriedade heap (pai ≤ filhos em min-heap) é restaurada
2. **Comparação de prioridade incorreta**: Seja claro se valores menores = prioridade maior ou vice-versa
3. **Erros de aritmética de índice**: Em heaps baseados em array, pai = (i-1)/2, esquerda = 2i+1, direita = 2i+2
4. **Não lidar com underflow**: Verifique se a queue está vazia antes de desenfileirar para evitar erros`
  }
};

async function processFile() {
  const seedPath = path.join(__dirname, 'seed.ts');
  let content = fs.readFileSync(seedPath, 'utf-8');
  
  console.log('Starting Phase 4 content insertion...\n');
  
  for (const algo of algorithms) {
    if (!sections[algo]) {
      console.log(`⚠️  No templates for ${algo}, skipping...`);
      continue;
    }

    const { en, pt } = sections[algo];
    
    // Find the EN section
    const enMarker = `await upsertArticle('${algo}'`;
    if (!content.includes(enMarker)) {
      console.log(`✗ Could not find EN section for ${algo}`);
      continue;
    }

    // Find markers that indicate where to insert
    const markers = [
      '## When to use',      // Most algorithms
      '## Real-world Applications', // Stack, Queue
      '## Practical Uses'    // Fallback
    ];
    
    let insertedEN = false;
    for (const marker of markers) {
      const markerIndex = content.indexOf(marker, content.indexOf(enMarker));
      if (markerIndex > 0 && markerIndex < content.indexOf(enMarker) + 10000) {
        const enInsert = en + '\n\n';
        content = content.substring(0, markerIndex) + enInsert + content.substring(markerIndex);
        console.log(`✅ Added EN content for ${algo}`);
        insertedEN = true;
        break;
      }
    }
    
    if (!insertedEN) {
      console.log(`⚠️  Could not find insertion point for EN section of ${algo}`);
      continue;
    }

    // Find PT-BR markers (Portuguese versions)
    const ptMarkers = [
      '## Quando usar',
      '## Aplicações do Mundo Real',
      '## Usos Práticos'
    ];
    
    let insertedPt = false;
    for (const marker of ptMarkers) {
      const markerIndex = content.indexOf(marker, content.indexOf(enMarker) + en.length + 1000);
      if (markerIndex > 0 && markerIndex < content.indexOf(enMarker) + en.length + 20000) {
        const ptInsert = pt + '\n\n';
        content = content.substring(0, markerIndex) + ptInsert + content.substring(markerIndex);
        console.log(`✅ Added PT-BR content for ${algo}`);
        insertedPt = true;
        break;
      }
    }
    
    if (!insertedPt) {
      console.log(`⚠️  Could not find insertion point for PT-BR section of ${algo}`);
    }
  }

  fs.writeFileSync(seedPath, content, 'utf-8');
  console.log('\n✅ All sections inserted successfully!');
  console.log(`📄 Updated: ${seedPath}`);
}

processFile().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
