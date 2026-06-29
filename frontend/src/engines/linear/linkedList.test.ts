import { describe, it, expect } from 'vitest';
import { generateLinkedListSteps } from './linkedList';

describe('Linked List Engine', () => {
  it('should generate steps for append operations', () => {
    const ops = [
      { action: 'append' as const, value: 10 },
      { action: 'append' as const, value: 20 },
    ];
    const steps = generateLinkedListSteps(ops);

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].descriptionKey).toBe('ll_initial');
    expect(steps[steps.length - 1].descriptionKey).toBe('ll_done');
  });

  it('should handle prepend operations', () => {
    const ops = [
      { action: 'append' as const, value: 10 },
      { action: 'prepend' as const, value: 5 },
    ];
    const steps = generateLinkedListSteps(ops);
    const hasPrepend = steps.some((s) => s.descriptionKey === 'll_prepend');
    expect(hasPrepend).toBe(true);
  });

  it('should handle delete operations', () => {
    const ops = [
      { action: 'append' as const, value: 10 },
      { action: 'append' as const, value: 20 },
      { action: 'delete' as const, value: 10 },
    ];
    const steps = generateLinkedListSteps(ops);

    const hasDeleteFound = steps.some((s) => s.descriptionKey === 'll_delete_found');
    const hasDelete = steps.some((s) => s.descriptionKey === 'll_delete');
    expect(hasDeleteFound).toBe(true);
    expect(hasDelete).toBe(true);

    // After deleting 10, only node with value 20 should remain
    const finalStep = steps[steps.length - 1];
    if (finalStep.data.type === 'linked-list') {
      expect(finalStep.data.nodes.length).toBe(1);
      expect(finalStep.data.nodes[0].value).toBe(20);
    }
  });

  it('should generate unique IDs', () => {
    const ops = [
      { action: 'append' as const, value: 5 },
      { action: 'append' as const, value: 10 },
    ];
    const steps = generateLinkedListSteps(ops);
    const ids = steps.map((s) => s.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('should not leak stepCounter between calls', () => {
    const ops = [{ action: 'append' as const, value: 1 }];
    const steps1 = generateLinkedListSteps(ops);
    const steps2 = generateLinkedListSteps(ops);
    expect(steps1[0].id).toBe(steps2[0].id);
  });
});
