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
  // 5. ARTICLES
  // ──────────────────────────────────────────────────
  await prisma.article.upsert({
    where: { slug: 'understanding-bubble-sort' },
    update: {},
    create: {
      slug: 'understanding-bubble-sort',
      algorithmId: bubbleSort.id,
      isPublished: true,
      translations: {
        create: [
          {
            locale: 'en',
            title: 'Understanding Bubble Sort Step by Step',
            content: '# What is Bubble Sort?\n\nBubble Sort is one of the simplest sorting algorithms. It repeatedly walks through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.\n\n## How it works\n\n1. Start from the first element\n2. Compare the current element with the next one\n3. If the current element is greater, swap them\n4. Move to the next pair and repeat\n5. After each full pass, the largest unsorted element "bubbles" to its correct position\n\n## Complexity\n\n| Case | Time | Space |\n|------|------|-------|\n| Best | O(n) | O(1) |\n| Average | O(n²) | O(1) |\n| Worst | O(n²) | O(1) |\n\nThe best case O(n) occurs when the array is already sorted and we use an optimization flag to detect no swaps.',
            seoDescription: 'A complete guide to understanding Bubble Sort algorithm with step-by-step visual explanation and Big-O complexity analysis.',
          },
          {
            locale: 'pt-BR',
            title: 'Entendendo o Bubble Sort Passo a Passo',
            content: '# O que é o Bubble Sort?\n\nO Bubble Sort é um dos algoritmos de ordenação mais simples. Ele percorre repetidamente a lista, compara elementos adjacentes e os troca se estiverem na ordem errada. A passagem pela lista é repetida até que a lista esteja ordenada.\n\n## Como funciona\n\n1. Comece pelo primeiro elemento\n2. Compare o elemento atual com o próximo\n3. Se o elemento atual for maior, troque-os\n4. Mova para o próximo par e repita\n5. Após cada passagem completa, o maior elemento não ordenado "flutua" para sua posição correta\n\n## Complexidade\n\n| Caso | Tempo | Espaço |\n|------|-------|--------|\n| Melhor | O(n) | O(1) |\n| Médio | O(n²) | O(1) |\n| Pior | O(n²) | O(1) |\n\nO melhor caso O(n) ocorre quando o array já está ordenado e usamos uma flag de otimização para detectar que não houve trocas.',
            seoDescription: 'Um guia completo para entender o algoritmo Bubble Sort com explicação visual passo a passo e análise de complexidade Big-O.',
          },
        ],
      },
    },
  });

  console.log('✅ Seeding finished successfully.');
  console.log('   Categories: sorting, linear-structures, trees');
  console.log('   Algorithms: bubble-sort, selection-sort, insertion-sort, merge-sort, quick-sort, stack, queue, linked-list, avl-tree, priority-queue');
  console.log('   Articles: understanding-bubble-sort');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
