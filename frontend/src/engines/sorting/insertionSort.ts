import { SimulationStep, ArrayData } from '../types';

let stepCounter = 0;
const makeId = () => `insertion-${++stepCounter}`;

/**
 * Generates SimulationStep[] for the Insertion Sort algorithm.
 * Builds a sorted sub-array one element at a time.
 */
export function generateInsertionSortSteps(input: number[]): SimulationStep[] {
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

  snapshot([], 'insertion_sort_initial', {}, { array: arr.join(', ') });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];

    snapshot(
      [i.toString()],
      'insertion_sort_pick',
      { i },
      { key, position: i },
    );

    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      // Shift element right
      snapshot(
        [j.toString(), (j + 1).toString()],
        'insertion_sort_shift',
        { i, j },
        { shifted: arr[j], key },
      );

      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;

    snapshot(
      [(j + 1).toString()],
      'insertion_sort_insert',
      { insertedAt: j + 1 },
      { key, position: j + 1 },
    );
  }

  snapshot(
    arr.map((_, i) => i.toString()),
    'insertion_sort_done',
  );

  return steps;
}
