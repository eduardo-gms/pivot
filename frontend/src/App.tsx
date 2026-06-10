import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Library, Globe, Sun } from 'lucide-react';
import { Home } from './pages/Home';
import { AlgorithmsList } from './pages/AlgorithmsList';
import { AlgorithmView } from './pages/AlgorithmView';
import { BlogView } from './pages/BlogView';

function Header() {
  const { i18n } = useTranslation();
  const location = useLocation();

  const toggleLang = () => {
    const next = i18n.language === 'pt-BR' ? 'en' : 'pt-BR';
    i18n.changeLanguage(next);
  };

  const isDashboard = location.pathname === '/algorithms';

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 2rem',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '2.5rem',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: 'var(--accent-sorting)' }}>{'</>'}</span>
          Pivot
        </h1>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link 
          to="/algorithms" 
          className={`nav-link ${isDashboard ? 'active' : ''}`}
        >
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </Link>
        <Link 
          to="#" 
          className="nav-link"
          style={{ opacity: 0.5, cursor: 'not-allowed' }}
        >
          <Library size={16} />
          <span>Blog</span>
        </Link>
        
        <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 0.5rem' }}></div>
        
        <button
          onClick={toggleLang}
          style={{ 
            background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', 
            display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' 
          }}
        >
          <Globe size={16} />
          {i18n.language === 'pt-BR' ? 'PT' : 'EN'}
        </button>
        <button
          style={{ 
            background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', 
            display: 'flex', alignItems: 'center' 
          }}
        >
          <Sun size={18} />
        </button>
      </nav>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="page-container" style={{ paddingBottom: '3rem' }}>
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
