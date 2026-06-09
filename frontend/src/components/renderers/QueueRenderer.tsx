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

    // Arrow marker definition (static)
    let defs = svg.select<SVGDefsElement>('defs');
    if (defs.empty()) {
      defs = svg.append('defs');
      defs
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
    }

    // Empty state text
    let emptyText = svg.select<SVGTextElement>('text.empty-state');
    if (emptyText.empty()) {
      emptyText = svg.append('text').attr('class', 'empty-state');
    }
    emptyText
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#64748b')
      .attr('font-size', '14px')
      .text('Empty Queue')
      .style('opacity', values.length === 0 ? 1 : 0);

    // --- General Update Pattern ---
    let blocksGroup = svg.select<SVGGElement>('g.blocks');
    if (blocksGroup.empty()) {
      blocksGroup = svg.append('g').attr('class', 'blocks');
    }

    const blocks = blocksGroup
      .selectAll<SVGGElement, number>('g.queue-block')
      .data(values, (_, i) => i); // Using index as key per instructions

    const blocksEnter = blocks
      .enter()
      .append('g')
      .attr('class', 'queue-block')
      .attr('transform', (_, i) => `translate(${startX + i * (blockWidth + gap) + 30}, 0)`)
      .style('opacity', 0);

    // Block Rect
    blocksEnter
      .append('rect')
      .attr('y', centerY - blockHeight / 2)
      .attr('width', blockWidth)
      .attr('height', blockHeight)
      .attr('rx', 8);

    // Value Text
    blocksEnter
      .append('text')
      .attr('class', 'value')
      .attr('y', centerY + 5)
      .attr('text-anchor', 'middle')
      .attr('font-weight', '700')
      .attr('font-size', '16px');

    // Arrow to next (except last)
    blocksEnter
      .append('line')
      .attr('class', 'arrow')
      .attr('y1', centerY)
      .attr('y2', centerY)
      .attr('stroke', '#64748b')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    // Head Label
    blocksEnter
      .append('text')
      .attr('class', 'head-label')
      .attr('y', centerY - blockHeight / 2 - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#10b981')
      .attr('font-size', '11px')
      .attr('font-weight', '700')
      .text('HEAD');

    // Tail Label
    blocksEnter
      .append('text')
      .attr('class', 'tail-label')
      .attr('y', centerY - blockHeight / 2 - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f59e0b')
      .attr('font-size', '11px')
      .attr('font-weight', '700')
      .text('TAIL');

    const blocksUpdate = blocksEnter.merge(blocks);

    blocksUpdate
      .transition()
      .duration(300)
      .attr('transform', (_, i) => `translate(${startX + i * (blockWidth + gap)}, 0)`)
      .style('opacity', 1);

    blocksUpdate.select('rect')
      .transition()
      .duration(300)
      .attr('fill', (_, i) => (highlightedElements.includes(i.toString()) ? '#ef4444' : '#334155'))
      .attr('stroke', (_, i) => (highlightedElements.includes(i.toString()) ? '#fbbf24' : 'rgba(255,255,255,0.15)'))
      .attr('stroke-width', (_, i) => (highlightedElements.includes(i.toString()) ? 3 : 1))
      .attr('stroke-dasharray', (_, i) => (highlightedElements.includes(i.toString()) ? '6,3' : 'none'));

    blocksUpdate.select('text.value')
      .attr('x', blockWidth / 2)
      .attr('fill', '#f1f5f9')
      .text((d) => d);

    blocksUpdate.select('line.arrow')
      .attr('x1', blockWidth + 2)
      .attr('x2', blockWidth + gap - 4)
      .style('display', (_, i) => (i < values.length - 1 ? 'block' : 'none'));

    blocksUpdate.select('text.head-label')
      .attr('x', blockWidth / 2)
      .style('display', (_, i) => (i === 0 ? 'block' : 'none'));

    blocksUpdate.select('text.tail-label')
      .attr('x', blockWidth / 2)
      .style('display', (_, i) => (i === values.length - 1 ? 'block' : 'none'));

    blocks
      .exit()
      .transition()
      .duration(300)
      .attr('transform', (_, i) => `translate(${startX + i * (blockWidth + gap) - 30}, 0)`)
      .style('opacity', 0)
      .remove();
  }, [data, highlightedElements, width, height]);

  return <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible' }} />;
}
