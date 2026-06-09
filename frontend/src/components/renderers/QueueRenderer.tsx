import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { QueueData } from '../../engines/types';

interface Props {
  data: QueueData;
  highlightedElements: string[];
  width: number;
  height: number;
}

export function QueueRenderer({ data, highlightedElements, width, height }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const values = data.values;
    const blockWidth = 70;
    const blockHeight = 50;
    const centerY = height / 2;
    const gap = 12;
    const totalWidth = values.length * (blockWidth + gap) - gap;
    const startX = (width - totalWidth) / 2;

    // Clear previous
    svg.selectAll('*').remove();

    // Queue blocks (left = front, right = back)
    values.forEach((value, i) => {
      const x = startX + i * (blockWidth + gap);
      const isHighlighted = highlightedElements.includes(i.toString());
      const isHead = i === 0;
      const isTail = i === values.length - 1;

      // Block
      svg
        .append('rect')
        .attr('x', x)
        .attr('y', centerY - blockHeight / 2)
        .attr('width', blockWidth)
        .attr('height', blockHeight)
        .attr('rx', 8)
        .attr('fill', isHighlighted ? '#ef4444' : '#334155')
        .attr('stroke', isHighlighted ? '#fbbf24' : 'rgba(255,255,255,0.15)')
        .attr('stroke-width', isHighlighted ? 3 : 1)
        .attr('stroke-dasharray', isHighlighted ? '6,3' : 'none');

      // Value
      svg
        .append('text')
        .attr('x', x + blockWidth / 2)
        .attr('y', centerY + 5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#f1f5f9')
        .attr('font-weight', '700')
        .attr('font-size', '16px')
        .text(value);

      // Arrow to next
      if (i < values.length - 1) {
        const arrowX = x + blockWidth + 2;
        svg
          .append('line')
          .attr('x1', arrowX)
          .attr('y1', centerY)
          .attr('x2', arrowX + gap - 4)
          .attr('y2', centerY)
          .attr('stroke', '#64748b')
          .attr('stroke-width', 2)
          .attr('marker-end', 'url(#arrow)');
      }

      // Head / Tail labels
      if (isHead) {
        svg
          .append('text')
          .attr('x', x + blockWidth / 2)
          .attr('y', centerY - blockHeight / 2 - 10)
          .attr('text-anchor', 'middle')
          .attr('fill', '#10b981')
          .attr('font-size', '11px')
          .attr('font-weight', '700')
          .text('HEAD');
      }
      if (isTail) {
        svg
          .append('text')
          .attr('x', x + blockWidth / 2)
          .attr('y', centerY - blockHeight / 2 - 10)
          .attr('text-anchor', 'middle')
          .attr('fill', '#f59e0b')
          .attr('font-size', '11px')
          .attr('font-weight', '700')
          .text('TAIL');
      }
    });

    // Arrow marker definition
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 9)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z')
      .attr('fill', '#64748b');

    // Empty state
    if (values.length === 0) {
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#64748b')
        .attr('font-size', '14px')
        .text('Empty Queue');
    }
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
