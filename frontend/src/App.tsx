import { BrowserRouter, Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Sun, Moon, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AlgorithmsList } from './pages/AlgorithmsList';
import { AlgorithmView } from './pages/AlgorithmView';

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate(`/`);
    }
  };

  const toggleLang = () => {
    const next = i18n.language === 'pt-BR' ? 'en' : 'pt-BR';
    i18n.changeLanguage(next);
  };

  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') === 'light');

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  const toggleTheme = () => setIsLight(!isLight);



  return (
    <header
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        alignItems: 'center',
        padding: '1.2rem 2rem',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '2.5rem',
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: 'var(--accent-sorting)' }}>{'</>'}</span>
            Pivot
          </h1>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form 
          onSubmit={handleSearch}
          style={{ 
            display: 'flex', alignItems: 'center', background: 'var(--surface)',
            border: '1px solid var(--border-color)', borderRadius: '8px',
            padding: '0.5rem 1rem', gap: '0.5rem', width: '100%', maxWidth: '500px'
          }}
        >
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder={t('Search algorithms')} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent', border: 'none', color: 'var(--text-main)',
              outline: 'none', width: '100%', fontSize: '0.95rem'
            }}
          />
        </form>
      </div>

      {/* Right: Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
            onClick={toggleTheme}
            style={{ 
              background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', 
              display: 'flex', alignItems: 'center' 
            }}
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="page-container" style={{ paddingBottom: '3rem' }}>
        <Routes>
          <Route path="/" element={<AlgorithmsList />} />
          <Route path="/algorithms/:slug" element={<AlgorithmView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
