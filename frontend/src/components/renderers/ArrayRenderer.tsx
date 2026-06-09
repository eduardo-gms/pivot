import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ArrayData } from '../../engines/types';

interface Props {
  data: ArrayData;
  highlightedElements: string[];
  width: number;
  height: number;
}

export function ArrayRenderer({ data, highlightedElements, width, height }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.values.length) return;

    const svg = d3.select(svgRef.current);
    const values = data.values;
    const maxVal = d3.max(values, (d) => d.value) || 100;
    const padding = { top: 40, right: 30, bottom: 40, left: 30 };

    const xScale = d3
      .scaleBand<number>()
      .domain(values.map((_, i) => i))
      .range([padding.left, width - padding.right])
      .padding(0.15);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxVal * 1.15])
      .range([height - padding.bottom, padding.top]);

    // ── Bars ──
    const bars = svg.selectAll<SVGRectElement, { id: string; value: number }>('rect.bar').data(values, (d) => d.id);

    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('rx', 6)
      .attr('ry', 6)
      .merge(bars)
      .transition()
      .duration(300)
      .attr('x', (_, i) => xScale(i)!)
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - padding.bottom - yScale(d.value))
      .attr('fill', (_, i) =>
        highlightedElements.includes(i.toString()) ? '#ef4444' : '#6366f1',
      )
      .attr('stroke', (_, i) =>
        highlightedElements.includes(i.toString())
          ? '#fbbf24'
          : 'rgba(255,255,255,0.1)',
      )
      .attr('stroke-width', (_, i) =>
        highlightedElements.includes(i.toString()) ? 3 : 1,
      )
      .attr('stroke-dasharray', (_, i) =>
        highlightedElements.includes(i.toString()) ? '6,3' : 'none',
      );

    bars.exit().remove();

    // ── Labels ──
    const labels = svg.selectAll<SVGTextElement, { id: string; value: number }>('text.label').data(values, (d) => d.id);

    labels
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .attr('fill', '#f1f5f9')
      .attr('font-weight', '700')
      .attr('font-size', '14px')
      .merge(labels)
      .transition()
      .duration(300)
      .attr('x', (_, i) => xScale(i)! + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.value) - 8)
      .text((d) => d.value);

    labels.exit().remove();

    // ── Index labels ──
    // Index labels are static for the grid positions
    const indices = svg.selectAll<SVGTextElement, number>('text.index').data(values.map((_, i) => i));

    indices
      .enter()
      .append('text')
      .attr('class', 'index')
      .attr('text-anchor', 'middle')
      .attr('fill', '#64748b')
      .attr('font-size', '11px')
      .merge(indices)
      .attr('x', (_, i) => xScale(i)! + xScale.bandwidth() / 2)
      .attr('y', height - padding.bottom + 20)
      .text((_, i) => i);

    indices.exit().remove();
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
