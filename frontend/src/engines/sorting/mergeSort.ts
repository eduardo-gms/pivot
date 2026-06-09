import { SimulationStep, ArrayData } from '../types';

let stepCounter = 0;
const makeId = () => `merge-${++stepCounter}`;

/**
 * Generates SimulationStep[] for the Merge Sort algorithm.
 * Uses a flat array representation: the full array is always shown,
 * with highlighted subarrays to indicate the current merge window.
 */
export function generateMergeSortSteps(input: number[]): SimulationStep[] {
  stepCounter = 0;
  const arr = input.map((value, index) => ({ id: `val-${value}-${index}`, value }));
  const steps: SimulationStep[] = [];

  const snapshot = (
    values: { id: string; value: number }[],
    highlighted: string[],
    descriptionKey: string,
    pointers: Record<string, number> = {},
    vars?: Record<string, any>,
  ) => {
    const data: ArrayData = { type: 'array', values: [...values] };
    steps.push({
      id: makeId(),
      data,
      activePointers: pointers,
      highlightedElements: highlighted,
      descriptionKey,
      descriptionVariables: vars,
    });
  };

  snapshot(arr, [], 'merge_sort_initial', {}, { array: arr.map(x => x.value).join(', ') });

  function mergeSort(lo: number, hi: number) {
    if (lo >= hi) return;

    const mid = Math.floor((lo + hi) / 2);

    // Show the split
    const leftIndices = Array.from({ length: mid - lo + 1 }, (_, k) => (lo + k).toString());
    const rightIndices = Array.from({ length: hi - mid }, (_, k) => (mid + 1 + k).toString());

    snapshot(
      arr,
      [...leftIndices, ...rightIndices],
      'merge_sort_split',
      { lo, mid, hi },
      { lo, mid, hi },
    );

    mergeSort(lo, mid);
    mergeSort(mid + 1, hi);

    // Merge phase
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;

    while (i < left.length && j < right.length) {
      snapshot(
        arr,
        [k.toString()],
        'merge_sort_compare',
        { left: lo + i, right: mid + 1 + j, target: k },
        { val1: left[i].value, val2: right[j].value },
      );

      if (left[i].value <= right[j].value) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      j++;
      k++;
    }

    // Show merged subarray
    const mergedIndices = Array.from({ length: hi - lo + 1 }, (_, idx) => (lo + idx).toString());
    snapshot(
      arr,
      mergedIndices,
      'merge_sort_merged',
      { lo, hi },
      { subarray: arr.slice(lo, hi + 1).map(x => x.value).join(', ') },
    );
  }

  mergeSort(0, arr.length - 1);

  snapshot(
    arr,
    arr.map((_, i) => i.toString()),
    'merge_sort_done',
  );

  return steps;
}
