import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api';

interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
}

const categoryIcons: Record<string, string> = {
  sorting: '🔀',
  'linear-structures': '📦',
  trees: '🌳',
};

export function Home() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .get<Category[]>('/categories')
      .then((res) => {
        setCategories(res.data);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load categories');
        // Fallback data so the UI isn't empty even without the backend
        setCategories([
          { id: '1', slug: 'sorting', name: t('Sorting Algorithms'), description: t('sorting_desc') },
          { id: '2', slug: 'linear-structures', name: t('Linear Structures'), description: t('linear_desc') },
          { id: '3', slug: 'trees', name: t('Trees'), description: t('trees_desc') },
        ]);
      })
      .finally(() => setIsLoading(false));
  }, [t]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>
          {t('Welcome')}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {t('home_subtitle')}
        </p>
      </div>

      {isLoading && <p style={{ textAlign: 'center', color: '#64748b' }}>{t('Loading')}...</p>}
      {error && !isLoading && (
        <p style={{ textAlign: 'center', color: '#f59e0b', fontSize: '0.85rem' }}>
          ⚠️ {t('offline_mode')}
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/algorithms?category=${cat.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className="glass-panel"
              style={{
                padding: '2rem 1.5rem',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(99, 102, 241, 0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                {categoryIcons[cat.slug] || '📂'}
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {cat.name}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
