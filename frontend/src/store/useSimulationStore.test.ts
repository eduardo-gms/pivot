import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useSimulationStore } from './useSimulationStore';
import { SimulationStep } from '../engines/types';

const makeMockSteps = (count: number): SimulationStep[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `step-${i}`,
    data: { type: 'array' as const, values: [{ id: 'v1', value: i }] },
    activePointers: {},
    highlightedElements: [],
    descriptionKey: `step_${i}`,
  }));

describe('useSimulationStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Reset store to initial state
    useSimulationStore.getState().reset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should start with IDLE status and empty steps', () => {
    const state = useSimulationStore.getState();
    expect(state.status).toBe('IDLE');
    expect(state.steps).toEqual([]);
    expect(state.currentStepIndex).toBe(0);
  });

  it('loadSimulation should set steps and reset index', () => {
    const steps = makeMockSteps(5);
    useSimulationStore.getState().loadSimulation(steps);

    const state = useSimulationStore.getState();
    expect(state.steps).toHaveLength(5);
    expect(state.currentStepIndex).toBe(0);
    expect(state.status).toBe('IDLE');
  });

  it('play should change status to PLAYING', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(3));
    useSimulationStore.getState().play();

    expect(useSimulationStore.getState().status).toBe('PLAYING');
  });

  it('play should not start if no steps loaded', () => {
    useSimulationStore.getState().play();
    expect(useSimulationStore.getState().status).toBe('IDLE');
  });

  it('pause should change status to PAUSED', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(3));
    useSimulationStore.getState().play();
    useSimulationStore.getState().pause();

    expect(useSimulationStore.getState().status).toBe('PAUSED');
  });

  it('nextStep should increment index and set PAUSED', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(5));
    useSimulationStore.getState().nextStep();

    const state = useSimulationStore.getState();
    expect(state.currentStepIndex).toBe(1);
    expect(state.status).toBe('PAUSED');
  });

  it('nextStep should not go beyond last step', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(2));
    useSimulationStore.getState().nextStep(); // index 1 (last)
    useSimulationStore.getState().nextStep(); // should stay at 1

    expect(useSimulationStore.getState().currentStepIndex).toBe(1);
  });

  it('prevStep should decrement index', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(5));
    useSimulationStore.getState().nextStep();
    useSimulationStore.getState().nextStep();
    useSimulationStore.getState().prevStep();

    expect(useSimulationStore.getState().currentStepIndex).toBe(1);
  });

  it('prevStep should not go below 0', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(3));
    useSimulationStore.getState().prevStep();

    expect(useSimulationStore.getState().currentStepIndex).toBe(0);
  });

  it('goToStep should navigate to specific index', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(5));
    useSimulationStore.getState().goToStep(3);

    expect(useSimulationStore.getState().currentStepIndex).toBe(3);
    expect(useSimulationStore.getState().status).toBe('PAUSED');
  });

  it('goToStep should ignore out-of-range indices', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(3));
    useSimulationStore.getState().goToStep(10);

    expect(useSimulationStore.getState().currentStepIndex).toBe(0);
  });

  it('setSpeed should update playbackSpeedMs', () => {
    useSimulationStore.getState().setSpeed(200);
    expect(useSimulationStore.getState().playbackSpeedMs).toBe(200);
  });

  it('reset should clear everything', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(5));
    useSimulationStore.getState().nextStep();
    useSimulationStore.getState().reset();

    const state = useSimulationStore.getState();
    expect(state.steps).toEqual([]);
    expect(state.currentStepIndex).toBe(0);
    expect(state.status).toBe('IDLE');
  });

  it('play should reach FINISHED when advancing through all steps', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(3));
    useSimulationStore.getState().play();

    // Advance through all steps: 0→1, 1→2, then FINISHED
    vi.advanceTimersByTime(500); // step 0→1
    vi.advanceTimersByTime(500); // step 1→2 (last) → FINISHED

    expect(useSimulationStore.getState().status).toBe('FINISHED');
    expect(useSimulationStore.getState().currentStepIndex).toBe(2);
  });

  it('play after FINISHED should restart from 0', () => {
    useSimulationStore.getState().loadSimulation(makeMockSteps(2));
    useSimulationStore.getState().play();

    vi.advanceTimersByTime(500); // step 0→1 → FINISHED

    expect(useSimulationStore.getState().status).toBe('FINISHED');

    useSimulationStore.getState().play();
    expect(useSimulationStore.getState().currentStepIndex).toBe(0);
    expect(useSimulationStore.getState().status).toBe('PLAYING');
  });
});
