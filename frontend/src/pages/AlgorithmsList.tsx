import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api';
import { engineRegistry } from '../engines';
import { BarChart3, GitBranch, Network, Layers, Code2 } from 'lucide-react';

interface Algorithm {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  shortDescription: string | null;
  timeComplexity: string;
  spaceComplexity: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'sorting', label: 'Sorting' },
  { id: 'trees', label: 'Trees' },
  { id: 'linear-structures', label: 'Linear' },
  { id: 'graphs', label: 'Graphs' },
  { id: 'dynamic-programming', label: 'Dynamic Programming' }
];

// Fallback logic to determine frontend UI styling since DB doesn't have it yet
const getAlgoUIData = (slug: string) => {
  const sorting = ['bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'];
  const linear = ['stack', 'queue', 'linked-list'];
  const trees = ['avl-tree', 'binary-search']; // the image shows binary search as trees
  const graphs = ['dijkstra', 'depth-first-search', 'breadth-first-search'];

  let catLabel = 'Algorithm';
  let colorVar = 'var(--text-muted)';
  let Icon = Code2;
  let difficulty = 'Medium';

  if (sorting.includes(slug)) {
    catLabel = 'Sorting';
    colorVar = 'var(--accent-sorting)';
    Icon = BarChart3;
    difficulty = slug === 'quick-sort' || slug === 'merge-sort' ? 'Medium' : 'Easy';
  } else if (trees.includes(slug)) {
    catLabel = 'Trees';
    colorVar = 'var(--accent-trees)';
    Icon = GitBranch;
    difficulty = slug === 'avl-tree' ? 'Hard' : 'Easy';
  } else if (graphs.includes(slug)) {
    catLabel = 'Graphs';
    colorVar = 'var(--accent-graphs)';
    Icon = Network;
    difficulty = slug === 'dijkstra' ? 'Hard' : 'Medium';
  } else if (linear.includes(slug)) {
    catLabel = 'Linear';
    colorVar = 'var(--accent-sorting)';
    Icon = Layers;
    difficulty = 'Easy';
  }

  return { catLabel, colorVar, Icon, difficulty };
};

export function AlgorithmsList() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .get<Algorithm[]>('/algorithms')
      .then((res) => setAlgorithms(res.data))
      .catch(() => setAlgorithms([]))
      .finally(() => setIsLoading(false));
  }, [i18n.language]);

  const handleCategoryClick = (catId: string) => {
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const searchQuery = (searchParams.get('q') || '').toLowerCase();

  const filtered = algorithms.filter((algo) => {
    // 1. Text Search Filter
    if (searchQuery) {
      const matchName = algo.name.toLowerCase().includes(searchQuery);
      const matchSlug = algo.slug.toLowerCase().includes(searchQuery);
      if (!matchName && !matchSlug) return false;
    }

    // 2. Category Filter
    if (currentCategory !== 'all') {
      const sortingSlugs = ['bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'];
      const linearSlugs = ['stack', 'queue', 'linked-list'];
      const treeSlugs = ['avl-tree', 'binary-search', 'priority-queue'];
      
      if (currentCategory === 'sorting' && !sortingSlugs.includes(algo.slug)) return false;
      if (currentCategory === 'linear-structures' && !linearSlugs.includes(algo.slug)) return false;
      if (currentCategory === 'trees' && !treeSlugs.includes(algo.slug)) return false;
    }
    
    return true;
  });

  return (
    <div style={{ padding: '1rem 0' }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.75rem' }}>
        {t('Welcome')}
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
        {t('home_subtitle')}
      </p>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`pill ${currentCategory === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {isLoading && <p style={{ color: 'var(--text-muted)' }}>{t('Loading')}...</p>}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {filtered.map((algo) => {
          const hasEngine = algo.slug in engineRegistry;
          const { catLabel, colorVar, Icon, difficulty } = getAlgoUIData(algo.slug);

          return (
            <Link
              key={algo.id}
              to={hasEngine ? `/algorithms/${algo.slug}` : '#'}
              className={`algo-card ${!hasEngine ? 'disabled' : ''}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <Icon size={24} style={{ color: colorVar }} />
                <span className="difficulty-badge">{difficulty}</span>
              </div>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {algo.name}
                {!hasEngine && <span style={{ fontSize: '0.7rem', color: '#f59e0b', padding: '0.1rem 0.4rem', border: '1px solid #f59e0b', borderRadius: '4px' }}>Soon</span>}
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{catLabel}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  Visualize <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>▷</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {!isLoading && filtered.length === 0 && (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '4rem' }}>
          {t('No algorithms found')}
        </p>
      )}
    </div>
  );
}
