import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { StackData } from '../../engines/types';

interface Props {
  data: StackData;
  highlightedElements: string[];
  width: number;
  height: number;
}

export function StackRenderer({ data, highlightedElements, width, height }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const values = data.values;
    const blockHeight = 44;
    const blockWidth = Math.min(200, width * 0.4);
    const centerX = width / 2;
    const baseY = height - 50;

    // Clear previous
    svg.selectAll('*').remove();

    // Base platform
    svg
      .append('line')
      .attr('x1', centerX - blockWidth / 2 - 10)
      .attr('y1', baseY)
      .attr('x2', centerX + blockWidth / 2 + 10)
      .attr('y2', baseY)
      .attr('stroke', '#475569')
      .attr('stroke-width', 3);

    // "TOP" label
    if (values.length > 0) {
      const topY = baseY - values.length * blockHeight;
      svg
        .append('text')
        .attr('x', centerX + blockWidth / 2 + 20)
        .attr('y', topY + blockHeight / 2 + 4)
        .attr('fill', '#fbbf24')
        .attr('font-size', '12px')
        .attr('font-weight', '700')
        .text('← TOP');
    }

    // Stack blocks (bottom-up)
    values.forEach((value, i) => {
      const y = baseY - (i + 1) * blockHeight;
      const isHighlighted = highlightedElements.includes(i.toString());
      const isTop = i === values.length - 1;

      // Block
      svg
        .append('rect')
        .attr('x', centerX - blockWidth / 2)
        .attr('y', y + 2)
        .attr('width', blockWidth)
        .attr('height', blockHeight - 4)
        .attr('rx', 8)
        .attr('fill', isHighlighted ? '#ef4444' : isTop ? '#6366f1' : '#334155')
        .attr('stroke', isHighlighted ? '#fbbf24' : 'rgba(255,255,255,0.15)')
        .attr('stroke-width', isHighlighted ? 3 : 1)
        .attr('stroke-dasharray', isHighlighted ? '6,3' : 'none');

      // Value label
      svg
        .append('text')
        .attr('x', centerX)
        .attr('y', y + blockHeight / 2 + 5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#f1f5f9')
        .attr('font-weight', '700')
        .attr('font-size', '16px')
        .text(value);
    });

    // Empty state
    if (values.length === 0) {
      svg
        .append('text')
        .attr('x', centerX)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#64748b')
        .attr('font-size', '14px')
        .text('Empty Stack');
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
