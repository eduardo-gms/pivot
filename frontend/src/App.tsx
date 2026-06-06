import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';

function Home() {
  const { t } = useTranslation();
  return <h1>{t('Welcome')}</h1>;
}

function AlgorithmsList() {
  const { t } = useTranslation();
  return <h1>{t('Algorithms')}</h1>;
}

import { useEffect } from 'react';
import { useSimulationStore } from './store/useSimulationStore';
import { PlayerControls } from './components/PlayerControls';
import { D3Renderer } from './components/D3Renderer';

function AlgorithmView() {
  const { loadSimulation } = useSimulationStore();
  
  useEffect(() => {
    // Dummy Data
    loadSimulation([
      { id: '1', data: [5, 3, 8, 1, 2], activePointers: {}, highlightedElements: [], descriptionKey: 's1' },
      { id: '2', data: [5, 3, 8, 1, 2], activePointers: {}, highlightedElements: ['0', '1'], descriptionKey: 's2' },
      { id: '3', data: [3, 5, 8, 1, 2], activePointers: {}, highlightedElements: [], descriptionKey: 's3' },
      { id: '4', data: [3, 5, 8, 1, 2], activePointers: {}, highlightedElements: ['1', '2'], descriptionKey: 's4' },
      { id: '5', data: [3, 5, 8, 1, 2], activePointers: {}, highlightedElements: ['2', '3'], descriptionKey: 's5' },
      { id: '6', data: [3, 5, 1, 8, 2], activePointers: {}, highlightedElements: [], descriptionKey: 's6' },
      { id: '7', data: [3, 5, 1, 8, 2], activePointers: {}, highlightedElements: ['3', '4'], descriptionKey: 's7' },
      { id: '8', data: [3, 5, 1, 2, 8], activePointers: {}, highlightedElements: [], descriptionKey: 's8' },
    ]);
  }, [loadSimulation]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Bubble Sort (Demo)</h2>
      <D3Renderer />
      <PlayerControls />
    </div>
  );
}

function BlogView() {
  const { t } = useTranslation();
  return <h1>{t('Blog')}</h1>;
}

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <BrowserRouter>
      <header style={{ display: 'flex', gap: '2rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/">Home</Link>
          <Link to="/algorithms">Algorithms</Link>
          <Link to="/blog/test-article">Blog Example</Link>
        </nav>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => changeLanguage('en')}>EN</button>
          <button onClick={() => changeLanguage('pt-BR')}>PT-BR</button>
        </div>
      </header>
      <main style={{ padding: '2rem' }}>
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
