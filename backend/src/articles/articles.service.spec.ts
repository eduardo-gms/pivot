import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  article: {
    count: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return published articles with pagination', async () => {
      mockPrisma.article.count.mockResolvedValue(1);
      mockPrisma.article.findMany.mockResolvedValue([
        {
          id: 'art-1',
          slug: 'bubble-sort',
          algorithmId: 'algo-1',
          isPublished: true,
          createdAt: new Date('2024-01-01'),
          translations: [{ title: 'Bubble Sort Explained', seoDescription: 'Learn bubble sort' }],
        },
      ]);

      const result = await service.findAll('en', 1, 10);
      expect(result.meta.total).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].title).toBe('Bubble Sort Explained');
    });

    it('should filter by algorithmId when provided', async () => {
      mockPrisma.article.count.mockResolvedValue(0);
      mockPrisma.article.findMany.mockResolvedValue([]);

      await service.findAll('en', 1, 10, 'algo-1');

      expect(mockPrisma.article.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { isPublished: true, algorithmId: 'algo-1' },
        }),
      );
    });

    it('should calculate lastPage correctly', async () => {
      mockPrisma.article.count.mockResolvedValue(25);
      mockPrisma.article.findMany.mockResolvedValue([]);

      const result = await service.findAll('en', 1, 10);
      expect(result.meta.lastPage).toBe(3);
    });
  });

  describe('findOneBySlug', () => {
    it('should return article details with content', async () => {
      mockPrisma.article.findUnique.mockResolvedValue({
        id: 'art-1',
        slug: 'bubble-sort',
        algorithmId: 'algo-1',
        isPublished: true,
        createdAt: new Date('2024-01-01'),
        translations: [{
          title: 'Bubble Sort Explained',
          content: '# Introduction\nBubble sort...',
          seoDescription: 'Learn bubble sort',
        }],
      });

      const result = await service.findOneBySlug('bubble-sort', 'en');
      expect(result.title).toBe('Bubble Sort Explained');
      expect(result.content).toContain('# Introduction');
    });

    it('should throw NotFoundException for unknown slug', async () => {
      mockPrisma.article.findUnique.mockResolvedValue(null);

      await expect(service.findOneBySlug('nonexistent', 'en')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException for unpublished article', async () => {
      mockPrisma.article.findUnique.mockResolvedValue({
        id: 'art-1',
        slug: 'draft',
        isPublished: false,
        translations: [],
      });

      await expect(service.findOneBySlug('draft', 'en')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
