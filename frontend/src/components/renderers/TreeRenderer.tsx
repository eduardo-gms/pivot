import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeData, TreeNode } from '../../engines/types';

interface Props {
  data: TreeData;
  highlightedElements: string[];
  width: number;
  height: number;
}

// Helper to convert flat array to nested hierarchy
function buildHierarchy(nodes: TreeNode[], rootId: string | null): any {
  if (!rootId) return null;
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const build = (id: string | null): any => {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;

    return {
      ...node,
      children: [node.leftId ? build(node.leftId) : null, node.rightId ? build(node.rightId) : null],
    };
  };

  return build(rootId);
}

export function TreeRenderer({ data, highlightedElements, width, height }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // Empty state
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
      .text('Empty Tree')
      .style('opacity', data.nodes.length === 0 ? 1 : 0);

    const rootData = buildHierarchy(data.nodes, data.rootId);

    // Create groups for links and nodes if they don't exist
    let gLinks = svg.select<SVGGElement>('g.links');
    if (gLinks.empty()) gLinks = svg.append('g').attr('class', 'links');

    let gNodes = svg.select<SVGGElement>('g.nodes');
    if (gNodes.empty()) gNodes = svg.append('g').attr('class', 'nodes');

    if (!rootData) {
      gLinks.selectAll('*').remove();
      gNodes.selectAll('*').remove();
      return;
    }

    const root = d3.hierarchy(rootData, (d) => d.children?.filter((c: any) => c !== null));

    const treeLayout = d3.tree().size([width - 80, height - 100]);
    treeLayout(root);

    const nodes = root.descendants();
    const links = root.links();

    // ─────────────────────────────────────────────────────────
    // LINKS
    // ─────────────────────────────────────────────────────────
    const linkPath = d3
      .linkVertical()
      .x((d: any) => d.x + 40)
      .y((d: any) => d.y + 50);

    const linkSelection = gLinks.selectAll<SVGPathElement, any>('path.link').data(links, (d: any) => d.target.data.id);

    linkSelection
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#475569')
      .attr('stroke-width', 2)
      .attr('d', (d: any) => {
        const source = { x: d.source.x, y: d.source.y - 20 };
        return linkPath({ source, target: source } as any);
      })
      .merge(linkSelection)
      .transition()
      .duration(400)
      .attr('d', linkPath as any);

    linkSelection.exit().transition().duration(400).style('opacity', 0).remove();

    // ─────────────────────────────────────────────────────────
    // NODES
    // ─────────────────────────────────────────────────────────
    const nodeSelection = gNodes.selectAll<SVGGElement, any>('g.node').data(nodes, (d: any) => d.data.id);

    const nodeEnter = nodeSelection
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => {
        if (d.parent) {
          return `translate(${d.parent.x + 40}, ${d.parent.y + 50})`;
        }
        return `translate(${d.x + 40}, ${d.y + 30})`;
      })
      .style('opacity', 0);

    nodeEnter
      .append('circle')
      .attr('r', 20)
      .attr('fill', '#334155')
      .attr('stroke', 'rgba(255,255,255,0.15)')
      .attr('stroke-width', 2);

    nodeEnter
      .append('text')
      .attr('class', 'value')
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f1f5f9')
      .attr('font-weight', '700')
      .attr('font-size', '14px');

    nodeEnter
      .append('text')
      .attr('class', 'bf')
      .attr('dy', -25)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', 'bold');

    const nodeUpdate = nodeEnter.merge(nodeSelection);

    nodeUpdate
      .transition()
      .duration(400)
      .attr('transform', (d: any) => `translate(${d.x + 40}, ${d.y + 50})`)
      .style('opacity', 1);

    nodeUpdate
      .select('circle')
      .transition()
      .duration(400)
      .attr('fill', (d: any) => (highlightedElements.includes(d.data.id) ? '#ef4444' : '#334155'))
      .attr('stroke', (d: any) => (highlightedElements.includes(d.data.id) ? '#fbbf24' : 'rgba(255,255,255,0.15)'))
      .attr('stroke-width', (d: any) => (highlightedElements.includes(d.data.id) ? 3 : 2))
      .attr('stroke-dasharray', (d: any) => (highlightedElements.includes(d.data.id) ? '4,2' : 'none'));

    nodeUpdate.select('text.value').text((d: any) => d.data.value);

    nodeUpdate
      .select('text.bf')
      .text((d: any) => {
        const bf = d.data.balanceFactor;
        return bf !== undefined ? `BF: ${bf > 0 ? '+' : ''}${bf}` : '';
      })
      .attr('fill', (d: any) => {
        const bf = d.data.balanceFactor;
        if (bf === undefined) return 'transparent';
        if (Math.abs(bf) > 1) return '#ef4444'; // Unbalanced (Red)
        return '#10b981'; // Balanced (Green)
      });

    nodeSelection
      .exit()
      .transition()
      .duration(400)
      .attr('transform', (d: any) => {
        if (d.parent) {
          return `translate(${d.parent.x + 40}, ${d.parent.y + 50})`;
        }
        return `translate(${d.x + 40}, ${d.y + 70})`;
      })
      .style('opacity', 0)
      .remove();
  }, [data, highlightedElements, width, height]);

  return <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible' }} />;
}
