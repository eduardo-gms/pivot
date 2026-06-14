import { describe, it, expect } from 'vitest';
import { generateAVLTreeSteps } from './avlTree';

describe('AVL Tree Engine', () => {
  it('should balance on left-left case', () => {
    // Inserting 3, 2, 1 should trigger LL rotation (right rotate on 3)
    const operations = [
      { action: 'insert' as const, value: 3 },
      { action: 'insert' as const, value: 2 },
      { action: 'insert' as const, value: 1 }
    ];
    
    const steps = generateAVLTreeSteps(operations);
    expect(steps.length).toBeGreaterThan(0);
    
    // Find rotation step
    const hasRotation = steps.some(s => s.descriptionKey === 'avl_rotate_right');
    expect(hasRotation).toBe(true);
    
    const finalStep = steps[steps.length - 1];
    expect(finalStep.descriptionKey).toBe('avl_done');
  });

  it('should not leak stepCounter between calls', () => {
    const ops = [{ action: 'insert' as const, value: 10 }];
    const steps1 = generateAVLTreeSteps(ops);
    const steps2 = generateAVLTreeSteps(ops);
    expect(steps1[0].id).toBe(steps2[0].id);
  });
});
