import { create } from 'zustand';

export interface SimulationStep {
  id: string;
  data: any;
  activePointers: Record<string, string | number>;
  highlightedElements: string[];
  descriptionKey: string;
  descriptionVariables?: Record<string, any>;
}

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

export const useSimulationStore = create<SimulationState>((set, get) => {
  let playInterval: any = null;

  const tick = () => {
    const { currentStepIndex, steps, status } = get();
    if (status !== 'PLAYING') return;

    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      set({ status: 'FINISHED' });
      clearInterval(playInterval);
    }
  };

  return {
    steps: [],
    currentStepIndex: 0,
    status: 'IDLE',
    playbackSpeedMs: 1000,

    loadSimulation: (steps) => {
      set({ steps, currentStepIndex: 0, status: 'IDLE' });
    },
    
    play: () => {
      const { status, currentStepIndex, steps, playbackSpeedMs } = get();
      if (status === 'PLAYING' || steps.length === 0) return;
      
      let nextIndex = currentStepIndex;
      if (status === 'FINISHED') {
        nextIndex = 0;
      }
      
      set({ status: 'PLAYING', currentStepIndex: nextIndex });
      
      if (playInterval) clearInterval(playInterval);
      playInterval = setInterval(tick, playbackSpeedMs);
    },
    
    pause: () => {
      set({ status: 'PAUSED' });
      if (playInterval) clearInterval(playInterval);
    },
    
    nextStep: () => {
      const { currentStepIndex, steps } = get();
      if (currentStepIndex < steps.length - 1) {
        set({ currentStepIndex: currentStepIndex + 1, status: 'PAUSED' });
        if (playInterval) clearInterval(playInterval);
      }
    },
    
    prevStep: () => {
      const { currentStepIndex } = get();
      if (currentStepIndex > 0) {
        set({ currentStepIndex: currentStepIndex - 1, status: 'PAUSED' });
        if (playInterval) clearInterval(playInterval);
      }
    },
    
    goToStep: (index) => {
      const { steps } = get();
      if (index >= 0 && index < steps.length) {
        set({ currentStepIndex: index, status: 'PAUSED' });
        if (playInterval) clearInterval(playInterval);
      }
    },
    
    setSpeed: (ms) => {
      const { status } = get();
      set({ playbackSpeedMs: ms });
      
      if (status === 'PLAYING') {
        if (playInterval) clearInterval(playInterval);
        playInterval = setInterval(tick, ms);
      }
    },
    
    reset: () => {
      if (playInterval) clearInterval(playInterval);
      set({ steps: [], currentStepIndex: 0, status: 'IDLE' });
    }
  };
});
