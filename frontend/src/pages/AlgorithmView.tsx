import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '../store/useSimulationStore';
import { engineRegistry, getDefaultInput, getPresets } from '../engines';
import { D3Renderer } from '../components/D3Renderer';
import { PlayerControls } from '../components/PlayerControls';
import { useIsMobile } from '../hooks/useIsMobile';
import { Monitor } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { api } from '../api';
import 'highlight.js/styles/github-dark.css';

interface ArticleDetail {
  id: string;
  slug: string;
  algorithmId: string | null;
  createdAt: string;
  title: string;
  content: string;
  seoDescription: string | null;
}

const ACTIONS_MAP: Record<string, { action: string; labelKey: string; needsValue: boolean }[]> = {
  'stack': [
    { action: 'push', labelKey: 'op_push', needsValue: true },
    { action: 'pop', labelKey: 'op_pop', needsValue: false },
  ],
  'queue': [
    { action: 'enqueue', labelKey: 'op_enqueue', needsValue: true },
    { action: 'dequeue', labelKey: 'op_dequeue', needsValue: false },
  ],
  'linked-list': [
    { action: 'append', labelKey: 'op_append', needsValue: true },
    { action: 'prepend', labelKey: 'op_prepend', needsValue: true },
    { action: 'delete', labelKey: 'op_delete', needsValue: true },
  ],
  'avl-tree': [
    { action: 'insert', labelKey: 'op_insert', needsValue: true },
  ],
  'priority-queue': [
    { action: 'insert', labelKey: 'op_insert', needsValue: true },
    { action: 'extract', labelKey: 'op_extract', needsValue: false },
  ],
};

const getActionsForSlug = (slug: string) => ACTIONS_MAP[slug] || [];
const actionNeedsValue = (slug: string, action: string) => {
  const actions = getActionsForSlug(slug);
  const act = actions.find((a) => a.action === action);
  return act ? act.needsValue : false;
};

