import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AlgorithmView } from './AlgorithmView';
import { useSimulationStore } from '../store/useSimulationStore';

import '../i18n';

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = MockResizeObserver as any;

// Mock the api module
vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
  },
}));

import { api } from '../api';

const renderWithSlug = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/algorithms/${slug}`]}>
      <Routes>
        <Route path="/algorithms/:slug" element={<AlgorithmView />} />
      </Routes>
    </MemoryRouter>,
  );

describe('AlgorithmView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSimulationStore.getState().reset();

    (api.get as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (url.includes('/algorithms/bubble-sort')) {
        return Promise.resolve({ data: { name: 'Bubble Sort' } });
      }
      if (url.includes('/articles/bubble-sort')) {
        return Promise.resolve({
          data: {
            id: 'art1',
            slug: 'bubble-sort',
            algorithmId: 'a1',
            createdAt: '2024-01-01T00:00:00Z',
            title: 'Understanding Bubble Sort',
            content: '# Bubble Sort\n\nSimple algorithm.',
            seoDescription: null,
          },
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  it('renders algorithm name for a valid engine slug', async () => {
    renderWithSlug('bubble-sort');
    await waitFor(() => {
      expect(screen.getByText('Bubble Sort')).toBeInTheDocument();
    });
  });

  it('renders D3Renderer (SVG) for a valid engine', async () => {
    const { container } = renderWithSlug('bubble-sort');
    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('renders PlayerControls for a valid engine', async () => {
    renderWithSlug('bubble-sort');
    await waitFor(() => {
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });
  });

  it('renders article content when available', async () => {
    renderWithSlug('bubble-sort');
    await waitFor(() => {
      expect(screen.getByText('Understanding Bubble Sort')).toBeInTheDocument();
    });
  });

  it('shows "engine not found" for unknown slug', async () => {
    renderWithSlug('nonexistent-algo');
    expect(screen.getByText(/Motor não encontrado|Engine not found/i)).toBeInTheDocument();
  });

  it('shows back link to home', async () => {
    renderWithSlug('bubble-sort');
    const link = screen.getByText(/Início|Home/i);
    expect(link).toBeInTheDocument();
  });
});
