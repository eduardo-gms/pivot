import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api';
import { engineRegistry } from '../engines';

interface Algorithm {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  shortDescription: string | null;
  timeComplexity: string;
  spaceComplexity: string;
}

export function AlgorithmsList() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const params: Record<string, string> = {};
    if (categoryFilter) {
      // We'd need the categoryId, but we only have slug. For now, fetch all.
      // TODO: Add category slug filter to backend API
    }

    api
      .get<Algorithm[]>('/algorithms', { params })
      .then((res) => setAlgorithms(res.data))
      .catch(() => setAlgorithms([]))
      .finally(() => setIsLoading(false));
  }, [categoryFilter]);

  // Filter client-side by category slug if we have a filter
  const filtered = categoryFilter
    ? algorithms.filter((algo) => {
        // Simple slug-based grouping
        const sortingSlugs = ['bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'];
        const linearSlugs = ['stack', 'queue'];
        const treeSlugs = ['avl-tree'];

        if (categoryFilter === 'sorting') return sortingSlugs.includes(algo.slug);
        if (categoryFilter === 'linear-structures') return linearSlugs.includes(algo.slug);
        if (categoryFilter === 'trees') return treeSlugs.includes(algo.slug);
        return true;
      })
    : algorithms;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
        {t('Algorithms')}
      </h1>
      {categoryFilter && (
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          {t('Filtered by')}: <strong style={{ color: '#6366f1' }}>{categoryFilter}</strong>
          {' · '}
          <Link to="/algorithms" style={{ color: '#10b981', fontSize: '0.9rem' }}>
            {t('Show all')}
          </Link>
        </p>
      )}

      {isLoading && <p style={{ color: '#64748b' }}>{t('Loading')}...</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {filtered.map((algo) => {
          const hasEngine = algo.slug in engineRegistry;

          return (
            <Link
              key={algo.id}
              to={hasEngine ? `/algorithms/${algo.slug}` : '#'}
              style={{ textDecoration: 'none', color: 'inherit', opacity: hasEngine ? 1 : 0.5 }}
            >
              <div
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  cursor: hasEngine ? 'pointer' : 'not-allowed',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (hasEngine) (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {algo.name}
                  {!hasEngine && <span style={{ fontSize: '0.75rem', color: '#f59e0b', marginLeft: '0.5rem' }}>Soon</span>}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {algo.shortDescription}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                  <span style={{ color: '#6366f1', fontWeight: '600' }}>
                    ⏱ {algo.timeComplexity}
                  </span>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>
                    💾 {algo.spaceComplexity}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {!isLoading && filtered.length === 0 && (
        <p style={{ color: '#64748b', textAlign: 'center', marginTop: '2rem' }}>
          {t('No algorithms found')}
        </p>
      )}
    </div>
  );
}