export function AlgorithmView() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const { loadSimulation, reset, steps, currentStepIndex } = useSimulationStore();
  const [inputText, setInputText] = useState('');
  const [customOps, setCustomOps] = useState<{ action: string; value?: number }[]>([]);
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [opValue, setOpValue] = useState<string>('');
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);
  const [algorithmName, setAlgorithmName] = useState<string>(
    slug?.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || ''
  );

  // Initialize selected action when slug changes
  useEffect(() => {
    if (slug) {
      const actions = getActionsForSlug(slug);
      if (actions.length > 0) {
        setSelectedAction(actions[0].action);
      }
      setCustomOps([]);
      setOpValue('');
    }
  }, [slug]);

  // Fetch translated algorithm name from API
  useEffect(() => {
    if (!slug) return;
    api
      .get(`/algorithms/${slug}`)
      .then((res) => setAlgorithmName(res.data.name))
      .catch(() => {
        // Fallback keeps the slug-formatted name already set in useState
      });
  }, [slug, i18n.language]);

  useEffect(() => {
    if (!slug) return;
    setIsLoadingArticle(true);
    api
      .get<ArticleDetail>(`/articles/${slug}`)
      .then((res) => setArticle(res.data))
      .catch(() => setArticle(null))
      .finally(() => setIsLoadingArticle(false));
  }, [slug, i18n.language]);

  const engine = slug ? engineRegistry[slug] : null;

  const runSimulation = useCallback(
    (input: any) => {
      if (!engine) return;
      const steps = engine.generate(input);
      loadSimulation(steps);
    },
    [engine, loadSimulation],
  );

  // Load default simulation on mount
  useEffect(() => {
    if (!slug || !engine) return;

    const defaultInput = getDefaultInput(slug);
    if (defaultInput) {
      if (engine.dataType === 'array' && defaultInput.type === 'array') {
        setInputText(defaultInput.data.join(', '));
      }
      runSimulation(defaultInput.data);
    }

    return () => reset();
  }, [slug, engine, runSimulation, reset]);

  if (!engine) {
    return (
      <div style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>
          {t('Engine not found')}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          {t('engine_not_found_desc', { slug })}
        </p>
        <Link to="/" className="btn">
          ← {t('Home')}
        </Link>
      </div>
    );
  }

  const handleCustomInput = () => {
    if (engine.dataType === 'array') {
      const parsed = inputText
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));

      if (parsed.length >= 2) {
        runSimulation(parsed);
      }
    }
  };

  const handleAddOp = () => {
    if (!slug) return;
    const needsVal = actionNeedsValue(slug, selectedAction);
    if (needsVal && opValue.trim() === '') return;
    
    setCustomOps(prev => [...prev, {
      action: selectedAction,
      value: needsVal ? parseInt(opValue, 10) : undefined
    }]);
    
    setOpValue('');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>
          ← {t('Home')}
        </Link>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.5rem' }}>
          {algorithmName}
        </h2>
      </div>

      {/* Mobile guard: hide simulator on small screens */}
      {isMobile ? (
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem 2rem',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          <Monitor size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            {t('mobile_simulator_blocked')}
          </p>
        </div>
      ) : (
        <>
          {/* Custom input (for array-based algorithms) */}
          {engine.dataType === 'array' && (
            <div
              className="glass-panel"
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                marginBottom: '1rem',
              }}
            >
              <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                {t('Input')}:
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="38, 27, 43, 3, 9, 82, 10"
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomInput()}
              />
              <button className="btn" onClick={handleCustomInput} style={{ padding: '0.5rem 1rem' }}>
                {t('Run')}
              </button>
            </div>
          )}

          {/* Preset scenarios + Operation Builder (for non-array engines) */}
          {engine.dataType !== 'array' && (
            <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {/* Presets row */}
              <div
                className="glass-panel"
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  flexWrap: 'wrap',
                }}
              >
                <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap', marginRight: '0.25rem' }}>
                  {t('Scenario')}:
                </label>
                {getPresets(slug!).map((preset) => (
                  <button
                    key={preset.key}
                    className="btn"
                    onClick={() => { setCustomOps([]); runSimulation(preset.data); }}
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                  >
                    {t(preset.labelKey)}
                  </button>
                ))}
              </div>

              {/* Custom operation builder */}
              <div
                className="glass-panel"
                style={{ padding: '0.75rem 1rem' }}
              >
                <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap', marginBottom: '0.5rem', display: 'block' }}>
                  {t('Custom')}:
                </label>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <select
                    id="op-action-select"
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '0.4rem 0.6rem',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  >
                    {getActionsForSlug(slug!).map((act) => (
                      <option key={act.action} value={act.action}>
                        {t(act.labelKey)}
                      </option>
                    ))}
                  </select>

                  {actionNeedsValue(slug!, selectedAction) && (
                    <input
                      id="op-value-input"
                      type="number"
                      value={opValue}
                      onChange={(e) => setOpValue(e.target.value)}
                      placeholder={t('Value')}
                      style={{
                        width: '80px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        padding: '0.4rem 0.6rem',
                        color: 'var(--text-main)',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddOp()}
                    />
                  )}

                  <button
                    id="op-add-btn"
                    className="btn"
                    onClick={handleAddOp}
                    disabled={actionNeedsValue(slug!, selectedAction) && opValue.trim() === ''}
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                  >
                    {t('Add')}
                  </button>
                </div>

                {/* Operation chips */}
                {customOps.length > 0 ? (
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem', alignItems: 'center' }}>
                    {customOps.map((op, i) => (
                      <span
                        key={i}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '999px',
                          padding: '0.25rem 0.6rem',
                          fontSize: '0.8rem',
                          color: 'var(--text-main)',
                        }}
                      >
                        {t(`op_${op.action}`)}
                        {op.value !== undefined && ` ${op.value}`}
                        <button
                          onClick={() => setCustomOps((prev) => prev.filter((_, j) => j !== i))}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            padding: '0 0.1rem',
                            lineHeight: 1,
                          }}
                          aria-label={`Remove operation ${i + 1}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}

                    <button
                      id="op-execute-btn"
                      className="btn"
                      onClick={() => runSimulation(customOps)}
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', marginLeft: '0.25rem' }}
                    >
                      {t('Execute')}
                    </button>
                    <button
                      id="op-clear-btn"
                      className="btn"
                      onClick={() => setCustomOps([])}
                      style={{
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.85rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      {t('Clear')}
                    </button>
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.4rem', marginBottom: 0 }}>
                    {t('custom_ops_empty')}
                  </p>
                )}
              </div>
            </div>
          )}

          <D3Renderer />

          {steps.length > 0 && (
            <div
              className="glass-panel"
              style={{
                padding: '1.25rem 1.5rem',
                marginBottom: '1rem',
                borderLeft: '4px solid var(--secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.6,
              }}
            >
              {t(steps[currentStepIndex].descriptionKey, steps[currentStepIndex].descriptionVariables || {}) as string}
            </div>
          )}

          <PlayerControls />
        </>
      )}

      {isLoadingArticle ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>{t('Loading')}...</p>
      ) : article ? (
        <article style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            {article.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
            {new Date(article.createdAt).toLocaleDateString()}
          </p>

          <div className="glass-panel" style={{ padding: '2rem', lineHeight: 1.7 }}>
            <div className="prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      ) : null}
    </div>
  );
}
