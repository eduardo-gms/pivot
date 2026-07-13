import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlayerControls } from './PlayerControls';
import { useSimulationStore } from '../store/useSimulationStore';
import { SimulationStep } from '../engines/types';

// i18n must be imported before rendering any component that uses useTranslation
import '../i18n';

const makeMockSteps = (count: number): SimulationStep[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `step-${i}`,
    data: { type: 'array' as const, values: [{ id: 'v1', value: i }] },
    activePointers: {},
    highlightedElements: [],
    descriptionKey: `step_${i}`,
  }));

describe('PlayerControls', () => {
  beforeEach(() => {
    useSimulationStore.getState().reset();
  });

  it('renders step counter as "–" when no steps are loaded', () => {
    render(<PlayerControls />);
    expect(screen.getByText('–')).toBeInTheDocument();
  });

  it('renders step counter when steps are loaded', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(5));
    render(<PlayerControls />);
    expect(screen.getByText('1 / 5')).toBeInTheDocument();
  });

  it('disables Prev button when at the start', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(5));
    render(<PlayerControls />);
    const prevBtn = screen.getByText(/Voltar|Prev/i).closest('button')!;
    expect(prevBtn).toBeDisabled();
  });

  it('advances step when Next button is clicked', async () => {
    const user = userEvent.setup();
    useSimulationStore.getState().loadSimulation(makeMockSteps(5));
    render(<PlayerControls />);

    const nextBtn = screen.getByText(/Avançar|Next/i).closest('button')!;
    await user.click(nextBtn);

    expect(useSimulationStore.getState().currentStepIndex).toBe(1);
    expect(screen.getByText('2 / 5')).toBeInTheDocument();
  });

  it('shows Pause button during playback', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(3));
    useSimulationStore.getState().play();
    render(<PlayerControls />);
    expect(screen.getByText(/Pausar|Pause/i)).toBeInTheDocument();
  });

  it('shows Play button when paused', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(3));
    render(<PlayerControls />);
    expect(screen.getByText(/Iniciar|Play/i)).toBeInTheDocument();
  });

  it('shows Replay button when finished', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(2));
    // Manually advance to end
    useSimulationStore.getState().nextStep();
    useSimulationStore.setState({ status: 'FINISHED' });
    render(<PlayerControls />);
    expect(screen.getByText(/Reiniciar|Replay/i)).toBeInTheDocument();
  });

  it('renders speed slider', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(3));
    render(<PlayerControls />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });
});
