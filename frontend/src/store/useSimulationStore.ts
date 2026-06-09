import { create } from 'zustand';
import { SimulationStep } from '../engines/types';

export type { SimulationStep };

export interface SimulationState {
  steps: SimulationStep[];
  currentStepIndex: number;
  status: 'IDLE' | 'PLAYING' | 'PAUSED' | 'FINISHED';
  playbackSpeedMs: number;

  loadSimulation: (steps: SimulationStep[]) => void;
  play: () => void;
  pause: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  setSpeed: (ms: number) => void;
  reset: () => void;
}

/**
 * Simulation store using recursive setTimeout instead of setInterval
 * to avoid stale closure issues. Each tick reads fresh state via get().
 */
export const useSimulationStore = create<SimulationState>((set, get) => {
  // Store the timeout ID inside the closure — safe for single-instance usage
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const clearPlayback = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  /**
   * Recursive tick using setTimeout.
   * Each tick reads the CURRENT state via get(), avoiding stale closures.
   */
  const scheduleTick = () => {
    const { playbackSpeedMs } = get();

    timeoutId = setTimeout(() => {
      const { currentStepIndex, steps, status } = get();

      if (status !== 'PLAYING') {
        clearPlayback();
        return;
      }

      if (currentStepIndex < steps.length - 1) {
        set({ currentStepIndex: currentStepIndex + 1 });
        scheduleTick(); // Schedule next tick with potentially updated speed
      } else {
        set({ status: 'FINISHED' });
        clearPlayback();
      }
    }, playbackSpeedMs);
  };

  return {
    steps: [],
    currentStepIndex: 0,
    status: 'IDLE',
    playbackSpeedMs: 500,

    loadSimulation: (steps) => {
      clearPlayback();
      set({ steps, currentStepIndex: 0, status: 'IDLE' });
    },

    play: () => {
      const { status, steps } = get();
      if (status === 'PLAYING' || steps.length === 0) return;

      const nextIndex = status === 'FINISHED' ? 0 : get().currentStepIndex;
      set({ status: 'PLAYING', currentStepIndex: nextIndex });

      clearPlayback();
      scheduleTick();
    },

    pause: () => {
      clearPlayback();
      set({ status: 'PAUSED' });
    },

    nextStep: () => {
      clearPlayback();
      const { currentStepIndex, steps } = get();
      if (currentStepIndex < steps.length - 1) {
        set({ currentStepIndex: currentStepIndex + 1, status: 'PAUSED' });
      }
    },

    prevStep: () => {
      clearPlayback();
      const { currentStepIndex } = get();
      if (currentStepIndex > 0) {
        set({ currentStepIndex: currentStepIndex - 1, status: 'PAUSED' });
      }
    },

    goToStep: (index) => {
      clearPlayback();
      const { steps } = get();
      if (index >= 0 && index < steps.length) {
        set({ currentStepIndex: index, status: 'PAUSED' });
      }
    },

    setSpeed: (ms) => {
      set({ playbackSpeedMs: ms });
      // No need to restart — the next scheduleTick() call will pick up the new speed
    },

    reset: () => {
      clearPlayback();
      set({ steps: [], currentStepIndex: 0, status: 'IDLE' });
    },
  };
});
