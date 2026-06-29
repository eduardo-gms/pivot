import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '../store/useSimulationStore';
import { SimulationData } from '../engines/types';
import { ArrayRenderer } from './renderers/ArrayRenderer';
import { StackRenderer } from './renderers/StackRenderer';
import { QueueRenderer } from './renderers/QueueRenderer';
import { TreeRenderer } from './renderers/TreeRenderer';
import { LinkedListRenderer } from './renderers/LinkedListRenderer';

/**
 * Orchestrator component that dispatches to the correct renderer
 * based on the data type of the current simulation step.
 */
export function D3Renderer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const { steps, currentStepIndex } = useSimulationStore();
  const { t } = useTranslation();

  // Measure container width
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: 400,
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const step = steps[currentStepIndex];
  const data: SimulationData | null = step?.data ?? null;

  const renderVisualization = () => {
    if (!data) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 400,
            color: '#64748b',
            fontSize: '14px',
          }}
        >
          {t('select_algorithm_prompt')}
        </div>
      );
    }

    const props = {
      highlightedElements: step?.highlightedElements ?? [],
      width: dimensions.width,
      height: dimensions.height,
    };

    switch (data.type) {
      case 'array':
        return <ArrayRenderer data={data} {...props} />;
      case 'stack':
        return <StackRenderer data={data} {...props} />;
      case 'queue':
        return <QueueRenderer data={data} {...props} />;
      case 'linked-list':
        return <LinkedListRenderer data={data} {...props} />;
      case 'tree':
        return <TreeRenderer data={data} {...props} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="glass-panel"
      style={{
        width: '100%',
        minHeight: 400,
        marginBottom: '1rem',
        overflow: 'hidden',
      }}
    >
      {renderVisualization()}
    </div>
  );
}
