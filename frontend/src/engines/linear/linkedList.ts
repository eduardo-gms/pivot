import { SimulationStep, LinkedListData, LinkedListNode, LinkedListOperation } from '../types';


export function generateLinkedListSteps(operations: LinkedListOperation[]): SimulationStep[] {
  let stepCounter = 0;

  const makeId = () => `ll-${++stepCounter}`;
  const steps: SimulationStep[] = [];
  const nodes: LinkedListNode[] = [];
  let headId: string | null = null;
  let tailId: string | null = null;
  let nodeIdCounter = 0;

  const snapshot = (
    highlighted: string[],
    descriptionKey: string,
    pointers: Record<string, string | number> = {},
    vars?: Record<string, any>,
  ) => {
    // Deep copy nodes to avoid mutation references in history
    const data: LinkedListData = {
      type: 'linked-list',
      nodes: nodes.map((n) => ({ ...n })),
      headId,
      tailId,
    };

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
  snapshot([], 'll_initial', {});

  for (const op of operations) {
    if (op.action === 'append' && op.value !== undefined) {
      const newNodeId = `node-${++nodeIdCounter}`;
      const newNode: LinkedListNode = {
        id: newNodeId,
        value: op.value,
        nextId: null,
        prevId: tailId,
      };

      if (!headId) {
        headId = newNodeId;
      }

      if (tailId) {
        const tailNode = nodes.find((n) => n.id === tailId);
        if (tailNode) tailNode.nextId = newNodeId;
      }

      nodes.push(newNode);
      tailId = newNodeId;

      snapshot([newNodeId], 'll_append', { tail: tailId }, { value: op.value });
    } else if (op.action === 'prepend' && op.value !== undefined) {
      const newNodeId = `node-${++nodeIdCounter}`;
      const newNode: LinkedListNode = {
        id: newNodeId,
        value: op.value,
        nextId: headId,
        prevId: null,
      };

      if (headId) {
        const headNode = nodes.find((n) => n.id === headId);
        if (headNode) headNode.prevId = newNodeId;
      }

      if (!tailId) {
        tailId = newNodeId;
      }

      nodes.unshift(newNode);
      headId = newNodeId;

      snapshot([newNodeId], 'll_prepend', { head: headId }, { value: op.value });
    } else if (op.action === 'delete') {
      if (headId) {
        const targetValue = op.value !== undefined ? op.value : nodes[0].value;
        const targetIndex = nodes.findIndex((n) => n.value === targetValue);
        
        if (targetIndex !== -1) {
          const targetNode = nodes[targetIndex];
          
          snapshot([targetNode.id], 'll_delete_found', {}, { value: targetNode.value });

          if (targetNode.prevId) {
            const prev = nodes.find((n) => n.id === targetNode.prevId);
            if (prev) prev.nextId = targetNode.nextId;
          } else {
            headId = targetNode.nextId;
          }

          if (targetNode.nextId) {
            const next = nodes.find((n) => n.id === targetNode.nextId);
            if (next) next.prevId = targetNode.prevId;
          } else {
            tailId = targetNode.prevId;
          }

          nodes.splice(targetIndex, 1);
          snapshot([], 'll_delete', {}, { value: targetNode.value });
        }
      }
    }
  }

  snapshot([], 'll_done');
  return steps;
}
