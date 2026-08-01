import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AlgorithmsList } from './pages/AlgorithmsList';
import { AlgorithmView } from './pages/AlgorithmView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Header />
        <main className="page-container" style={{ paddingBottom: '3rem' }}>
          <Routes>
            <Route path="/" element={<AlgorithmsList />} />
            <Route path="/algorithms/:slug" element={<AlgorithmView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
