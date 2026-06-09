import { SimulationStep, QueueData, QueueOperation } from '../types';

let stepCounter = 0;
const makeId = () => `queue-${++stepCounter}`;

/**
 * Generates SimulationStep[] for Queue (FIFO) operations.
 * Takes a sequence of enqueue/dequeue operations.
 */
export function generateQueueSteps(operations: QueueOperation[]): SimulationStep[] {
  stepCounter = 0;
  const queue: number[] = [];
  const steps: SimulationStep[] = [];

  const snapshot = (
    highlighted: string[],
    descriptionKey: string,
    vars?: Record<string, any>,
  ) => {
    const data: QueueData = { type: 'queue', values: [...queue] };
    steps.push({
      id: makeId(),
      data,
      activePointers: {
        head: 0,
        tail: Math.max(0, queue.length - 1),
      },
      highlightedElements: highlighted,
      descriptionKey,
      descriptionVariables: vars,
    });
  };

  // Initial empty state
  snapshot([], 'queue_initial');

  for (const op of operations) {
    if (op.action === 'enqueue' && op.value !== undefined) {
      queue.push(op.value);
      snapshot(
        [(queue.length - 1).toString()],
        'queue_enqueue',
        { value: op.value, size: queue.length },
      );
    } else if (op.action === 'dequeue') {
      if (queue.length === 0) {
        snapshot([], 'queue_underflow');
        continue;
      }
      const dequeued = queue.shift()!;
      snapshot(
        [],
        'queue_dequeue',
        { value: dequeued, size: queue.length },
      );
    }
  }

  snapshot([], 'queue_final', { size: queue.length });

  return steps;
}
