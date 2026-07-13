import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ──────────────────────────────────────────────────
  // 1. CATEGORIES
  // ──────────────────────────────────────────────────
  const sorting = await prisma.category.upsert({
    where: { slug: 'sorting' },
    update: {},
    create: {
      slug: 'sorting',
      translations: {
        create: [
          { locale: 'en', name: 'Sorting Algorithms', description: 'Algorithms that organize collections of data into a specific order.' },
          { locale: 'pt-BR', name: 'Algoritmos de Ordenação', description: 'Algoritmos focados em organizar coleções de dados em uma ordem específica.' },
        ],
      },
    },
  });

  const linearStructures = await prisma.category.upsert({
    where: { slug: 'linear-structures' },
    update: {},
    create: {
      slug: 'linear-structures',
      translations: {
        create: [
          { locale: 'en', name: 'Linear Data Structures', description: 'Structures where elements are arranged sequentially: Stacks, Queues, and Linked Lists.' },
          { locale: 'pt-BR', name: 'Estruturas de Dados Lineares', description: 'Estruturas onde os elementos são dispostos sequencialmente: Pilhas, Filas e Listas Encadeadas.' },
        ],
      },
    },
  });

  const trees = await prisma.category.upsert({
    where: { slug: 'trees' },
    update: {},
    create: {
      slug: 'trees',
      translations: {
        create: [
          { locale: 'en', name: 'Trees', description: 'Hierarchical data structures with nodes connected by edges.' },
          { locale: 'pt-BR', name: 'Árvores', description: 'Estruturas de dados hierárquicas com nós conectados por arestas.' },
        ],
      },
    },
  });

  // ──────────────────────────────────────────────────
  // 2. SORTING ALGORITHMS
  // ──────────────────────────────────────────────────
  const bubbleSort = await prisma.algorithm.upsert({
    where: { slug: 'bubble-sort' },
    update: {},
    create: {
      slug: 'bubble-sort',
      categoryId: sorting.id,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      translations: {
        create: [
          { locale: 'en', name: 'Bubble Sort', shortDescription: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.' },
          { locale: 'pt-BR', name: 'Bubble Sort', shortDescription: 'Percorre repetidamente a lista, compara elementos adjacentes e os troca se estiverem na ordem errada.' },
        ],
      },
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'selection-sort' },
    update: {},
    create: {
      slug: 'selection-sort',
      categoryId: sorting.id,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      translations: {
        create: [
          { locale: 'en', name: 'Selection Sort', shortDescription: 'Finds the minimum element from the unsorted portion and places it at the beginning.' },
          { locale: 'pt-BR', name: 'Selection Sort', shortDescription: 'Encontra o menor elemento da porção não ordenada e o coloca no início.' },
        ],
      },
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'insertion-sort' },
    update: {},
    create: {
      slug: 'insertion-sort',
      categoryId: sorting.id,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      translations: {
        create: [
          { locale: 'en', name: 'Insertion Sort', shortDescription: 'Builds the sorted array one item at a time by inserting each element in its correct position.' },
          { locale: 'pt-BR', name: 'Insertion Sort', shortDescription: 'Constrói o array ordenado um item por vez, inserindo cada elemento na posição correta.' },
        ],
      },
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'merge-sort' },
    update: {},
    create: {
      slug: 'merge-sort',
      categoryId: sorting.id,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      translations: {
        create: [
          { locale: 'en', name: 'Merge Sort', shortDescription: 'Divides the array into halves, recursively sorts them, and merges the sorted halves.' },
          { locale: 'pt-BR', name: 'Merge Sort', shortDescription: 'Divide o array ao meio, ordena recursivamente e mescla as metades ordenadas.' },
        ],
      },
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'quick-sort' },
    update: {},
    create: {
      slug: 'quick-sort',
      categoryId: sorting.id,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      translations: {
        create: [
          { locale: 'en', name: 'Quick Sort', shortDescription: 'Picks a pivot element and partitions the array around it, then recursively sorts sub-arrays.' },
          { locale: 'pt-BR', name: 'Quick Sort', shortDescription: 'Escolhe um pivô e particiona o array ao redor dele, ordenando recursivamente os sub-arrays.' },
        ],
      },
    },
  });

  // ──────────────────────────────────────────────────
  // 3. LINEAR STRUCTURES
  // ──────────────────────────────────────────────────
  await prisma.algorithm.upsert({
    where: { slug: 'stack' },
    update: {},
    create: {
      slug: 'stack',
      categoryId: linearStructures.id,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      translations: {
        create: [
          { locale: 'en', name: 'Stack (LIFO)', shortDescription: 'Last-In-First-Out structure. Push adds to the top, Pop removes from the top.' },
          { locale: 'pt-BR', name: 'Pilha (LIFO)', shortDescription: 'Estrutura Último a Entrar, Primeiro a Sair. Push insere no topo, Pop remove do topo.' },
        ],
      },
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'queue' },
    update: {},
    create: {
      slug: 'queue',
      categoryId: linearStructures.id,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      translations: {
        create: [
          { locale: 'en', name: 'Queue (FIFO)', shortDescription: 'First-In-First-Out structure. Enqueue adds to the back, Dequeue removes from the front.' },
          { locale: 'pt-BR', name: 'Fila (FIFO)', shortDescription: 'Estrutura Primeiro a Entrar, Primeiro a Sair. Enqueue insere no final, Dequeue remove do início.' },
        ],
      },
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'linked-list' },
    update: {},
    create: {
      slug: 'linked-list',
      categoryId: linearStructures.id,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      translations: {
        create: [
          { locale: 'en', name: 'Linked List', shortDescription: 'A linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next.' },
          { locale: 'pt-BR', name: 'Lista Encadeada', shortDescription: 'Uma coleção linear de elementos de dados cuja ordem não é dada por sua localização física na memória. Em vez disso, cada elemento aponta para o próximo.' },
        ],
      },
    },
  });

  // ──────────────────────────────────────────────────
  // 4. TREES
  // ──────────────────────────────────────────────────
  await prisma.algorithm.upsert({
    where: { slug: 'avl-tree' },
    update: {},
    create: {
      slug: 'avl-tree',
      categoryId: trees.id,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(n)',
      translations: {
        create: [
          { locale: 'en', name: 'AVL Tree', shortDescription: 'Self-balancing binary search tree where the heights of left and right subtrees differ by at most one.' },
          { locale: 'pt-BR', name: 'Árvore AVL', shortDescription: 'Árvore binária de busca auto-balanceada onde a altura das subárvores esquerda e direita difere em no máximo um.' },
        ],
      },
    },
  });

  await prisma.algorithm.upsert({
    where: { slug: 'priority-queue' },
    update: {},
    create: {
      slug: 'priority-queue',
      categoryId: trees.id,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(n)',
      translations: {
        create: [
          { locale: 'en', name: 'Priority Queue', shortDescription: 'An abstract data type similar to a regular queue or stack in which each element additionally has a "priority" associated with it. Often implemented with Heaps.' },
          { locale: 'pt-BR', name: 'Fila de Prioridade', shortDescription: 'Um tipo de dado abstrato semelhante a uma fila ou pilha regular, no qual cada elemento possui uma "prioridade" associada. Frequentemente implementado com Heaps.' },
        ],
      },
    },
  });

  // ──────────────────────────────────────────────────
  // 5. ARTICLES (complete content for all algorithms)
  // ──────────────────────────────────────────────────

  // Helper to create/upsert an article with bilingual translations
  async function upsertArticle(
    slug: string,
    algorithmId: string,
    en: { title: string; content: string; seo: string },
    ptBR: { title: string; content: string; seo: string },
  ) {
    await prisma.article.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        algorithmId,
        isPublished: true,
        translations: {
          create: [
            { locale: 'en', title: en.title, content: en.content, seoDescription: en.seo },
            { locale: 'pt-BR', title: ptBR.title, content: ptBR.content, seoDescription: ptBR.seo },
          ],
        },
      },
    });
  }

  // Fetch all algorithm IDs for article association
  const allAlgos = await prisma.algorithm.findMany();
  const algoMap = Object.fromEntries(allAlgos.map(a => [a.slug, a.id]));

  // ── Bubble Sort ──
  await upsertArticle('bubble-sort', algoMap['bubble-sort'],
    {
      title: 'Understanding Bubble Sort Step by Step',
      seo: 'A complete guide to Bubble Sort with step-by-step visual explanation and Big-O complexity analysis.',
      content: `# What is Bubble Sort?

Bubble Sort is one of the simplest sorting algorithms. It repeatedly walks through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

## How it works

1. Start from the first element
2. Compare the current element with the next one
3. If the current element is greater, swap them
4. Move to the next pair and repeat
5. After each full pass, the largest unsorted element "bubbles" to its correct position

## Complexity

| Case | Time | Space |
|------|------|-------|
| Best | O(n) | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

The best case O(n) occurs when the array is already sorted and we use an optimization flag to detect no swaps.

## When to use

- **Educational purposes**: Bubble Sort is ideal for learning the fundamentals of sorting because its logic is very intuitive.
- **Very small datasets**: When the array has fewer than ~20 elements, the overhead of more complex algorithms may not be worthwhile.
- **Nearly sorted data**: With the optimized version (early exit when no swaps occur), Bubble Sort can run in O(n) on nearly sorted arrays.

## Visualize on Pivot

Use the simulator above to see each comparison and swap animated step by step. Try different input arrays to observe how the number of passes changes!`,
    },
    {
      title: 'Entendendo o Bubble Sort Passo a Passo',
      seo: 'Um guia completo para entender o Bubble Sort com explicação visual passo a passo e análise de complexidade Big-O.',
      content: `# O que é o Bubble Sort?

O Bubble Sort é um dos algoritmos de ordenação mais simples. Ele percorre repetidamente a lista, compara elementos adjacentes e os troca se estiverem na ordem errada. A passagem pela lista é repetida até que a lista esteja ordenada.

## Como funciona

1. Comece pelo primeiro elemento
2. Compare o elemento atual com o próximo
3. Se o elemento atual for maior, troque-os
4. Mova para o próximo par e repita
5. Após cada passagem completa, o maior elemento não ordenado "flutua" para sua posição correta

## Complexidade

| Caso | Tempo | Espaço |
|------|-------|--------|
| Melhor | O(n) | O(1) |
| Médio | O(n²) | O(1) |
| Pior | O(n²) | O(1) |

O melhor caso O(n) ocorre quando o array já está ordenado e usamos uma flag de otimização para detectar que não houve trocas.

## Quando usar

- **Fins educacionais**: O Bubble Sort é ideal para aprender os fundamentos de ordenação, pois sua lógica é muito intuitiva.
- **Conjuntos muito pequenos**: Quando o array tem menos de ~20 elementos, o overhead de algoritmos mais complexos pode não valer a pena.
- **Dados quase ordenados**: Com a versão otimizada (saída antecipada quando não há trocas), o Bubble Sort pode rodar em O(n) em arrays quase ordenados.

## Visualize no Pivot

Use o simulador acima para ver cada comparação e troca animada passo a passo. Experimente diferentes arrays de entrada para observar como o número de passagens muda!`,
    }
  );

  // ── Selection Sort ──
  await upsertArticle('selection-sort', algoMap['selection-sort'],
    {
      title: 'Understanding Selection Sort: Find, Select, Swap',
      seo: 'Learn how Selection Sort works by finding the minimum element and placing it in position. Complete with Big-O analysis.',
      content: `# What is Selection Sort?

Selection Sort divides the array into a sorted portion (left) and an unsorted portion (right). It repeatedly finds the **minimum element** from the unsorted portion and swaps it with the leftmost unsorted element.

## How it works

1. Set the first element as the current minimum
2. Compare the minimum with each remaining element
3. If a smaller element is found, update the minimum
4. After scanning, swap the minimum with the leftmost unsorted position
5. Move the boundary of the sorted portion one step right
6. Repeat until the entire array is sorted

## Complexity

| Case | Time | Space |
|------|------|-------|
| Best | O(n²) | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

Unlike Bubble Sort, Selection Sort always performs O(n²) comparisons regardless of the initial order. However, it performs at most O(n) swaps, making it useful when writes are expensive.

## When to use

- **Memory-constrained environments**: Selection Sort is in-place with O(1) auxiliary space.
- **When swap count matters**: It minimizes the number of swaps (exactly n-1 in the worst case).
- **Small arrays**: Reasonable performance for small datasets without the overhead of recursive algorithms.

## Visualize on Pivot

Watch the simulator highlight the current minimum in each pass and observe how the sorted boundary grows from left to right.`,
    },
    {
      title: 'Entendendo o Selection Sort: Encontrar, Selecionar, Trocar',
      seo: 'Aprenda como o Selection Sort funciona encontrando o menor elemento e posicionando-o. Completo com análise Big-O.',
      content: `# O que é o Selection Sort?

O Selection Sort divide o array em uma porção ordenada (esquerda) e uma porção não ordenada (direita). Ele repetidamente encontra o **menor elemento** da porção não ordenada e o troca com o elemento mais à esquerda da parte não ordenada.

## Como funciona

1. Defina o primeiro elemento como o mínimo atual
2. Compare o mínimo com cada elemento restante
3. Se um elemento menor for encontrado, atualize o mínimo
4. Após a varredura, troque o mínimo com a posição mais à esquerda não ordenada
5. Mova a fronteira da porção ordenada um passo para a direita
6. Repita até que todo o array esteja ordenado

## Complexidade

| Caso | Tempo | Espaço |
|------|-------|--------|
| Melhor | O(n²) | O(1) |
| Médio | O(n²) | O(1) |
| Pior | O(n²) | O(1) |

Diferente do Bubble Sort, o Selection Sort sempre faz O(n²) comparações, independentemente da ordem inicial. Porém, ele realiza no máximo O(n) trocas, sendo útil quando escritas são caras.

## Quando usar

- **Ambientes com restrição de memória**: O Selection Sort é in-place com O(1) de espaço auxiliar.
- **Quando o número de trocas importa**: Ele minimiza o número de trocas (exatamente n-1 no pior caso).
- **Arrays pequenos**: Desempenho razoável para conjuntos pequenos sem o overhead de algoritmos recursivos.

## Visualize no Pivot

Assista ao simulador destacar o mínimo atual em cada passagem e observe como a fronteira ordenada cresce da esquerda para a direita.`,
    }
  );

  // ── Insertion Sort ──
  await upsertArticle('insertion-sort', algoMap['insertion-sort'],
    {
      title: 'Understanding Insertion Sort: Building the Sorted Array',
      seo: 'Learn Insertion Sort step by step — how it builds a sorted array one element at a time. Complexity analysis included.',
      content: `# What is Insertion Sort?

Insertion Sort builds the sorted array one element at a time. It picks each element from the unsorted portion and **inserts** it into the correct position within the already-sorted portion, shifting elements as needed.

## How it works

1. Start with the second element (the first element is trivially "sorted")
2. Pick the current element as the "key"
3. Compare the key with elements to its left
4. Shift all greater elements one position to the right
5. Insert the key in its correct position
6. Repeat for all remaining elements

## Complexity

| Case | Time | Space |
|------|------|-------|
| Best | O(n) | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

The best case O(n) occurs when the array is already sorted — each element only needs one comparison.

## When to use

- **Small datasets**: Insertion Sort outperforms complex algorithms like Merge Sort on small arrays due to lower constant factors.
- **Nearly sorted data**: Runs in near-linear time on almost-sorted arrays.
- **Online sorting**: Elements can be sorted as they arrive, one at a time.
- **Hybrid algorithms**: Many optimized sorting algorithms (like Timsort, used in Python and Java) use Insertion Sort for small partitions.

## Visualize on Pivot

Watch the simulator pick each key element and slide it into position. Notice how the sorted (green) portion grows from left to right.`,
    },
    {
      title: 'Entendendo o Insertion Sort: Construindo o Array Ordenado',
      seo: 'Aprenda o Insertion Sort passo a passo — como ele constrói um array ordenado um elemento por vez. Análise de complexidade incluída.',
      content: `# O que é o Insertion Sort?

O Insertion Sort constrói o array ordenado um elemento por vez. Ele pega cada elemento da porção não ordenada e o **insere** na posição correta dentro da porção já ordenada, deslocando elementos conforme necessário.

## Como funciona

1. Comece com o segundo elemento (o primeiro é trivialmente "ordenado")
2. Pegue o elemento atual como a "chave"
3. Compare a chave com os elementos à sua esquerda
4. Desloque todos os elementos maiores uma posição para a direita
5. Insira a chave na posição correta
6. Repita para todos os elementos restantes

## Complexidade

| Caso | Tempo | Espaço |
|------|-------|--------|
| Melhor | O(n) | O(1) |
| Médio | O(n²) | O(1) |
| Pior | O(n²) | O(1) |

O melhor caso O(n) ocorre quando o array já está ordenado — cada elemento precisa de apenas uma comparação.

## Quando usar

- **Conjuntos pequenos**: O Insertion Sort supera algoritmos complexos como Merge Sort em arrays pequenos, devido a fatores constantes menores.
- **Dados quase ordenados**: Executa em tempo quase linear em arrays quase ordenados.
- **Ordenação online**: Elementos podem ser ordenados conforme chegam, um por vez.
- **Algoritmos híbridos**: Muitos algoritmos otimizados (como Timsort, usado em Python e Java) usam Insertion Sort para partições pequenas.

## Visualize no Pivot

Observe o simulador pegar cada elemento-chave e deslizá-lo para a posição correta. Note como a porção ordenada (verde) cresce da esquerda para a direita.`,
    }
  );

  // ── Merge Sort ──
  await upsertArticle('merge-sort', algoMap['merge-sort'],
    {
      title: 'Understanding Merge Sort: Divide and Conquer',
      seo: 'Master Merge Sort — the classic divide-and-conquer sorting algorithm. Step-by-step explanation with complexity analysis.',
      content: `# What is Merge Sort?

Merge Sort is an efficient, general-purpose, comparison-based sorting algorithm that uses the **divide and conquer** paradigm. It divides the array into halves, recursively sorts each half, and then merges the sorted halves back together.

## How it works

1. **Divide**: Split the array into two halves
2. **Conquer**: Recursively sort each half
3. **Merge**: Combine the two sorted halves into a single sorted array by comparing elements from each half one by one

The merge step is the key operation — it takes two sorted arrays and produces a single sorted result in O(n) time.

## Complexity

| Case | Time | Space |
|------|------|-------|
| Best | O(n log n) | O(n) |
| Average | O(n log n) | O(n) |
| Worst | O(n log n) | O(n) |

Merge Sort always runs in O(n log n), regardless of the input order. However, it requires O(n) additional space for the temporary merge arrays.

## When to use

- **Guaranteed performance**: When you need O(n log n) worst-case time (unlike Quick Sort, which can degrade to O(n²)).
- **Linked lists**: Merge Sort is particularly efficient for linked lists because the merge operation doesn't require random access.
- **Stable sorting**: Merge Sort preserves the relative order of equal elements.
- **External sorting**: Ideal for sorting data that doesn't fit in memory (e.g., sorting files on disk).

## Visualize on Pivot

Watch the recursive splitting and merging in the simulator. Notice how the array gets divided into smaller and smaller pieces before being reassembled in sorted order.`,
    },
    {
      title: 'Entendendo o Merge Sort: Dividir e Conquistar',
      seo: 'Domine o Merge Sort — o clássico algoritmo de ordenação por divisão e conquista. Explicação passo a passo com análise de complexidade.',
      content: `# O que é o Merge Sort?

O Merge Sort é um algoritmo de ordenação eficiente, de propósito geral e baseado em comparação que usa o paradigma de **dividir e conquistar**. Ele divide o array ao meio, ordena recursivamente cada metade e depois mescla as metades ordenadas de volta.

## Como funciona

1. **Dividir**: Separe o array em duas metades
2. **Conquistar**: Ordene recursivamente cada metade
3. **Mesclar**: Combine as duas metades ordenadas em um único array ordenado, comparando elementos de cada metade um por um

A etapa de mesclagem é a operação-chave — ela pega dois arrays ordenados e produz um único resultado ordenado em tempo O(n).

## Complexidade

| Caso | Tempo | Espaço |
|------|-------|--------|
| Melhor | O(n log n) | O(n) |
| Médio | O(n log n) | O(n) |
| Pior | O(n log n) | O(n) |

O Merge Sort sempre roda em O(n log n), independentemente da ordem da entrada. Porém, ele requer O(n) de espaço adicional para os arrays temporários de mesclagem.

## Quando usar

- **Desempenho garantido**: Quando você precisa de O(n log n) no pior caso (ao contrário do Quick Sort, que pode degradar para O(n²)).
- **Listas encadeadas**: O Merge Sort é particularmente eficiente para listas encadeadas porque a operação de mesclagem não requer acesso aleatório.
- **Ordenação estável**: O Merge Sort preserva a ordem relativa de elementos iguais.
- **Ordenação externa**: Ideal para ordenar dados que não cabem na memória (ex: ordenar arquivos em disco).

## Visualize no Pivot

Observe a divisão recursiva e a mesclagem no simulador. Note como o array é dividido em pedaços cada vez menores antes de ser remontado em ordem.`,
    }
  );

  // ── Quick Sort ──
  await upsertArticle('quick-sort', algoMap['quick-sort'],
    {
      title: 'Understanding Quick Sort: The Pivot Strategy',
      seo: 'Learn Quick Sort — the fastest average-case sorting algorithm. Pivot selection, partitioning, and complexity analysis.',
      content: `# What is Quick Sort?

Quick Sort is a highly efficient sorting algorithm that uses the **divide and conquer** approach. It picks a "pivot" element, partitions the array so that elements smaller than the pivot go left and elements greater go right, and then recursively sorts the partitions.

## How it works

1. **Choose a pivot**: Select an element (commonly the last, first, or median)
2. **Partition**: Rearrange elements so all values less than the pivot are on the left, and all greater are on the right
3. **Place the pivot**: Put the pivot between the two partitions (it's now in its final sorted position)
4. **Recurse**: Apply Quick Sort to the left and right partitions

## Complexity

| Case | Time | Space |
|------|------|-------|
| Best | O(n log n) | O(log n) |
| Average | O(n log n) | O(log n) |
| Worst | O(n²) | O(n) |

The worst case O(n²) happens when the pivot is always the smallest or largest element (e.g., already sorted array with last-element pivot). This can be mitigated with randomized pivot selection or median-of-three strategy.

## When to use

- **General-purpose sorting**: Quick Sort is the go-to algorithm for in-memory sorting in many standard libraries.
- **Cache-friendly**: Operates on contiguous memory, making it cache-efficient in practice.
- **In-place sorting**: Requires only O(log n) additional stack space (no auxiliary arrays).
- **Average-case performance**: Faster than Merge Sort in practice due to smaller constant factors and better cache behavior.

## Visualize on Pivot

Watch how the pivot is selected and how elements partition around it. Notice that each pivot lands in its final sorted position immediately after partitioning.`,
    },
    {
      title: 'Entendendo o Quick Sort: A Estratégia do Pivô',
      seo: 'Aprenda o Quick Sort — o algoritmo de ordenação mais rápido no caso médio. Seleção de pivô, particionamento e análise de complexidade.',
      content: `# O que é o Quick Sort?

O Quick Sort é um algoritmo de ordenação altamente eficiente que usa a abordagem de **dividir e conquistar**. Ele escolhe um elemento "pivô", particiona o array de modo que elementos menores que o pivô fiquem à esquerda e maiores à direita, e depois ordena recursivamente as partições.

## Como funciona

1. **Escolha um pivô**: Selecione um elemento (comumente o último, primeiro ou mediana)
2. **Particione**: Reorganize os elementos para que todos os valores menores que o pivô fiquem à esquerda, e os maiores à direita
3. **Posicione o pivô**: Coloque o pivô entre as duas partições (ele agora está em sua posição final ordenada)
4. **Recurse**: Aplique o Quick Sort nas partições esquerda e direita

## Complexidade

| Caso | Tempo | Espaço |
|------|-------|--------|
| Melhor | O(n log n) | O(log n) |
| Médio | O(n log n) | O(log n) |
| Pior | O(n²) | O(n) |

O pior caso O(n²) acontece quando o pivô é sempre o menor ou maior elemento (ex: array já ordenado com pivô no último elemento). Isso pode ser mitigado com seleção aleatória de pivô ou estratégia mediana-de-três.

## Quando usar

- **Ordenação de propósito geral**: O Quick Sort é o algoritmo padrão para ordenação em memória em muitas bibliotecas.
- **Cache-friendly**: Opera em memória contígua, sendo eficiente em cache na prática.
- **Ordenação in-place**: Requer apenas O(log n) de espaço adicional na pilha (sem arrays auxiliares).
- **Desempenho no caso médio**: Mais rápido que o Merge Sort na prática devido a fatores constantes menores e melhor comportamento de cache.

## Visualize no Pivot

Observe como o pivô é selecionado e como os elementos se particionam ao redor dele. Note que cada pivô fica em sua posição final ordenada imediatamente após o particionamento.`,
    }
  );

  // ── Stack ──
  await upsertArticle('stack', algoMap['stack'],
    {
      title: 'Understanding the Stack: Last-In, First-Out',
      seo: 'Learn how the Stack data structure works with LIFO semantics. Push, Pop operations explained with complexity analysis.',
      content: `# What is a Stack?

A Stack is a linear data structure that follows the **LIFO** (Last-In, First-Out) principle. The last element added is the first one to be removed — like a stack of plates where you can only add or remove from the top.

## Core Operations

- **Push**: Add an element to the top of the stack — O(1)
- **Pop**: Remove and return the top element — O(1)
- **Peek/Top**: View the top element without removing it — O(1)
- **isEmpty**: Check if the stack is empty — O(1)

## How it works

1. Elements are always added to the **top** of the stack (Push)
2. Elements are always removed from the **top** of the stack (Pop)
3. You can only access the element at the top — no random access
4. Attempting to Pop from an empty stack causes an **underflow** error

## Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Push | O(1) | O(1) |
| Pop | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Search | O(n) | O(1) |

## Real-world Applications

- **Undo/Redo**: Text editors use stacks to track actions for undo/redo functionality.
- **Function Call Stack**: Programming languages use a call stack to manage function calls and return addresses.
- **Expression Evaluation**: Compilers use stacks to evaluate arithmetic expressions and check balanced parentheses.
- **Backtracking**: Algorithms like DFS (Depth-First Search) use stacks to explore paths and backtrack.
- **Browser History**: The "back" button works like a stack of visited pages.

## Visualize on Pivot

Watch elements being pushed onto and popped from the stack in the simulator. Try the "Underflow" preset to see what happens when you pop from an empty stack!`,
    },
    {
      title: 'Entendendo a Pilha: Último a Entrar, Primeiro a Sair',
      seo: 'Aprenda como a estrutura de dados Pilha (Stack) funciona com semântica LIFO. Operações Push e Pop explicadas com análise de complexidade.',
      content: `# O que é uma Pilha (Stack)?

Uma Pilha é uma estrutura de dados linear que segue o princípio **LIFO** (Last-In, First-Out — Último a Entrar, Primeiro a Sair). O último elemento adicionado é o primeiro a ser removido — como uma pilha de pratos onde você só pode adicionar ou remover do topo.

## Operações Principais

- **Push**: Adiciona um elemento no topo da pilha — O(1)
- **Pop**: Remove e retorna o elemento do topo — O(1)
- **Peek/Top**: Visualiza o elemento do topo sem removê-lo — O(1)
- **isEmpty**: Verifica se a pilha está vazia — O(1)

## Como funciona

1. Elementos são sempre adicionados no **topo** da pilha (Push)
2. Elementos são sempre removidos do **topo** da pilha (Pop)
3. Você só pode acessar o elemento no topo — sem acesso aleatório
4. Tentar fazer Pop em uma pilha vazia causa um erro de **underflow**

## Complexidade

| Operação | Tempo | Espaço |
|----------|-------|--------|
| Push | O(1) | O(1) |
| Pop | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Busca | O(n) | O(1) |

## Aplicações no Mundo Real

- **Desfazer/Refazer**: Editores de texto usam pilhas para rastrear ações de desfazer/refazer.
- **Pilha de Chamadas**: Linguagens de programação usam uma pilha de chamadas para gerenciar chamadas de função e endereços de retorno.
- **Avaliação de Expressões**: Compiladores usam pilhas para avaliar expressões aritméticas e verificar parênteses balanceados.
- **Backtracking**: Algoritmos como DFS (Busca em Profundidade) usam pilhas para explorar caminhos e retroceder.
- **Histórico do Navegador**: O botão "voltar" funciona como uma pilha de páginas visitadas.

## Visualize no Pivot

Observe elementos sendo empilhados (push) e desempilhados (pop) no simulador. Experimente o preset "Underflow" para ver o que acontece quando você tenta pop em uma pilha vazia!`,
    }
  );

  // ── Queue ──
  await upsertArticle('queue', algoMap['queue'],
    {
      title: 'Understanding the Queue: First-In, First-Out',
      seo: 'Learn how the Queue data structure works with FIFO semantics. Enqueue, Dequeue operations explained step by step.',
      content: `# What is a Queue?

A Queue is a linear data structure that follows the **FIFO** (First-In, First-Out) principle. The first element added is the first one to be removed — like a line of people waiting: the first person in line is the first one served.

## Core Operations

- **Enqueue**: Add an element to the back (tail) of the queue — O(1)
- **Dequeue**: Remove and return the element from the front (head) — O(1)
- **Front/Peek**: View the front element without removing it — O(1)
- **isEmpty**: Check if the queue is empty — O(1)

## How it works

1. Elements enter at the **tail** (Enqueue)
2. Elements leave from the **head** (Dequeue)
3. You can only access the element at the front — no random access
4. Attempting to Dequeue from an empty queue causes an **underflow** error

## Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Enqueue | O(1) | O(1) |
| Dequeue | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Search | O(n) | O(1) |

## Real-world Applications

- **Task Scheduling**: Operating systems use queues to schedule processes (CPU scheduling, print queues).
- **BFS (Breadth-First Search)**: Graph traversal algorithms use queues to explore nodes level by level.
- **Message Queues**: Systems like RabbitMQ and Kafka use queues for asynchronous communication between services.
- **Buffer Management**: Data streaming and I/O buffers use queues to manage data flow.

## Visualize on Pivot

Watch elements being enqueued at the back and dequeued from the front in the simulator. Notice how the FIFO order is maintained throughout the simulation.`,
    },
    {
      title: 'Entendendo a Fila: Primeiro a Entrar, Primeiro a Sair',
      seo: 'Aprenda como a estrutura de dados Fila (Queue) funciona com semântica FIFO. Operações Enqueue e Dequeue explicadas passo a passo.',
      content: `# O que é uma Fila (Queue)?

Uma Fila é uma estrutura de dados linear que segue o princípio **FIFO** (First-In, First-Out — Primeiro a Entrar, Primeiro a Sair). O primeiro elemento adicionado é o primeiro a ser removido — como uma fila de pessoas esperando: a primeira pessoa da fila é a primeira atendida.

## Operações Principais

- **Enqueue**: Adiciona um elemento no final (cauda) da fila — O(1)
- **Dequeue**: Remove e retorna o elemento da frente (cabeça) — O(1)
- **Front/Peek**: Visualiza o elemento da frente sem removê-lo — O(1)
- **isEmpty**: Verifica se a fila está vazia — O(1)

## Como funciona

1. Elementos entram pela **cauda** (Enqueue)
2. Elementos saem pela **cabeça** (Dequeue)
3. Você só pode acessar o elemento da frente — sem acesso aleatório
4. Tentar fazer Dequeue em uma fila vazia causa um erro de **underflow**

## Complexidade

| Operação | Tempo | Espaço |
|----------|-------|--------|
| Enqueue | O(1) | O(1) |
| Dequeue | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Busca | O(n) | O(1) |

## Aplicações no Mundo Real

- **Escalonamento de Tarefas**: Sistemas operacionais usam filas para escalonar processos (escalonamento de CPU, filas de impressão).
- **BFS (Busca em Largura)**: Algoritmos de travessia de grafos usam filas para explorar nós nível por nível.
- **Filas de Mensagens**: Sistemas como RabbitMQ e Kafka usam filas para comunicação assíncrona entre serviços.
- **Gerenciamento de Buffer**: Streaming de dados e buffers de I/O usam filas para gerenciar o fluxo de dados.

## Visualize no Pivot

Observe elementos sendo enfileirados na parte de trás e desenfileirados da frente no simulador. Note como a ordem FIFO é mantida ao longo de toda a simulação.`,
    }
  );

  // ── Linked List ──
  await upsertArticle('linked-list', algoMap['linked-list'],
    {
      title: 'Understanding the Linked List: Nodes and Pointers',
      seo: 'Learn how Linked Lists work with nodes and pointers. Append, Prepend, Delete operations explained with complexity analysis.',
      content: `# What is a Linked List?

A Linked List is a linear data structure where elements (called **nodes**) are not stored in contiguous memory locations. Each node contains a **value** and a **pointer** (reference) to the next node in the sequence.

## Types

- **Singly Linked List**: Each node points to the next node only. The last node points to null.
- **Doubly Linked List**: Each node has pointers to both the next and previous nodes.

## Core Operations

- **Append**: Add a node at the end — O(n) for singly, O(1) with tail pointer
- **Prepend**: Add a node at the beginning — O(1)
- **Delete**: Remove a specific node — O(n) (requires traversal to find it)
- **Search**: Find a node by value — O(n)

## How it works

1. **Head** pointer tracks the first node in the list
2. Each node stores its value and a reference to the next node
3. To traverse, follow pointers from head to tail (node by node)
4. To insert/delete, update the relevant pointers — no shifting of elements needed

## Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Access by index | O(n) | O(1) |
| Prepend | O(1) | O(1) |
| Append | O(n) | O(1) |
| Delete | O(n) | O(1) |
| Search | O(n) | O(1) |

## When to use

- **Frequent insertions/deletions**: Unlike arrays, inserting or deleting at the beginning is O(1) — no shifting required.
- **Dynamic size**: No need to pre-allocate memory; the list grows and shrinks as needed.
- **Implementation building block**: Used to implement stacks, queues, hash table chaining, and adjacency lists for graphs.

## Visualize on Pivot

Watch nodes being created, linked, and removed in the simulator. See how pointers are updated when nodes are prepended, appended, or deleted.`,
    },
    {
      title: 'Entendendo a Lista Encadeada: Nós e Ponteiros',
      seo: 'Aprenda como Listas Encadeadas funcionam com nós e ponteiros. Operações de inserção e remoção explicadas com análise de complexidade.',
      content: `# O que é uma Lista Encadeada?

Uma Lista Encadeada é uma estrutura de dados linear onde os elementos (chamados **nós**) não são armazenados em posições contíguas de memória. Cada nó contém um **valor** e um **ponteiro** (referência) para o próximo nó na sequência.

## Tipos

- **Lista Simplesmente Encadeada**: Cada nó aponta apenas para o próximo. O último nó aponta para null.
- **Lista Duplamente Encadeada**: Cada nó tem ponteiros para o próximo e o anterior.

## Operações Principais

- **Append**: Adicionar um nó no final — O(n) para simples, O(1) com ponteiro de cauda
- **Prepend**: Adicionar um nó no início — O(1)
- **Delete**: Remover um nó específico — O(n) (requer travessia para encontrá-lo)
- **Search**: Encontrar um nó por valor — O(n)

## Como funciona

1. O ponteiro **Head** rastreia o primeiro nó da lista
2. Cada nó armazena seu valor e uma referência para o próximo nó
3. Para percorrer, siga os ponteiros do head ao tail (nó por nó)
4. Para inserir/deletar, atualize os ponteiros relevantes — sem deslocamento de elementos

## Complexidade

| Operação | Tempo | Espaço |
|----------|-------|--------|
| Acesso por índice | O(n) | O(1) |
| Prepend | O(1) | O(1) |
| Append | O(n) | O(1) |
| Delete | O(n) | O(1) |
| Busca | O(n) | O(1) |

## Quando usar

- **Inserções/remoções frequentes**: Diferente de arrays, inserir ou remover no início é O(1) — sem necessidade de deslocamento.
- **Tamanho dinâmico**: Sem necessidade de pré-alocar memória; a lista cresce e diminui conforme necessário.
- **Bloco de construção**: Usada para implementar pilhas, filas, encadeamento em tabelas hash e listas de adjacência para grafos.

## Visualize no Pivot

Observe nós sendo criados, conectados e removidos no simulador. Veja como os ponteiros são atualizados quando nós são adicionados ao início, final ou removidos da lista.`,
    }
  );

  // ── AVL Tree ──
  await upsertArticle('avl-tree', algoMap['avl-tree'],
    {
      title: 'Understanding the AVL Tree: Self-Balancing Binary Search',
      seo: 'Master AVL Trees — self-balancing BSTs with LL, RR, LR, RL rotations. Step-by-step explanation with complexity analysis.',
      content: `# What is an AVL Tree?

An AVL Tree (named after Adelson-Velsky and Landis) is a **self-balancing binary search tree** where the heights of the left and right subtrees of every node differ by at most **one**. When this balance property is violated after an insertion or deletion, the tree performs **rotations** to restore balance.

## Balance Factor

For each node: \`Balance Factor = Height(Left Subtree) - Height(Right Subtree)\`

A node is balanced if its balance factor is **-1, 0, or +1**.

## Rotation Types

1. **LL (Left-Left)**: Right Rotation — when a left-heavy node's left child is also left-heavy
2. **RR (Right-Right)**: Left Rotation — when a right-heavy node's right child is also right-heavy
3. **LR (Left-Right)**: Left Rotation on child, then Right Rotation on node
4. **RL (Right-Left)**: Right Rotation on child, then Left Rotation on node

## Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Search | O(log n) | O(1) |
| Insert | O(log n) | O(1) |
| Delete | O(log n) | O(1) |

Because the tree is always balanced, the height is guaranteed to be O(log n), ensuring logarithmic operations.

## When to use

- **Frequent lookups**: When you need guaranteed O(log n) search performance.
- **Databases**: B-trees (a generalization) are used in database indexing; AVL trees are used for in-memory indexes.
- **When worst-case matters**: Unlike unbalanced BSTs (which can degrade to O(n)), AVL trees guarantee O(log n).

## Visualize on Pivot

Watch the tree rebalance with rotations as you insert elements! Try the "With Rotations" preset to see LL, RR, and LR rotations triggered by specific insertion sequences.`,
    },
    {
      title: 'Entendendo a Árvore AVL: Busca Binária Auto-Balanceada',
      seo: 'Domine Árvores AVL — BSTs auto-balanceadas com rotações LL, RR, LR, RL. Explicação passo a passo com análise de complexidade.',
      content: `# O que é uma Árvore AVL?

Uma Árvore AVL (nomeada em homenagem a Adelson-Velsky e Landis) é uma **árvore binária de busca auto-balanceada** onde as alturas das subárvores esquerda e direita de cada nó diferem em no máximo **um**. Quando essa propriedade de balanceamento é violada após uma inserção ou remoção, a árvore realiza **rotações** para restaurar o equilíbrio.

## Fator de Balanceamento

Para cada nó: \`Fator de Balanceamento = Altura(Subárvore Esquerda) - Altura(Subárvore Direita)\`

Um nó está balanceado se seu fator de balanceamento é **-1, 0 ou +1**.

## Tipos de Rotação

1. **LL (Esquerda-Esquerda)**: Rotação à Direita — quando um nó pesado à esquerda tem filho esquerdo também pesado à esquerda
2. **RR (Direita-Direita)**: Rotação à Esquerda — quando um nó pesado à direita tem filho direito também pesado à direita
3. **LR (Esquerda-Direita)**: Rotação à Esquerda no filho, depois Rotação à Direita no nó
4. **RL (Direita-Esquerda)**: Rotação à Direita no filho, depois Rotação à Esquerda no nó

## Complexidade

| Operação | Tempo | Espaço |
|----------|-------|--------|
| Busca | O(log n) | O(1) |
| Inserção | O(log n) | O(1) |
| Remoção | O(log n) | O(1) |

Como a árvore está sempre balanceada, a altura é garantidamente O(log n), assegurando operações logarítmicas.

## Quando usar

- **Buscas frequentes**: Quando você precisa de desempenho garantido de O(log n) para buscas.
- **Bancos de dados**: B-trees (uma generalização) são usadas em indexação de bancos de dados; árvores AVL são usadas para índices em memória.
- **Quando o pior caso importa**: Diferente de BSTs desbalanceadas (que podem degradar para O(n)), árvores AVL garantem O(log n).

## Visualize no Pivot

Observe a árvore se rebalancear com rotações conforme você insere elementos! Experimente o preset "Com Rotações" para ver rotações LL, RR e LR disparadas por sequências específicas de inserção.`,
    }
  );

  // ── Priority Queue ──
  await upsertArticle('priority-queue', algoMap['priority-queue'],
    {
      title: 'Understanding the Priority Queue: Heaps in Action',
      seo: 'Learn how Priority Queues work using Max-Heaps. Insert, Extract-Max operations explained with step-by-step visualization.',
      content: `# What is a Priority Queue?

A Priority Queue is an abstract data type where each element has a **priority** associated with it. Elements with higher priority are served before elements with lower priority. It is commonly implemented using a **binary heap**.

## Max-Heap Implementation

In a Max-Heap:
- The parent node is always **greater than or equal to** its children
- The root always contains the **maximum** element
- The tree is a **complete binary tree** (all levels filled except possibly the last, which is filled from left to right)

## Core Operations

- **Insert (Push)**: Add an element and "bubble up" to maintain heap property — O(log n)
- **Extract-Max (Pop)**: Remove the root (maximum), replace with the last element, and "sift down" — O(log n)
- **Peek**: View the maximum element without removing it — O(1)

## How it works

### Insert
1. Add the new element at the end of the array (last position in the tree)
2. Compare with its parent — if greater, swap
3. Continue swapping upward ("bubble up") until heap property is satisfied

### Extract-Max
1. Remove the root element (the maximum)
2. Move the last element to the root position
3. Compare with children — swap with the larger child if needed
4. Continue swapping downward ("sift down") until heap property is restored

## Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Insert | O(log n) | O(1) |
| Extract-Max | O(log n) | O(1) |
| Peek | O(1) | O(1) |
| Build Heap | O(n) | O(1) |

## Real-world Applications

- **Task Scheduling**: OS schedulers use priority queues to manage processes by priority.
- **Dijkstra's Algorithm**: Uses a min-priority queue to find the shortest path in graphs.
- **Huffman Coding**: Data compression algorithms use priority queues to build optimal prefix codes.
- **Event-Driven Simulation**: Events are processed in order of their scheduled time.

## Visualize on Pivot

Watch elements bubble up after insertion and sift down after extraction in the simulator. Notice how the tree maintains its complete shape and heap ordering at every step.`,
    },
    {
      title: 'Entendendo a Fila de Prioridade: Heaps em Ação',
      seo: 'Aprenda como Filas de Prioridade funcionam usando Max-Heaps. Operações de inserção e extração explicadas com visualização passo a passo.',
      content: `# O que é uma Fila de Prioridade?

Uma Fila de Prioridade é um tipo de dado abstrato onde cada elemento tem uma **prioridade** associada. Elementos com maior prioridade são atendidos antes de elementos com menor prioridade. É comumente implementada usando um **heap binário**.

## Implementação com Max-Heap

Em um Max-Heap:
- O nó pai é sempre **maior ou igual** aos seus filhos
- A raiz sempre contém o **maior** elemento
- A árvore é uma **árvore binária completa** (todos os níveis preenchidos, exceto possivelmente o último, que é preenchido da esquerda para a direita)

## Operações Principais

- **Insert (Push)**: Adiciona um elemento e "sobe" para manter a propriedade do heap — O(log n)
- **Extract-Max (Pop)**: Remove a raiz (máximo), substitui pelo último elemento e "desce" — O(log n)
- **Peek**: Visualiza o elemento máximo sem removê-lo — O(1)

## Como funciona

### Inserção
1. Adicione o novo elemento no final do array (última posição na árvore)
2. Compare com o pai — se for maior, troque
3. Continue trocando para cima ("bubble up") até que a propriedade do heap seja satisfeita

### Extração do Máximo
1. Remova o elemento raiz (o máximo)
2. Mova o último elemento para a posição da raiz
3. Compare com os filhos — troque com o filho maior se necessário
4. Continue trocando para baixo ("sift down") até que a propriedade do heap seja restaurada

## Complexidade

| Operação | Tempo | Espaço |
|----------|-------|--------|
| Inserção | O(log n) | O(1) |
| Extração | O(log n) | O(1) |
| Peek | O(1) | O(1) |
| Construir Heap | O(n) | O(1) |

## Aplicações no Mundo Real

- **Escalonamento de Tarefas**: Escalonadores de SO usam filas de prioridade para gerenciar processos por prioridade.
- **Algoritmo de Dijkstra**: Usa uma fila de prioridade mínima para encontrar o caminho mais curto em grafos.
- **Codificação de Huffman**: Algoritmos de compressão de dados usam filas de prioridade para construir códigos de prefixo ótimos.
- **Simulação Orientada a Eventos**: Eventos são processados na ordem de seu tempo agendado.

## Visualize no Pivot

Observe elementos subindo após inserção e descendo após extração no simulador. Note como a árvore mantém sua forma completa e a ordenação do heap em cada passo.`,
    }
  );

  console.log('✅ Seeding finished successfully.');
  console.log('   Categories: sorting, linear-structures, trees');
  console.log('   Algorithms: bubble-sort, selection-sort, insertion-sort, merge-sort, quick-sort, stack, queue, linked-list, avl-tree, priority-queue');
  console.log('   Articles: Complete content for all 10 algorithms (en + pt-BR)');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
