import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Category: Sorting
  const sortingCategory = await prisma.category.upsert({
    where: { slug: 'sorting' },
    update: {},
    create: {
      slug: 'sorting',
      translations: {
        create: [
          { locale: 'en', name: 'Sorting Algorithms', description: 'Algorithms for ordering data.' },
          { locale: 'pt-BR', name: 'Algoritmos de Ordenação', description: 'Algoritmos focados em organizar coleções de dados.' }
        ]
      }
    }
  });

  // 2. Create Algorithm: Bubble Sort
  const bubbleSort = await prisma.algorithm.upsert({
    where: { slug: 'bubble-sort' },
    update: {},
    create: {
      slug: 'bubble-sort',
      categoryId: sortingCategory.id,
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1)',
      translations: {
        create: [
          { locale: 'en', name: 'Bubble Sort', shortDescription: 'A simple sorting algorithm.' },
          { locale: 'pt-BR', name: 'Bubble Sort', shortDescription: 'Um algoritmo simples de ordenação.' }
        ]
      }
    }
  });

  // 3. Create Article for Bubble Sort
  await prisma.article.upsert({
    where: { slug: 'understanding-bubble-sort' },
    update: {},
    create: {
      slug: 'understanding-bubble-sort',
      algorithmId: bubbleSort.id,
      isPublished: true,
      translations: {
        create: [
          { locale: 'en', title: 'Understanding Bubble Sort step by step', content: '# What is Bubble Sort?\n\nBubble sort is...', seoDescription: 'A complete guide about bubble sort.' },
          { locale: 'pt-BR', title: 'Entendendo o Bubble Sort passo a passo', content: '# O que é o Bubble Sort?\n\nO Bubble sort é...', seoDescription: 'Um guia completo sobre bubble sort.' }
        ]
      }
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
