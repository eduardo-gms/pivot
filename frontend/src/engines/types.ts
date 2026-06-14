// ───────────────────────────────────────────────────────────────
// Core types for the simulation engine
// These types follow the Glossary (GLOSSARY.md) ubiquitous language
// ───────────────────────────────────────────────────────────────

/** Supported visual data structures */
export type DataType = 'array' | 'stack' | 'queue' | 'linked-list' | 'tree';

/** Numeric array data (used by sorting algorithms) */
export interface ArrayData {
  type: 'array';
  values: { id: string; value: number }[];
}

/** Stack data (LIFO) */
export interface StackData {
  type: 'stack';
  values: number[];
}

/** Queue data (FIFO) */
export interface QueueData {
  type: 'queue';
  values: number[];
}

/** Node in a linked list */
export interface LinkedListNode {
  id: string;
  value: number;
  nextId: string | null;
  prevId: string | null; // null for singly linked lists
}

/** Linked list data */
export interface LinkedListData {
  type: 'linked-list';
  nodes: LinkedListNode[];
  headId: string | null;
  tailId: string | null;
}

/** Node in a tree */
export interface TreeNode {
  id: string;
  value: number;
  leftId: string | null;
  rightId: string | null;
  balanceFactor?: number;
}

/** Tree data */
export interface TreeData {
  type: 'tree';
  nodes: TreeNode[];
  rootId: string | null;
}

/** Union of all possible data shapes */
export type SimulationData =
  | ArrayData
  | StackData
  | QueueData
  | LinkedListData
  | TreeData;

/**
 * A single frame (Snapshot) of the simulation.
 * The algorithm engine generates an array of these; the Zustand store plays them.
 */
export interface SimulationStep {
  id: string;
  data: SimulationData;
  activePointers: Record<string, string | number>;
  highlightedElements: string[];
  descriptionKey: string;
  descriptionVariables?: Record<string, any>;
}

/** Operations for Stack engine */
export interface StackOperation {
  action: 'push' | 'pop';
  value?: number;
}

/** Operations for Queue engine */
export interface QueueOperation {
  action: 'enqueue' | 'dequeue';
  value?: number;
}

/** Operations for Linked List engine */
export interface LinkedListOperation {
  action: 'append' | 'prepend' | 'delete';
  value?: number;
}

/** Operations for Tree engine */
export interface TreeOperation {
  action: 'insert' | 'extract';
  value?: number;
}

/** Union for strongly typed default inputs */
export type EngineDefaultInput =
  | { type: 'array'; data: number[] }
  | { type: 'stack'; data: StackOperation[] }
  | { type: 'queue'; data: QueueOperation[] }
  | { type: 'linked-list'; data: LinkedListOperation[] }
  | { type: 'tree'; data: TreeOperation[] };

/** Signature for any algorithm engine function that works on arrays */
export type SortingEngineFunction = (input: number[]) => SimulationStep[];

/** UI Metadata for an engine */
export interface EngineUI {
  catLabel: string;
  colorVar: string;
  icon: 'BarChart3' | 'GitBranch' | 'Network' | 'Layers' | 'Code2';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

/** Registry entry for an engine */
export interface EngineEntry {
  slug: string;
  dataType: DataType;
  ui: EngineUI;
  generate: (input: any) => SimulationStep[];
}
