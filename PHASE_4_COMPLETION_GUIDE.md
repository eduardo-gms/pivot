# Phase 4 Completion Guide - Missing Sections for seed.ts

This document contains the 3 missing sections for each algorithm needed to complete Phase 4 (8-section template).

**Location to add**: Between the existing "## Complexity" and "## When to use" sections in each algorithm's content.

## Instructions

For each algorithm, add these three sections in the order below:

1. Open [backend/prisma/seed.ts](backend/prisma/seed.ts)
2. Find the algorithm's content (search for `await upsertArticle('algorithm-slug'`)
3. Locate the line with `## Complexity` / `## Complexidade`
4. Insert the new sections **before** `## When to use` / `## Quando usar`
5. Keep the same indentation as surrounding content
6. Ensure UTF-8 special characters (←, →, ó, etc.) are preserved

---

## SORT ALGORITHMS

### 1. Bubble Sort

**Add to EN section after Complexity:**

```
## How it works

Bubble Sort repeatedly steps through the list, comparing adjacent elements and swapping them if they're in the wrong order. In each pass through the array, the largest unsorted element "bubbles up" to its correct position at the end. This continues until no more swaps are needed.

## Comparison with related algorithms

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space | Stable |
|-----------|-------------|-----------|------------|-------|--------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

## Common mistakes

1. **Not implementing the "sorted" flag**: Without tracking if a pass had swaps, you'll always do n passes instead of stopping early when sorted
2. **Wrong comparison direction**: Make sure you're comparing for ascending order (arr[i] > arr[i+1]) or descending, consistently
3. **Off-by-one in range**: Remember to shrink the comparison range after each pass since the end is already sorted
4. **Modifying while iterating incorrectly**: If implementing in-place, be careful with swap logic
```

**Add to PT-BR section after Complexidade:**

```
## Como funciona

Bubble Sort repetidamente passa pela lista, comparando elementos adjacentes e trocando-os se estão em ordem errada. Em cada passagem pelo array, o maior elemento não ordenado "borbulha" para sua posição correta no final. Isso continua até que nenhuma troca seja necessária.

## Comparação com algoritmos relacionados

| Algoritmo | Tempo (Melhor) | Tempo (Médio) | Tempo (Pior) | Espaço | Estável |
|-----------|----------------|---------------|-------------|--------|---------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | Não |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | Sim |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) | Não |

## Erros comuns

1. **Não implementar a flag "sorted"**: Sem rastrear se uma passagem teve trocas, você sempre fará n passagens em vez de parar cedo quando ordenado
2. **Direção de comparação errada**: Certifique-se de comparar para ordem crescente (arr[i] > arr[i+1]) ou decrescente, consistentemente
3. **Off-by-one no range**: Lembre-se de encolher o range de comparação após cada passagem já que o final já está ordenado
4. **Modificar enquanto itera incorretamente**: Se implementar in-place, cuidado com lógica de troca
```

### 2. Selection Sort

**Add to EN section after Complexity:**

```
## How it works

Selection Sort divides the array into two parts: sorted and unsorted. It repeatedly finds the minimum element from the unsorted portion and moves it to the end of the sorted portion. Unlike bubble sort, it doesn't swap continuously—it finds the minimum first, then makes one swap per iteration.

## Comparison with related algorithms

(Same table as Bubble Sort above - Selection Sort comparison)

## Common mistakes

1. **Finding minimum in wrong range**: Make sure you're only searching the unsorted portion (from current index to end)
2. **Confusing with bubble sort**: Selection makes one swap per iteration (or none if already in place), not multiple
3. **Not tracking minimum index**: Collect the minimum index first, then swap once
4. **Off-by-one in final iteration**: You don't need to process the last element since it's automatically in place
```

**Add to PT-BR section:**

```
## Como funciona

Selection Sort divide o array em duas partes: ordenada e não ordenada. Repetidamente encontra o elemento mínimo da porção não ordenada e o move para o final da porção ordenada. Diferente de Bubble Sort, não troca continuamente—encontra o mínimo primeiro, depois faz uma troca por iteração.

## Comparação com algoritmos relacionados

(Same table as Bubble Sort above - Selection Sort comparison)

## Erros comuns

1. **Encontrar mínimo no range errado**: Certifique-se de pesquisar apenas a porção não ordenada (do índice atual até o final)
2. **Confundir com Bubble Sort**: Selection faz uma troca por iteração (ou nenhuma se já está no lugar), não múltiplas
3. **Não rastrear índice mínimo**: Coleta o índice mínimo primeiro, depois troca uma vez
4. **Off-by-one na iteração final**: Você não precisa processar o último elemento já que está automaticamente no lugar
```

