import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AlgorithmsList } from './AlgorithmsList';

import '../i18n';

// Mock the api module
vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
  },
}));

import { api } from '../api';

const mockAlgorithms = {
  meta: { total: 2, page: 1, lastPage: 1 },
  data: [
    {
      id: 'a1',
      slug: 'bubble-sort',
      categoryId: 'c1',
      name: 'Bubble Sort',
      shortDescription: 'A simple sorting algorithm',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
    },
    {
      id: 'a2',
      slug: 'stack',
      categoryId: 'c2',
      name: 'Stack (LIFO)',
      shortDescription: 'Last-in, first-out structure',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
    },
  ],
};

const mockCategories = {
  meta: { total: 2, page: 1, lastPage: 1 },
  data: [
    { id: 'c1', slug: 'sorting', name: 'Sorting Algorithms' },
    { id: 'c2', slug: 'linear-structures', name: 'Linear Structures' },
  ],
};

describe('AlgorithmsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (api.get as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (url.includes('/algorithms')) return Promise.resolve({ data: mockAlgorithms });
      if (url.includes('/categories')) return Promise.resolve({ data: mockCategories });
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  const renderPage = () =>
    render(
      <MemoryRouter>
        <AlgorithmsList />
      </MemoryRouter>,
    );

  it('renders loading state initially', () => {
    renderPage();
    expect(screen.getByText(/Carregando|Loading/i)).toBeInTheDocument();
  });

  it('renders algorithm cards after loading', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Bubble Sort')).toBeInTheDocument();
    });
    expect(screen.getByText('Stack (LIFO)')).toBeInTheDocument();
  });

  it('renders category filter pills', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Sorting Algorithms')).toBeInTheDocument();
    });
    expect(screen.getByText('Linear Structures')).toBeInTheDocument();
  });

  it('renders the welcome heading', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText(/Bem-vindo|Welcome/i)).toBeInTheDocument();
    });
  });

  it('shows "no algorithms found" message when API returns empty', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (url.includes('/algorithms'))
        return Promise.resolve({ data: { meta: { total: 0, page: 1, lastPage: 1 }, data: [] } });
      if (url.includes('/categories'))
        return Promise.resolve({ data: { meta: { total: 0, page: 1, lastPage: 1 }, data: [] } });
      return Promise.reject(new Error('Unknown'));
    });

    renderPage();
    await waitFor(() => {
      expect(screen.getByText(/Nenhum algoritmo|No algorithms found/i)).toBeInTheDocument();
    });
  });
});
