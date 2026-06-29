import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  category: {
    findMany: jest.fn(),
  },
  algorithm: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
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
    it('should return categories with translated names', async () => {
      mockPrisma.category.findMany.mockResolvedValue([
        {
          id: 'cat-1',
          slug: 'sorting',
          translations: [{ name: 'Sorting Algorithms', description: 'Sort things' }],
        },
      ]);

      const result = await service.findAllCategories('en');
      expect(result).toEqual([
        { id: 'cat-1', slug: 'sorting', name: 'Sorting Algorithms', description: 'Sort things' },
      ]);
    });

    it('should fallback to slug when no translation exists', async () => {
      mockPrisma.category.findMany.mockResolvedValue([
        { id: 'cat-1', slug: 'sorting', translations: [] },
      ]);

      const result = await service.findAllCategories('en');
      expect(result[0].name).toBe('sorting');
    });
  });

  describe('findAll', () => {
    it('should return algorithms with translated names', async () => {
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

      const result = await service.findAll('en');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Bubble Sort');
      expect(result[0].slug).toBe('bubble-sort');
    });

    it('should filter by categoryId when provided', async () => {
      mockPrisma.algorithm.findMany.mockResolvedValue([]);
      await service.findAll('en', 'cat-1');

      expect(mockPrisma.algorithm.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { categoryId: 'cat-1' } }),
      );
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