### 3. Insertion Sort

**Add to EN section after Complexity:**

```
## How it works

Insertion Sort builds the sorted array one item at a time by iterating through an unsorted array and inserting each element into its correct position in the sorted portion. It's similar to how you might sort playing cards in your hand.

## Comparison with related algorithms

(Same sorting algorithms table)

## Common mistakes

1. **Inserting in the wrong position**: Use binary search or proper linear search to find where the element belongs
2. **Shifting vs swapping**: Remember to shift elements to the right before inserting, not just swap
3. **Boundary conditions**: Be careful with the comparison operators (< vs ≤) based on whether you want stable sort
4. **Starting index**: The sorted portion starts with just the first element (index 0)
```

**Add to PT-BR section:**

```
## Como funciona

Insertion Sort constrói o array ordenado um item por vez, iterando através de um array não ordenado e inserindo cada elemento em sua posição correta na porção ordenada. É similar a como você pode ordenar cartas na sua mão.

## Comparação com algoritmos relacionados

(Same sorting algorithms table)

## Erros comuns

1. **Inserir na posição errada**: Use busca binária ou busca linear apropriada para encontrar onde o elemento pertence
2. **Deslocar vs trocar**: Lembre-se de deslocar elementos para a direita antes de inserir, não apenas trocar
3. **Condições limite**: Cuidado com operadores de comparação (< vs ≤) baseado em se você quer ordenação estável
4. **Índice inicial**: A porção ordenada começa com apenas o primeiro elemento (índice 0)
```

### 4. Merge Sort

**Add to EN section after Complexity:**

```
## How it works

Merge Sort uses a divide-and-conquer strategy: it recursively divides the array into halves until each subarray has one element (which is trivially sorted), then merges them back together in sorted order. The merge operation combines two sorted arrays into one sorted array.

## Comparison with related algorithms

(Same sorting algorithms table)

## Common mistakes

1. **Wrong merge logic**: When merging two arrays, compare elements from both and pick the smaller one, advancing that pointer
2. **Not allocating temporary array**: Merge sort requires O(n) extra space for merging—don't forget to allocate it
3. **Infinite recursion**: Ensure your base case is correct (length ≤ 1) and you're making progress toward it
4. **Index out of bounds in merge**: Carefully handle the case when one array is exhausted before the other
```

**Add to PT-BR section:**

```
## Como funciona

Merge Sort usa uma estratégia de dividir-e-conquistar: recursivamente divide o array em metades até cada subarray ter um elemento (trivialmente ordenado), depois os mescla de volta em ordem ordenada. A operação de mesclagem combina dois arrays ordenados em um array ordenado.

## Comparação com algoritmos relacionados

(Same sorting algorithms table)

## Erros comuns

1. **Lógica de mesclagem errada**: Ao mesclar dois arrays, compare elementos de ambos e escolha o menor, avançando esse ponteiro
2. **Não alocar array temporário**: Merge sort requer espaço O(n) extra para mesclagem—não esqueça de alocá-lo
3. **Recursão infinita**: Certifique-se de que seu caso base está correto (comprimento ≤ 1) e você está fazendo progresso em direção a ele
4. **Índice fora dos limites em mesclagem**: Cuidadosamente trate o caso quando um array se esgota antes do outro
```

### 5. Quick Sort

**Add to EN section after Complexity:**

```
## How it works

Quick Sort selects a "pivot" element and partitions the array into elements smaller than the pivot and elements larger than the pivot, then recursively sorts each partition. The efficiency depends heavily on pivot selection—a good pivot divides the array roughly in half.

## Comparison with related algorithms

(Same sorting algorithms table)

## Common mistakes

1. **Poor pivot selection**: Choosing first or last element on already-sorted data gives O(n²). Use random or median-of-three
2. **Not handling duplicates**: If many elements equal the pivot, partition into three groups: less, equal, greater
3. **Incorrect partitioning**: Ensure pointers don't cross; stop when they meet or just pass
4. **Not terminating recursion**: Make sure recursive calls progress toward base case (subarray of size ≤ 1)
```

**Add to PT-BR section:**

