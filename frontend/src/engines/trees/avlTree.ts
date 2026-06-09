import { SimulationStep, TreeData, TreeNode, TreeOperation } from '../types';

let stepCounter = 0;
const makeId = () => `avl-${++stepCounter}`;

class Node {
  id: string;
  value: number;
  left: Node | null = null;
  right: Node | null = null;
  height: number = 1;

  constructor(value: number) {
    this.value = value;
    this.id = `node-${value}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export function generateAVLTreeSteps(operations: TreeOperation[]): SimulationStep[] {
  stepCounter = 0;
  let root: Node | null = null;
  const steps: SimulationStep[] = [];

  const getHeight = (n: Node | null) => (n ? n.height : 0);
  const getBalance = (n: Node | null) => (n ? getHeight(n.left) - getHeight(n.right) : 0);
  const updateHeight = (n: Node) => {
    n.height = Math.max(getHeight(n.left), getHeight(n.right)) + 1;
  };

  const serializeTree = (node: Node | null): { nodes: TreeNode[]; rootId: string | null } => {
    if (!node) return { nodes: [], rootId: null };
    const nodes: TreeNode[] = [];
    const queue: Node[] = [node];
    while (queue.length > 0) {
      const current = queue.shift()!;
      nodes.push({
        id: current.id,
        value: current.value,
        leftId: current.left ? current.left.id : null,
        rightId: current.right ? current.right.id : null,
        balanceFactor: getBalance(current),
      });
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return { nodes, rootId: node.id };
  };

  const snapshot = (
    highlighted: string[],
    descriptionKey: string,
    vars?: Record<string, any>
  ) => {
    const { nodes, rootId } = serializeTree(root);
    const data: TreeData = { type: 'tree', nodes, rootId };
    steps.push({
      id: makeId(),
      data,
      activePointers: {},
      highlightedElements: highlighted,
      descriptionKey,
      descriptionVariables: vars,
    });
  };

  snapshot([], 'avl_initial');

  const rightRotate = (y: Node): Node => {
    snapshot([y.id], 'avl_rotate_right', { value: y.value });
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    updateHeight(y);
    updateHeight(x);
    return x;
  };

  const leftRotate = (x: Node): Node => {
    snapshot([x.id], 'avl_rotate_left', { value: x.value });
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    updateHeight(x);
    updateHeight(y);
    return y;
  };

  const insert = (node: Node | null, value: number): Node => {
    if (!node) {
      return new Node(value);
    }

    if (value < node.value) {
      node.left = insert(node.left, value);
    } else if (value > node.value) {
      node.right = insert(node.right, value);
    } else {
      return node; // Duplicates not allowed
    }

    updateHeight(node);
    const balance = getBalance(node);

    // Left Left
    if (balance > 1 && value < node.left!.value) {
      snapshot([node.id], 'avl_balance');
      return rightRotate(node);
    }
    // Right Right
    if (balance < -1 && value > node.right!.value) {
      snapshot([node.id], 'avl_balance');
      return leftRotate(node);
    }
    // Left Right
    if (balance > 1 && value > node.left!.value) {
      snapshot([node.id], 'avl_balance');
      node.left = leftRotate(node.left!);
      return rightRotate(node);
    }
    // Right Left
    if (balance < -1 && value < node.right!.value) {
      snapshot([node.id], 'avl_balance');
      node.right = rightRotate(node.right!);
      return leftRotate(node);
    }

    return node;
  };

  for (const op of operations) {
    if (op.action === 'insert') {
      snapshot([], 'avl_insert', { value: op.value });
      root = insert(root, op.value);
      snapshot([], 'avl_balance'); // Final state after this insertion
    }
  }

  snapshot([], 'avl_done');

  return steps;
}
