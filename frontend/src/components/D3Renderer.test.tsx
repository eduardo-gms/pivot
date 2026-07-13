import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { D3Renderer } from './D3Renderer';
import { useSimulationStore } from '../store/useSimulationStore';
import { SimulationStep } from '../engines/types';

import '../i18n';

// Mock ResizeObserver (not available in jsdom)
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = MockResizeObserver as any;

const makeMockArrayStep = (values: number[]): SimulationStep => ({
  id: 'step-1',
  data: {
    type: 'array' as const,
    values: values.map((v, i) => ({ id: `v${i}`, value: v })),
  },
  activePointers: {},
  highlightedElements: [],
  descriptionKey: 'test_step',
});

describe('D3Renderer', () => {
  beforeEach(() => {
    useSimulationStore.getState().reset();
  });

  it('shows prompt text when no simulation is loaded', () => {
    render(<D3Renderer />);
    expect(screen.getByText(/Selecione um algoritmo|Select an algorithm/i)).toBeInTheDocument();
  });

  it('renders the glass-panel container', () => {
    render(<D3Renderer />);
    const container = document.querySelector('.glass-panel');
    expect(container).toBeInTheDocument();
  });

  it('renders SVG visualization when steps are loaded', () => {
    useSimulationStore.getState().loadSimulation([makeMockArrayStep([3, 1, 4])]);
    const { container } = render(<D3Renderer />);
    // The ArrayRenderer should produce an SVG element
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
