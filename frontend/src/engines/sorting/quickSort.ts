import { SimulationStep, ArrayData } from '../types';

let stepCounter = 0;
const makeId = () => `quick-${++stepCounter}`;

/**
 * Generates SimulationStep[] for the Quick Sort algorithm.
 * Uses Lomuto partition scheme with last element as pivot.
 */
export function generateQuickSortSteps(input: number[]): SimulationStep[] {
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

  snapshot([], 'quick_sort_initial', {}, { array: arr.join(', ') });

  function partition(lo: number, hi: number): number {
    const pivot = arr[hi];

    snapshot(
      [hi.toString()],
      'quick_sort_pivot',
      { pivot: hi, lo, hi },
      { pivotValue: pivot },
    );

    let i = lo - 1;

    for (let j = lo; j < hi; j++) {
      // Compare element with pivot
      snapshot(
        [j.toString(), hi.toString()],
        'quick_sort_compare',
        { i: i + 1, j, pivot: hi },
        { element: arr[j], pivotValue: pivot },
      );

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          snapshot(
            [i.toString(), j.toString()],
            'quick_sort_swap',
            { i, j, pivot: hi },
            { val1: arr[i], val2: arr[j] },
          );
        }
      }
    }

    // Place pivot in correct position
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    snapshot(
      [(i + 1).toString()],
      'quick_sort_pivot_placed',
      { pivotFinal: i + 1 },
      { pivotValue: pivot, position: i + 1 },
    );

    return i + 1;
  }

  function quickSort(lo: number, hi: number) {
    if (lo >= hi) return;

    const pivotIdx = partition(lo, hi);
    quickSort(lo, pivotIdx - 1);
    quickSort(pivotIdx + 1, hi);
  }

  quickSort(0, arr.length - 1);

  snapshot(
    arr.map((_, i) => i.toString()),
    'quick_sort_done',
  );

  return steps;
}
