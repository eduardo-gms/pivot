import { EngineEntry } from './types';
import { generateBubbleSortSteps } from './sorting/bubbleSort';
import { generateSelectionSortSteps } from './sorting/selectionSort';
import { generateInsertionSortSteps } from './sorting/insertionSort';
import { generateMergeSortSteps } from './sorting/mergeSort';
import { generateQuickSortSteps } from './sorting/quickSort';
import { generateStackSteps } from './linear/stack';
import { generateQueueSteps } from './linear/queue';
import { generateAVLTreeSteps } from './trees/avlTree';

/**
 * Central registry mapping algorithm slugs to their engine generators.
 * Used by AlgorithmView to load the correct engine based on the URL slug.
 */
export const engineRegistry: Record<string, EngineEntry> = {
  'bubble-sort': {
    slug: 'bubble-sort',
    dataType: 'array',
    generate: (input: number[]) => generateBubbleSortSteps(input),
  },
  'selection-sort': {
    slug: 'selection-sort',
    dataType: 'array',
    generate: (input: number[]) => generateSelectionSortSteps(input),
  },
  'insertion-sort': {
    slug: 'insertion-sort',
    dataType: 'array',
    generate: (input: number[]) => generateInsertionSortSteps(input),
  },
  'merge-sort': {
    slug: 'merge-sort',
    dataType: 'array',
    generate: (input: number[]) => generateMergeSortSteps(input),
  },
  'quick-sort': {
    slug: 'quick-sort',
    dataType: 'array',
    generate: (input: number[]) => generateQuickSortSteps(input),
  },
  'stack': {
    slug: 'stack',
    dataType: 'stack',
    generate: (ops) => generateStackSteps(ops),
  },
  'queue': {
    slug: 'queue',
    dataType: 'queue',
    generate: (ops) => generateQueueSteps(ops),
  },
  'avl-tree': {
    slug: 'avl-tree',
    dataType: 'tree',
    generate: (ops) => generateAVLTreeSteps(ops),
  },
};

/** Helper to get default sample input for an engine */
export function getDefaultInput(slug: string): any {
  const entry = engineRegistry[slug];
  if (!entry) return null;

  switch (entry.dataType) {
    case 'array':
      return [38, 27, 43, 3, 9, 82, 10];
    case 'stack':
      return [
        { action: 'push', value: 10 },
        { action: 'push', value: 25 },
        { action: 'push', value: 7 },
        { action: 'pop' },
        { action: 'push', value: 42 },
        { action: 'pop' },
        { action: 'pop' },
      ];
    case 'queue':
      return [
        { action: 'enqueue', value: 10 },
        { action: 'enqueue', value: 25 },
        { action: 'enqueue', value: 7 },
        { action: 'dequeue' },
        { action: 'enqueue', value: 42 },
        { action: 'dequeue' },
      ];
    case 'tree':
      return [
        { action: 'insert', value: 43 },
        { action: 'insert', value: 18 },
        { action: 'insert', value: 22 }, // Triggers LR rotation
        { action: 'insert', value: 9 },
        { action: 'insert', value: 21 },
        { action: 'insert', value: 6 },  // Triggers LL rotation
        { action: 'insert', value: 8 },  // Triggers LR rotation
      ];
    default:
      return null;
  }
}

// Re-export types for convenience
export type { SimulationStep, EngineEntry } from './types';
export type { DataType, SimulationData, ArrayData, StackData, QueueData, TreeData } from './types';
