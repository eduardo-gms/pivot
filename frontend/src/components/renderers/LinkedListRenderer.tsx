import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LinkedListData } from '../../engines/types';

interface Props {
  data: LinkedListData;
  highlightedElements: string[];
  width: number;
  height: number;
}

export function LinkedListRenderer({ data, highlightedElements, width, height }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const svg = d3.select(svgRef.current);
    const nodes = data.nodes;
    
    // Clear previous elements
    svg.selectAll('*').remove();

    // Define arrowhead marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 28) // Adjust to edge of node
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#94a3b8')
      .style('stroke','none');

    const nodeWidth = 60;
    const nodeHeight = 40;
    const spacing = 40;
    
    // Calculate total width to center the list
    const totalWidth = nodes.length * nodeWidth + (nodes.length - 1) * spacing;
    const startX = Math.max((width - totalWidth) / 2, 40);
    const startY = height / 2;

    // Position calculation
    const positions = new Map<string, { x: number; y: number }>();
    
    // Ordered traversal to determine X positions
    let currId = data.headId;
    let i = 0;
    while(currId) {
      positions.set(currId, {
        x: startX + i * (nodeWidth + spacing),
        y: startY
      });
      const node = nodes.find(n => n.id === currId);
      if (!node) break;
      currId = node.nextId;
      i++;
    }

    // Links
    const links = nodes.filter(n => n.nextId).map(n => {
      const source = positions.get(n.id)!;
      const target = positions.get(n.nextId!)!;
      return { source, target };
    });

    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => d.source.x + nodeWidth / 2)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x - nodeWidth / 2)
      .attr('y2', d => d.target.y)
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)');

    // Nodes
    const nodeGroups = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        const pos = positions.get(d.id) || { x: 0, y: 0 };
        return `translate(${pos.x}, ${pos.y})`;
      });

    nodeGroups.append('rect')
      .attr('x', -nodeWidth / 2)
      .attr('y', -nodeHeight / 2)
      .attr('width', nodeWidth)
      .attr('height', nodeHeight)
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('fill', d => highlightedElements.includes(d.id) ? '#ef4444' : '#6366f1')
      .attr('stroke', d => highlightedElements.includes(d.id) ? '#fbbf24' : 'rgba(255,255,255,0.1)')
      .attr('stroke-width', d => highlightedElements.includes(d.id) ? 3 : 1);

    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', '#f1f5f9')
      .attr('font-weight', '700')
      .attr('font-size', '14px')
      .text(d => d.value);

    // Head/Tail labels
    nodeGroups.append('text')
      .attr('y', nodeHeight / 2 + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', '#64748b')
      .attr('font-size', '11px')
      .text(d => {
        let label = [];
        if (d.id === data.headId) label.push('Head');
        if (d.id === data.tailId) label.push('Tail');
        return label.join(' / ');
      });

  }, [data, highlightedElements, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
    />
  );
}
