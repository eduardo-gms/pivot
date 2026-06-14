import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSimulationStore } from '../store/useSimulationStore';
import { engineRegistry, getDefaultInput } from '../engines';
import { D3Renderer } from '../components/D3Renderer';
import { PlayerControls } from '../components/PlayerControls';
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

export function AlgorithmView() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const { loadSimulation, reset, steps, currentStepIndex } = useSimulationStore();
  const [inputText, setInputText] = useState('');
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);

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
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
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

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: '#6366f1', fontSize: '0.9rem' }}>
          ← {t('Home')}
        </Link>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.5rem' }}>
          {slug?.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        </h2>
      </div>

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
          <label style={{ color: '#94a3b8', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
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
              color: '#f1f5f9',
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

      {isLoadingArticle ? (
        <p style={{ textAlign: 'center', color: '#64748b', marginTop: '3rem' }}>{t('Loading')}...</p>
      ) : article ? (
        <article style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            {article.title}
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>
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
