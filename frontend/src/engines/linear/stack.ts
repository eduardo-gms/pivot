import { SimulationStep, StackData, StackOperation } from '../types';


/**
 * Generates SimulationStep[] for Stack (LIFO) operations.
 * Takes a sequence of push/pop operations and creates snapshots for each.
 */
export function generateStackSteps(operations: StackOperation[]): SimulationStep[] {
  let stepCounter = 0;

  const makeId = () => `stack-${++stepCounter}`;
  const stack: number[] = [];
  const steps: SimulationStep[] = [];

  const snapshot = (
    highlighted: string[],
    descriptionKey: string,
    vars?: Record<string, any>,
  ) => {
    const data: StackData = { type: 'stack', values: [...stack] };
    steps.push({
      id: makeId(),
      data,
      activePointers: { top: stack.length - 1 },
      highlightedElements: highlighted,
      descriptionKey,
      descriptionVariables: vars,
    });
  };

  // Initial empty state
  snapshot([], 'stack_initial');

  for (const op of operations) {
    if (op.action === 'push' && op.value !== undefined) {
      stack.push(op.value);
      snapshot(
        [(stack.length - 1).toString()],
        'stack_push',
        { value: op.value, size: stack.length },
      );
    } else if (op.action === 'pop') {
      if (stack.length === 0) {
        snapshot([], 'stack_underflow');
        continue;
      }
      const popped = stack.pop()!;
      snapshot(
        [],
        'stack_pop',
        { value: popped, size: stack.length },
      );
    }
  }

  snapshot([], 'stack_final', { size: stack.length });

  return steps;
}
