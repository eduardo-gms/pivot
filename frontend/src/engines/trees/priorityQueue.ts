import { SimulationStep, TreeData, TreeNode, TreeOperation } from '../types';


export function generatePriorityQueueSteps(operations: TreeOperation[]): SimulationStep[] {
  let stepCounter = 0;

  const makeId = () => `pq-${++stepCounter}`;
  const steps: SimulationStep[] = [];
  const heap: number[] = [];

  const getTreeData = (): TreeData => {
    const nodes: TreeNode[] = heap.map((value, i) => {
      const leftIdx = 2 * i + 1;
      const rightIdx = 2 * i + 2;
      return {
        id: `node-${i}`,
        value,
        leftId: leftIdx < heap.length ? `node-${leftIdx}` : null,
        rightId: rightIdx < heap.length ? `node-${rightIdx}` : null,
      };
    });
    return {
      type: 'tree',
      nodes,
      rootId: heap.length > 0 ? 'node-0' : null,
    };
  };

  const snapshot = (
    highlighted: string[],
    descriptionKey: string,
    pointers: Record<string, string | number> = {},
    vars?: Record<string, any>,
  ) => {
    steps.push({
      id: makeId(),
      data: getTreeData(),
      activePointers: pointers,
      highlightedElements: highlighted,
      descriptionKey,
      descriptionVariables: vars,
    });
  };

  snapshot([], 'pq_initial');

  for (const op of operations) {
    if (op.action === 'insert' && op.value !== undefined) {
      heap.push(op.value);
      let curr = heap.length - 1;
      snapshot([`node-${curr}`], 'pq_insert', { index: curr }, { value: op.value });

      // Heapify up (Max-Heap)
      while (curr > 0) {
        const parent = Math.floor((curr - 1) / 2);
        snapshot([`node-${curr}`, `node-${parent}`], 'pq_compare', { curr, parent }, { childValue: heap[curr], parentValue: heap[parent] });
        
        if (heap[curr] > heap[parent]) {
          [heap[curr], heap[parent]] = [heap[parent], heap[curr]];
          snapshot([`node-${curr}`, `node-${parent}`], 'pq_swap', { curr, parent });
          curr = parent;
        } else {
          break;
        }
      }
      snapshot([`node-${curr}`], 'pq_inserted', {}, { value: op.value });
    } else if (op.action === 'extract' && heap.length > 0) {
      const maxVal = heap[0];
      snapshot([`node-0`], 'pq_extracting', {}, { value: maxVal });

      if (heap.length === 1) {
        heap.pop();
        snapshot([], 'pq_extracted', {}, { value: maxVal });
        continue;
      }

      heap[0] = heap.pop()!;
      let curr = 0;
      snapshot([`node-0`], 'pq_replaced_root');

      // Heapify down
      while (true) {
        const left = 2 * curr + 1;
        const right = 2 * curr + 2;
        let largest = curr;

        if (left < heap.length) {
          snapshot([`node-${curr}`, `node-${left}`], 'pq_compare', { curr, left }, { parentValue: heap[curr], childValue: heap[left] });
          if (heap[left] > heap[largest]) {
            largest = left;
          }
        }

        if (right < heap.length) {
          snapshot([`node-${largest}`, `node-${right}`], 'pq_compare', { largest, right }, { parentValue: heap[largest], childValue: heap[right] });
          if (heap[right] > heap[largest]) {
            largest = right;
          }
        }

        if (largest !== curr) {
          [heap[curr], heap[largest]] = [heap[largest], heap[curr]];
          snapshot([`node-${curr}`, `node-${largest}`], 'pq_swap', { curr, largest });
          curr = largest;
        } else {
          break;
        }
      }

      snapshot([], 'pq_extracted', {}, { value: maxVal });
    }
  }

  snapshot([], 'pq_done');
  return steps;
}
