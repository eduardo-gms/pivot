import { SimulationStep, ArrayData } from '../types';

let stepCounter = 0;
const makeId = () => `bubble-${++stepCounter}`;

/**
 * Generates SimulationStep[] for the Bubble Sort algorithm.
 * Each comparison and swap produces a snapshot.
 */
export function generateBubbleSortSteps(input: number[]): SimulationStep[] {
  stepCounter = 0;
  const arr = [...input];
  const steps: SimulationStep[] = [];

  const snapshot = (
    highlighted: string[],
    descriptionKey: string,
    pointers: Record<string, number> = {},
    vars?: Record<string, any>,
  ) => {
    const data: ArrayData = { type: 'array', values: [...arr] };
    steps.push({
      id: makeId(),
      data,
      activePointers: pointers,
      highlightedElements: highlighted,
      descriptionKey,
      descriptionVariables: vars,
    });
  };

  // Initial state
  snapshot([], 'bubble_sort_initial', {}, { array: arr.join(', ') });

  for (let pass = 0; pass < arr.length - 1; pass++) {
    let hasSwapped = false;

    for (let j = 0; j < arr.length - 1 - pass; j++) {
      // Comparing step
      snapshot(
        [j.toString(), (j + 1).toString()],
        'bubble_sort_compare',
        { i: j, j: j + 1 },
        { val1: arr[j], val2: arr[j + 1] },
      );

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        hasSwapped = true;

        snapshot(
          [j.toString(), (j + 1).toString()],
          'bubble_sort_swap',
          { i: j, j: j + 1 },
          { val1: arr[j], val2: arr[j + 1] },
        );
      }
    }

    // End of pass — last element is sorted
    snapshot(
      [(arr.length - 1 - pass).toString()],
      'bubble_sort_pass_end',
      { pass: pass + 1 },
      { pass: pass + 1 },
    );

    if (!hasSwapped) {
      break; // Optimization: already sorted
    }
  }

  // Final sorted state
  snapshot(
    arr.map((_, i) => i.toString()),
    'bubble_sort_done',
  );

  return steps;
}