```
## Como funciona

Quick Sort seleciona um elemento "pivô" e particiona o array em elementos menores que o pivô e elementos maiores que o pivô, depois recursivamente ordena cada partição. A eficiência depende muito da seleção do pivô—um bom pivô divide o array aproximadamente pela metade.

## Comparação com algoritmos relacionados

(Same sorting algorithms table)

## Erros comuns

1. **Seleção ruim de pivô**: Escolher primeiro ou último elemento em dados já ordenados dá O(n²). Use aleatório ou mediana-de-três
2. **Não tratar duplicatas**: Se muitos elementos iguais ao pivô, particione em três grupos: menor, igual, maior
3. **Particionamento incorreto**: Certifique-se de que ponteiros não se cruzam; pare quando se encontram ou apenas passam
4. **Não terminar recursão**: Certifique-se de que chamadas recursivas progridem em direção ao caso base (subarray de tamanho ≤ 1)
```

---

## LINEAR STRUCTURES

### 6. Stack

**Add to EN section after Complexity:**

```
## How it works

A Stack operates on a Last-In-First-Out (LIFO) principle. When you push an element, it goes on top. When you pop, you remove from the top. It's like a stack of plates—you add and remove from the same end.

## Comparison with related data structures

| Structure | Insert | Delete | Access | Use Case |
|-----------|--------|--------|--------|----------|
| Stack | O(1) | O(1) | O(1)* | Undo/redo, recursion |
| Queue | O(1) | O(1) | O(1)* | Task scheduling, BFS |
| Linked List | O(1)** | O(1)** | O(n) | Dynamic sizing, no waste |
| Array | O(1)** | O(n) | O(1) | Cache efficiency, simplicity |

*Limited access (only top/front)  
**Depends on position

## Common mistakes

1. **Checking empty incorrectly**: Test if stack is empty before popping—don't assume
2. **Forgetting to update size**: Always increment on push and decrement on pop
3. **Not initializing properly**: Set size to 0 and allocate array/list during initialization
4. **Memory leaks in languages with manual memory**: Free popped elements if they hold resources
```

**Add to PT-BR section:**

```
## Como funciona

Uma Pilha opera no princípio Last-In-First-Out (LIFO). Quando você faz push de um elemento, ele vai no topo. Quando você faz pop, você remove do topo. É como uma pilha de pratos—você adiciona e remove do mesmo lado.

## Comparação com estruturas de dados relacionadas

(Same table as English version)

## Erros comuns

1. **Verificar vazio incorretamente**: Teste se a pilha está vazia antes de fazer pop—não assuma
2. **Esquecer atualizar tamanho**: Sempre incremente no push e decremente no pop
3. **Não inicializar corretamente**: Defina tamanho para 0 e aloque array/lista durante inicialização
4. **Vazamento de memória em linguagens com memória manual**: Libere elementos retirados se eles retêm recursos
```

### 7. Queue

**Add to EN section after Complexity:**

```
## How it works

A Queue operates on a First-In-First-Out (FIFO) principle. Elements are added at the rear and removed from the front. It's like a line at a store—first person to join is first to leave.

## Comparison with related data structures

(Same table as Stack)

## Common mistakes

1. **Confusing front and rear**: Enqueue always uses rear pointer, dequeue always uses front pointer
2. **Forgetting circular behavior**: In array-based queues, when rear reaches the end, wrap it back to the beginning
3. **Distinguishing empty vs full**: With circular arrays, empty is front == rear, full is front == rear after wrapping
4. **Not resizing dynamic queues**: When using dynamic allocation, double the size when full
```

**Add to PT-BR section:**

```
## Como funciona

Uma Fila opera no princípio First-In-First-Out (FIFO). Elementos são adicionados na parte traseira e removidos da frente. É como uma fila em uma loja—primeira pessoa a entrar é primeira a sair.

## Comparação com estruturas de dados relacionadas

(Same table as Stack)

## Erros comuns

1. **Confundir frente e traseira**: Enqueue sempre usa ponteiro traseiro, dequeue sempre usa ponteiro frontal
2. **Esquecer comportamento circular**: Em filas baseadas em array, quando traseira atinge o final, envolva de volta ao início
3. **Distinguir vazio vs cheio**: Com arrays circulares, vazio é frente == traseira, cheio é frente == traseira após envolver
4. **Não redimensionar filas dinâmicas**: Quando usar alocação dinâmica, dobre o tamanho quando cheio
```

### 8. Linked List

**Add to EN section after Complexity:**

