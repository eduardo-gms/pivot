import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home } from './pages/Home';
import { AlgorithmsList } from './pages/AlgorithmsList';
import { AlgorithmView } from './pages/AlgorithmView';
import { BlogView } from './pages/BlogView';

function Header() {
  const { i18n, t } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language === 'pt-BR' ? 'en' : 'pt-BR';
    i18n.changeLanguage(next);
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '2rem',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.03em' }}>
          <span style={{ color: '#6366f1' }}>⟨</span>Pivot<span style={{ color: '#6366f1' }}>⟩</span>
        </h1>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link to="/algorithms" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>
          {t('Algorithms')}
        </Link>
        <button
          onClick={toggleLang}
          className="btn"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)' }}
        >
          {i18n.language === 'pt-BR' ? '🇺🇸 EN' : '🇧🇷 PT'}
        </button>
      </nav>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ padding: '0 2rem 3rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algorithms" element={<AlgorithmsList />} />
          <Route path="/algorithms/:slug" element={<AlgorithmView />} />
          <Route path="/blog/:slug" element={<BlogView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
