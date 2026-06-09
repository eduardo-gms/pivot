import { useRef } from 'react';
import { TreeData } from '../../engines/types';

interface Props {
  data: TreeData;
  highlightedElements: string[];
  width: number;
  height: number;
}

/**
 * TreeRenderer — placeholder for AVL Tree visualization (Épico 4).
 * Will use d3.tree() layout for hierarchical node positioning.
 */
export function TreeRenderer({ data, width, height }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible' }}>
      <text
        x={width / 2}
        y={height / 2}
        textAnchor="middle"
        fill="#64748b"
        fontSize="14px"
      >
        🌳 Tree visualization coming soon (Épico 4)
        {data.nodes.length > 0 && ` — ${data.nodes.length} nodes`}
      </text>
    </svg>
  );
}
