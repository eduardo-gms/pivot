import { SimulationStep, ArrayData } from '../types';

let stepCounter = 0;
const makeId = () => `selection-${++stepCounter}`;

/**
 * Generates SimulationStep[] for the Selection Sort algorithm.
 * Finds the minimum in the unsorted portion and swaps it to the front.
 */
export function generateSelectionSortSteps(input: number[]): SimulationStep[] {
  stepCounter = 0;
  const arr = input.map((value, index) => ({ id: `val-${value}-${index}`, value }));
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

  snapshot([], 'selection_sort_initial', {}, { array: arr.map(x => x.value).join(', ') });

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < arr.length; j++) {
      // Comparing current min with j
      snapshot(
        [minIdx.toString(), j.toString()],
        'selection_sort_compare',
        { i, minIdx, j },
        { currentMin: arr[minIdx].value, candidate: arr[j].value },
      );

      if (arr[j].value < arr[minIdx].value) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      // Swap min to position i
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      snapshot(
        [i.toString(), minIdx.toString()],
        'selection_sort_swap',
        { i, minIdx },
        { val1: arr[i].value, val2: arr[minIdx].value },
      );
    }

    // Position i is now sorted
    snapshot(
      [i.toString()],
      'selection_sort_placed',
      { i },
      { value: arr[i].value, position: i },
    );
  }

  snapshot(
    arr.map((_, i) => i.toString()),
    'selection_sort_done',
  );

  return steps;
}
