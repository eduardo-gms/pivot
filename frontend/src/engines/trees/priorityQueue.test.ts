import { describe, it, expect } from 'vitest';
import { generatePriorityQueueSteps } from './priorityQueue';

describe('Priority Queue (Max-Heap) Engine', () => {
  it('should generate steps for insert operations', () => {
    const ops = [
      { action: 'insert' as const, value: 10 },
      { action: 'insert' as const, value: 20 },
      { action: 'insert' as const, value: 5 },
    ];
    const steps = generatePriorityQueueSteps(ops);

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].descriptionKey).toBe('pq_initial');
    expect(steps[steps.length - 1].descriptionKey).toBe('pq_done');
  });

  it('should heapify up when inserting larger values', () => {
    const ops = [
      { action: 'insert' as const, value: 10 },
      { action: 'insert' as const, value: 20 },
    ];
    const steps = generatePriorityQueueSteps(ops);
    const hasSwap = steps.some((s) => s.descriptionKey === 'pq_swap');
    expect(hasSwap).toBe(true);
  });

  it('should extract the maximum value', () => {
    const ops = [
      { action: 'insert' as const, value: 10 },
      { action: 'insert' as const, value: 30 },
      { action: 'insert' as const, value: 20 },
      { action: 'extract' as const },
    ];
    const steps = generatePriorityQueueSteps(ops);

    const hasExtracting = steps.some((s) => s.descriptionKey === 'pq_extracting');
    const hasExtracted = steps.some((s) => s.descriptionKey === 'pq_extracted');
    expect(hasExtracting).toBe(true);
    expect(hasExtracted).toBe(true);

    // The extracted value should be 30 (the max)
    const extractedStep = steps.find(
      (s) => s.descriptionKey === 'pq_extracting'
    );
    expect(extractedStep?.descriptionVariables?.value).toBe(30);
  });

  it('should generate unique IDs', () => {
    const ops = [
      { action: 'insert' as const, value: 5 },
      { action: 'insert' as const, value: 10 },
    ];
    const steps = generatePriorityQueueSteps(ops);
    const ids = steps.map((s) => s.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('should not leak stepCounter between calls', () => {
    const ops = [{ action: 'insert' as const, value: 10 }];
    const steps1 = generatePriorityQueueSteps(ops);
    const steps2 = generatePriorityQueueSteps(ops);
    expect(steps1[0].id).toBe(steps2[0].id);
  });
});
