import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '../store/useSimulationStore';

const MIN_SPEED_MS = 50;
const MAX_SPEED_MS = 2000;

/**
 * Converts a slider percentage (0–100) to playback delay in ms.
 * Higher percentage = faster playback = lower delay.
 */
function sliderToMs(sliderValue: number): number {
  return MAX_SPEED_MS - (sliderValue / 100) * (MAX_SPEED_MS - MIN_SPEED_MS);
}

/**
 * Converts playback delay in ms to slider percentage (0–100).
 */
function msToSlider(ms: number): number {
  return ((MAX_SPEED_MS - ms) / (MAX_SPEED_MS - MIN_SPEED_MS)) * 100;
}

export function PlayerControls() {
  const { t } = useTranslation();
  const {
    status,
    play,
    pause,
    nextStep,
    prevStep,
    steps,
    currentStepIndex,
    setSpeed,
    playbackSpeedMs,
  } = useSimulationStore();

  const isAtEnd = currentStepIndex >= steps.length - 1;
  const isAtStart = currentStepIndex === 0;
  const displaySpeed = Math.round(msToSlider(playbackSpeedMs));

  return (
    <div className="glass-panel" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '1rem 1.25rem', flexWrap: 'wrap' }}>
      <button
        className="btn"
        onClick={prevStep}
        disabled={isAtStart}
        style={{
          padding: '0.5rem 1rem',
          opacity: isAtStart ? 0.4 : 1,
          background: 'rgba(255,255,255,0.1)',
        }}
      >
        ⏮ {t('Prev')}
      </button>

      {status === 'PLAYING' ? (
        <button
          className="btn"
          onClick={pause}
          style={{ padding: '0.5rem 1.25rem', background: '#ef4444' }}
        >
          ⏸ {t('Pause')}
        </button>
      ) : (
        <button
          className="btn"
          onClick={play}
          disabled={isAtEnd && status !== 'FINISHED'}
          style={{
            padding: '0.5rem 1.25rem',
            background: '#10b981',
            opacity: isAtEnd && status !== 'FINISHED' ? 0.4 : 1,
          }}
        >
          {status === 'FINISHED' ? '🔁' : '▶'} {status === 'FINISHED' ? t('Replay') : t('Play')}
        </button>
      )}

      <button
        className="btn"
        onClick={nextStep}
        disabled={isAtEnd}
        style={{
          padding: '0.5rem 1rem',
          opacity: isAtEnd ? 0.4 : 1,
          background: 'rgba(255,255,255,0.1)',
        }}
      >
        {t('Next')} ⏭
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
        <label style={{ color: '#94a3b8', fontSize: '13px' }}>{t('Speed')}:</label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={displaySpeed}
          onChange={(e) => setSpeed(sliderToMs(parseInt(e.target.value)))}
          style={{ width: '100px', accentColor: '#6366f1' }}
        />
        <span style={{ color: '#94a3b8', fontSize: '12px', minWidth: '35px' }}>
          {displaySpeed}%
        </span>
      </div>

      <div style={{ minWidth: '80px', textAlign: 'right', fontWeight: 'bold', fontSize: '14px', color: '#e2e8f0' }}>
        {steps.length > 0 ? `${currentStepIndex + 1} / ${steps.length}` : '–'}
      </div>
    </div>
  );
}
