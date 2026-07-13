import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  category: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
  algorithm: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    count: jest.fn(),
  },
};

describe('AlgorithmsService', () => {
  let service: AlgorithmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlgorithmsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AlgorithmsService>(AlgorithmsService);
    jest.clearAllMocks();
  });

  describe('findAllCategories', () => {
    it('should return paginated categories with translated names', async () => {
      mockPrisma.category.count.mockResolvedValue(1);
      mockPrisma.category.findMany.mockResolvedValue([
        {
          id: 'cat-1',
          slug: 'sorting',
          translations: [{ name: 'Sorting Algorithms', description: 'Sort things' }],
        },
      ]);

      const result = await service.findAllCategories('en', 1, 10);
      expect(result.meta).toEqual({ total: 1, page: 1, lastPage: 1 });
      expect(result.data).toEqual([
        { id: 'cat-1', slug: 'sorting', name: 'Sorting Algorithms', description: 'Sort things' },
      ]);
    });

    it('should apply skip/take for pagination', async () => {
      mockPrisma.category.count.mockResolvedValue(5);
      mockPrisma.category.findMany.mockResolvedValue([]);

      await service.findAllCategories('en', 2, 2);

      expect(mockPrisma.category.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 2, take: 2 }),
      );
    });

    it('should fallback to slug when no translation exists', async () => {
      mockPrisma.category.count.mockResolvedValue(1);
      mockPrisma.category.findMany.mockResolvedValue([
        { id: 'cat-1', slug: 'sorting', translations: [] },
      ]);

      const result = await service.findAllCategories('en');
      expect(result.data[0].name).toBe('sorting');
    });
  });

  describe('findAll', () => {
    it('should return paginated algorithms with translated names', async () => {
      mockPrisma.algorithm.count.mockResolvedValue(1);
      mockPrisma.algorithm.findMany.mockResolvedValue([
        {
          id: 'algo-1',
          slug: 'bubble-sort',
          categoryId: 'cat-1',
          timeComplexity: 'O(n²)',
          spaceComplexity: 'O(1)',
          translations: [{ name: 'Bubble Sort', shortDescription: 'A simple sorting algorithm' }],
        },
      ]);

      const result = await service.findAll('en', 1, 10);
      expect(result.meta).toEqual({ total: 1, page: 1, lastPage: 1 });
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('Bubble Sort');
      expect(result.data[0].slug).toBe('bubble-sort');
    });

    it('should apply skip/take for pagination', async () => {
      mockPrisma.algorithm.count.mockResolvedValue(10);
      mockPrisma.algorithm.findMany.mockResolvedValue([]);

      await service.findAll('en', 3, 5);

      expect(mockPrisma.algorithm.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 10, take: 5 }),
      );
    });

    it('should filter by categoryId when provided', async () => {
      mockPrisma.algorithm.count.mockResolvedValue(0);
      mockPrisma.algorithm.findMany.mockResolvedValue([]);
      await service.findAll('en', 1, 10, 'cat-1');

      expect(mockPrisma.algorithm.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { categoryId: 'cat-1' } }),
      );
      expect(mockPrisma.algorithm.count).toHaveBeenCalledWith(
        expect.objectContaining({ where: { categoryId: 'cat-1' } }),
      );
    });

    it('should calculate lastPage correctly', async () => {
      mockPrisma.algorithm.count.mockResolvedValue(7);
      mockPrisma.algorithm.findMany.mockResolvedValue([]);

      const result = await service.findAll('en', 1, 3);
      expect(result.meta.lastPage).toBe(3);
    });
  });

  describe('findOneBySlug', () => {
    it('should return algorithm details with translation', async () => {
      mockPrisma.algorithm.findUnique.mockResolvedValue({
        id: 'algo-1',
        slug: 'bubble-sort',
        categoryId: 'cat-1',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        translations: [{ name: 'Bubble Sort', shortDescription: 'Simple' }],
        category: {
          slug: 'sorting',
          translations: [{ name: 'Sorting Algorithms' }],
        },
      });

      const result = await service.findOneBySlug('bubble-sort', 'en');
      expect(result.name).toBe('Bubble Sort');
      expect(result.categoryName).toBe('Sorting Algorithms');
    });

    it('should throw NotFoundException for unknown slug', async () => {
      mockPrisma.algorithm.findUnique.mockResolvedValue(null);

      await expect(service.findOneBySlug('nonexistent', 'en')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

