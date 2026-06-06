import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '../store/useSimulationStore';

export function PlayerControls() {
  const { t } = useTranslation();
  const { status, play, pause, nextStep, prevStep, steps, currentStepIndex, setSpeed, playbackSpeedMs } = useSimulationStore();

  const isAtEnd = currentStepIndex >= steps.length - 1;
  const isAtStart = currentStepIndex === 0;

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
      <button onClick={prevStep} disabled={isAtStart} style={{ padding: '0.5rem 1rem' }}>{t('Prev')}</button>
      
      {status === 'PLAYING' ? (
        <button onClick={pause} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white' }}>{t('Pause')}</button>
      ) : (
        <button onClick={play} disabled={isAtEnd && status !== 'FINISHED'} style={{ padding: '0.5rem 1rem', background: '#10b981', color: 'white' }}>{t('Play')}</button>
      )}
      
      <button onClick={nextStep} disabled={isAtEnd} style={{ padding: '0.5rem 1rem' }}>{t('Next')}</button>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
        <label>Speed:</label>
        <input 
          type="range" 
          min="100" 
          max="2000" 
          step="100" 
          value={2100 - playbackSpeedMs} 
          onChange={(e) => setSpeed(2100 - parseInt(e.target.value))} 
        />
      </div>
      
      <div style={{ minWidth: '80px', textAlign: 'right', fontWeight: 'bold' }}>
        {steps.length > 0 ? `${currentStepIndex + 1} / ${steps.length}` : '0 / 0'}
      </div>
    </div>
  );
}
