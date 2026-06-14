import { EngineEntry, EngineDefaultInput } from './types';
import { generateBubbleSortSteps } from './sorting/bubbleSort';
import { generateSelectionSortSteps } from './sorting/selectionSort';
import { generateInsertionSortSteps } from './sorting/insertionSort';
import { generateMergeSortSteps } from './sorting/mergeSort';
import { generateQuickSortSteps } from './sorting/quickSort';
import { generateStackSteps } from './linear/stack';
import { generateQueueSteps } from './linear/queue';
import { generateLinkedListSteps } from './linear/linkedList';
import { generatePriorityQueueSteps } from './trees/priorityQueue';
import { generateAVLTreeSteps } from './trees/avlTree';

/**
 * Central registry mapping algorithm slugs to their engine generators.
 * Used by AlgorithmView to load the correct engine based on the URL slug.
 */
export const engineRegistry: Record<string, EngineEntry> = {
  'bubble-sort': {
    slug: 'bubble-sort',
    dataType: 'array',
    ui: { catLabel: 'Sorting', colorVar: 'var(--accent-sorting)', icon: 'BarChart3', difficulty: 'Easy' },
    generate: (input: number[]) => generateBubbleSortSteps(input),
  },
  'selection-sort': {
    slug: 'selection-sort',
    dataType: 'array',
    ui: { catLabel: 'Sorting', colorVar: 'var(--accent-sorting)', icon: 'BarChart3', difficulty: 'Easy' },
    generate: (input: number[]) => generateSelectionSortSteps(input),
  },
  'insertion-sort': {
    slug: 'insertion-sort',
    dataType: 'array',
    ui: { catLabel: 'Sorting', colorVar: 'var(--accent-sorting)', icon: 'BarChart3', difficulty: 'Easy' },
    generate: (input: number[]) => generateInsertionSortSteps(input),
  },
  'merge-sort': {
    slug: 'merge-sort',
    dataType: 'array',
    ui: { catLabel: 'Sorting', colorVar: 'var(--accent-sorting)', icon: 'BarChart3', difficulty: 'Medium' },
    generate: (input: number[]) => generateMergeSortSteps(input),
  },
  'quick-sort': {
    slug: 'quick-sort',
    dataType: 'array',
    ui: { catLabel: 'Sorting', colorVar: 'var(--accent-sorting)', icon: 'BarChart3', difficulty: 'Medium' },
    generate: (input: number[]) => generateQuickSortSteps(input),
  },
  'stack': {
    slug: 'stack',
    dataType: 'stack',
    ui: { catLabel: 'Linear', colorVar: 'var(--accent-sorting)', icon: 'Layers', difficulty: 'Easy' },
    generate: (ops) => generateStackSteps(ops),
  },
  'queue': {
    slug: 'queue',
    dataType: 'queue',
    ui: { catLabel: 'Linear', colorVar: 'var(--accent-sorting)', icon: 'Layers', difficulty: 'Easy' },
    generate: (ops) => generateQueueSteps(ops),
  },
  'linked-list': {
    slug: 'linked-list',
    dataType: 'linked-list',
    ui: { catLabel: 'Linear', colorVar: 'var(--accent-sorting)', icon: 'Layers', difficulty: 'Easy' },
    generate: (ops) => generateLinkedListSteps(ops),
  },
  'priority-queue': {
    slug: 'priority-queue',
    dataType: 'tree',
    ui: { catLabel: 'Trees', colorVar: 'var(--accent-trees)', icon: 'GitBranch', difficulty: 'Easy' },
    generate: (ops) => generatePriorityQueueSteps(ops),
  },
  'avl-tree': {
    slug: 'avl-tree',
    dataType: 'tree',
    ui: { catLabel: 'Trees', colorVar: 'var(--accent-trees)', icon: 'GitBranch', difficulty: 'Hard' },
    generate: (ops) => generateAVLTreeSteps(ops),
  },
};

/** Helper to get default sample input for an engine */
export function getDefaultInput(slug: string): EngineDefaultInput | null {
  const entry = engineRegistry[slug];
  if (!entry) return null;

  switch (entry.dataType) {
    case 'array':
      return { type: 'array', data: [38, 27, 43, 3, 9, 82, 10] };
    case 'stack':
      return { type: 'stack', data: [
        { action: 'push', value: 10 },
        { action: 'push', value: 25 },
        { action: 'push', value: 7 },
        { action: 'pop' },
        { action: 'push', value: 42 },
        { action: 'pop' },
        { action: 'pop' },
      ] };
    case 'queue':
      return { type: 'queue', data: [
        { action: 'enqueue', value: 10 },
        { action: 'enqueue', value: 25 },
        { action: 'enqueue', value: 7 },
        { action: 'dequeue' },
        { action: 'enqueue', value: 42 },
        { action: 'dequeue' },
      ] };
    case 'linked-list':
      return { type: 'linked-list', data: [
        { action: 'append', value: 10 },
        { action: 'append', value: 20 },
        { action: 'prepend', value: 5 },
        { action: 'delete', value: 20 },
        { action: 'append', value: 30 }
      ] };
    case 'tree':
      if (slug === 'priority-queue') {
        return { type: 'tree', data: [
          { action: 'insert', value: 45 },
          { action: 'insert', value: 20 },
          { action: 'insert', value: 14 },
          { action: 'insert', value: 12 },
          { action: 'insert', value: 31 },
          { action: 'insert', value: 7 },
          { action: 'insert', value: 11 },
          { action: 'insert', value: 13 },
          { action: 'insert', value: 7 },
          { action: 'extract' },
          { action: 'extract' },
        ] };
      }
      return { type: 'tree', data: [
        { action: 'insert', value: 43 },
        { action: 'insert', value: 18 },
        { action: 'insert', value: 22 }, // Triggers LR rotation
        { action: 'insert', value: 9 },
        { action: 'insert', value: 21 },
        { action: 'insert', value: 6 },  // Triggers LL rotation
        { action: 'insert', value: 8 },  // Triggers LR rotation
      ] };
    default:
      return null;
  }
}

// Re-export types for convenience
export type { SimulationStep, EngineEntry, EngineDefaultInput } from './types';
export type { DataType, SimulationData, ArrayData, StackData, QueueData, LinkedListData, TreeData } from './types';
