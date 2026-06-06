import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSimulationStore } from '../store/useSimulationStore';

export function D3Renderer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { steps, currentStepIndex } = useSimulationStore();

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize SVG if it doesn't exist
    if (!svgRef.current) {
      svgRef.current = d3.select(containerRef.current)
        .append('svg')
        .attr('width', '100%')
        .attr('height', 400)
        .style('background', '#ffffff')
        .style('border', '1px solid #e0e0e0')
        .style('border-radius', '8px')
        .style('box-shadow', '0 4px 6px -1px rgb(0 0 0 / 0.1)')
        .node();
    }
  }, []);

  useEffect(() => {
    if (!svgRef.current || steps.length === 0) return;

    const svg = d3.select(svgRef.current);
    const step = steps[currentStepIndex];
    if (!step || !step.data) return;

    const data = step.data as number[];
    const maxVal = d3.max(data) || 100;
    
    const width = svg.node()?.getBoundingClientRect().width || 800;
    const height = 400;
    
    const xScale = d3.scaleBand()
      .domain(data.map((_, i) => i.toString()))
      .range([50, width - 50])
      .padding(0.2);
      
    const yScale = d3.scaleLinear()
      .domain([0, maxVal])
      .range([height - 50, 50]);

    // UPDATE PATTERN
    const rects = svg.selectAll('rect').data(data);

    rects.enter()
      .append('rect')
      .attr('x', (_, i) => xScale(i.toString())!)
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - 50 - yScale(d))
      .attr('fill', '#3b82f6')
      .attr('rx', 4)
      .merge(rects as any)
      .transition()
      .duration(300)
      .attr('x', (_, i) => xScale(i.toString())!)
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - 50 - yScale(d))
      .attr('fill', (_, i) => step.highlightedElements.includes(i.toString()) ? '#ef4444' : '#3b82f6');

    rects.exit().remove();
    
    const texts = svg.selectAll('text').data(data);
      
    texts.enter()
      .append('text')
      .attr('x', (_, i) => xScale(i.toString())! + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d) - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#1f2937')
      .attr('font-weight', 'bold')
      .text(d => d)
      .merge(texts as any)
      .transition()
      .duration(300)
      .attr('x', (_, i) => xScale(i.toString())! + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d) - 10)
      .text(d => d);
      
    texts.exit().remove();

  }, [steps, currentStepIndex]);

  return <div ref={containerRef} style={{ width: '100%', marginBottom: '1rem' }} />;
}
