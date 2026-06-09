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

    // Base platform (static)
    let platform = svg.select<SVGLineElement>('line.platform');
    if (platform.empty()) {
      platform = svg.append('line').attr('class', 'platform');
    }
    platform
      .attr('x1', centerX - blockWidth / 2 - 10)
      .attr('y1', baseY)
      .attr('x2', centerX + blockWidth / 2 + 10)
      .attr('y2', baseY)
      .attr('stroke', '#475569')
      .attr('stroke-width', 3);

    // Empty state text
    let emptyText = svg.select<SVGTextElement>('text.empty-state');
    if (emptyText.empty()) {
      emptyText = svg.append('text').attr('class', 'empty-state');
    }
    emptyText
      .attr('x', centerX)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#64748b')
      .attr('font-size', '14px')
      .text('Empty Stack')
      .style('opacity', values.length === 0 ? 1 : 0);

    // "TOP" label
    let topLabel = svg.select<SVGTextElement>('text.top-label');
    if (topLabel.empty()) {
      topLabel = svg.append('text').attr('class', 'top-label');
    }
    const topY = baseY - values.length * blockHeight;
    topLabel
      .attr('x', centerX + blockWidth / 2 + 20)
      .attr('font-size', '12px')
      .attr('font-weight', '700')
      .text('← TOP')
      .transition()
      .duration(300)
      .attr('y', topY + blockHeight / 2 + 4)
      .style('opacity', values.length > 0 ? 1 : 0)
      .attr('fill', '#fbbf24');

    // --- General Update Pattern for Stack Blocks ---
    const blocksGroup = svg.select('g.blocks');
    if (blocksGroup.empty()) {
      svg.append('g').attr('class', 'blocks');
    }

    const blocks = svg
      .select('g.blocks')
      .selectAll<SVGGElement, number>('g.stack-block')
      .data(values, (_, i) => i); // Using index as key is safe for stacks (push/pop at end)

    const blocksEnter = blocks
      .enter()
      .append('g')
      .attr('class', 'stack-block')
      .attr('transform', (_, i) => `translate(0, ${baseY - (i + 1) * blockHeight - 30})`)
      .style('opacity', 0);

    blocksEnter
      .append('rect')
      .attr('x', centerX - blockWidth / 2)
      .attr('width', blockWidth)
      .attr('height', blockHeight - 4)
      .attr('rx', 8);

    blocksEnter
      .append('text')
      .attr('x', centerX)
      .attr('text-anchor', 'middle')
      .attr('font-weight', '700')
      .attr('font-size', '16px');

    const blocksUpdate = blocksEnter.merge(blocks);

    blocksUpdate
      .transition()
      .duration(300)
      .attr('transform', (_, i) => `translate(0, ${baseY - (i + 1) * blockHeight})`)
      .style('opacity', 1);

    blocksUpdate.select('rect')
      .transition()
      .duration(300)
      .attr('y', 2)
      .attr('fill', (_, i) => (highlightedElements.includes(i.toString()) ? '#ef4444' : i === values.length - 1 ? '#6366f1' : '#334155'))
      .attr('stroke', (_, i) => (highlightedElements.includes(i.toString()) ? '#fbbf24' : 'rgba(255,255,255,0.15)'))
      .attr('stroke-width', (_, i) => (highlightedElements.includes(i.toString()) ? 3 : 1))
      .attr('stroke-dasharray', (_, i) => (highlightedElements.includes(i.toString()) ? '6,3' : 'none'));

    blocksUpdate.select('text')
      .attr('y', blockHeight / 2 + 5)
      .attr('fill', '#f1f5f9')
      .text((d) => d);

    blocks
      .exit()
      .transition()
      .duration(300)
      .attr('transform', (_, i) => `translate(0, ${baseY - (i + 1) * blockHeight - 30})`)
      .style('opacity', 0)
      .remove();
  }, [data, highlightedElements, width, height]);

  return <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible' }} />;
}