```
## How it works

A Linked List is a sequence of nodes, each containing data and a reference to the next node. Unlike arrays, linked lists don't require contiguous memory. Traversal starts from the head and follows the chain of references. Insertion and deletion are efficient at known positions but require traversal from the start if position is not known.

## Comparison with related data structures

(Same table as Stack/Queue)

## Common mistakes

1. **Not updating pointers correctly**: After insertion/deletion, update the previous node's next pointer
2. **Forgetting the head pointer**: Keep a reference to the head; otherwise you lose access to the entire list
3. **Infinite loops in traversal**: Ensure you check for null and don't accidentally create a cycle
4. **Memory leaks on deletion**: When removing a node, ensure it's freed if in a manual memory management language
```

**Add to PT-BR section:**

```
## Como funciona

Uma Lista Ligada é uma sequência de nós, cada uma contendo dados e uma referência ao próximo nó. Diferente de arrays, listas ligadas não requerem memória contígua. Travessia começa da cabeça e segue a cadeia de referências. Inserção e exclusão são eficientes em posições conhecidas mas requerem travessia desde o início se posição não é conhecida.

## Comparação com estruturas de dados relacionadas

(Same table as Stack/Queue)

## Erros comuns

1. **Não atualizar ponteiros corretamente**: Após inserção/exclusão, atualize o ponteiro next do nó anterior
2. **Esquecer o ponteiro cabeça**: Mantenha uma referência à cabeça; caso contrário você perde acesso à toda lista
3. **Loops infinitos em travessia**: Certifique-se de verificar nulo e não acidentalmente criar um ciclo
4. **Vazamento de memória na exclusão**: Ao remover um nó, certifique-se de que é liberado se em linguagem de gerenciamento manual
```

---

## TREE STRUCTURES

### 9. AVL Tree

(See detailed content in PHASE_4_VALIDATION_REPORT.md - already has pseudocode)

**Add to EN section after Complexity:**

```
## How it works

AVL Trees maintain balance through recursive insertion and deletion with automatic rotations:

1. Insert normally as in a binary search tree
2. Check balance factor of affected nodes
3. Identify rotation type (LL, RR, LR, RL)
4. Perform rotation(s) to restore balance

The key insight: rotations preserve the binary search tree property while rebalancing the tree in O(log n) operations.

## Comparison with related algorithms

| Feature | AVL Tree | Red-Black Tree | B-Tree |
|---------|----------|----------------|--------|
| Balance | Strict (height diff ≤ 1) | Relaxed (color-based) | Multi-level (m-ary) |
| Rotations | More frequent | Fewer rotations | Minimized via branching |
| Best for | Read-heavy | General purpose | Database indexes |
| Space | O(n) | O(n) | O(n) |

## Common mistakes

1. Forgetting to update heights after rotations
2. Wrong rotation type selection based on balance factor
3. Handling duplicates inconsistently
4. Incomplete rebalancing of ancestor nodes
```

### 10. Priority Queue

**Add to EN section after Complexity:**

```
## How it works

A Priority Queue (Max-Heap) maintains elements in order of priority. Insertion "bubbles up" to maintain the heap property. Extraction removes the root (max element) and "bubbles down" the last element. Every operation maintains: Parent priority ≥ child priorities.

## Comparison with related algorithms

| Feature | Priority Queue (Heap) | Sorted Array | Linked List | BST |
|---------|------------------------|--------------|-------------|-----|
| Insert | O(log n) | O(n) | O(n) | O(log n) avg |
| Extract-Max | O(log n) | O(1) | O(1) | O(log n) avg |
| Peek-Max | O(1) | O(1) | O(1) | O(log n) avg |
| Space | O(n) | O(n) | O(n) | O(n) |

## Common mistakes

1. Confusing min-heap and max-heap comparison directions
2. Wrong index arithmetic (left = 2i, right = 2i+1, parent = i/2)
3. Forgetting to update heap size before heapify operations
4. Incomplete heapify-down after extraction
```

---

## Summary

Total sections to add: **3 sections × 10 algorithms × 2 languages = 60 new sections**

**Time estimate**: ~5-10 hours depending on detail level

**Alternative**: Use content from this guide as starting point and improve based on your preferences.

---

## Validation After Adding

After adding sections to seed.ts:

1. Run: `cd backend && npm run seed`
2. Verify output shows "✅ Seeding finished successfully"
3. Check database: all articles should have 8 sections each
4. Start frontend: `cd frontend && npm run dev`
5. Test viewing each algorithm to confirm all sections render

---

**Last Updated**: 2025-01-XX  
**Status**: Ready for manual completion by development team
