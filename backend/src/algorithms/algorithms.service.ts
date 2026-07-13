import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlgorithmsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategories(lang: string, page: number = 1, limit: number = 10) {
    const total = await this.prisma.category.count();

    const categories = await this.prisma.category.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { slug: 'asc' },
      include: {
        translations: {
          where: { locale: lang },
        },
      },
    });

    const data = categories.map((category) => {
      const translation = category.translations[0];
      return {
        id: category.id,
        slug: category.slug,
        name: translation?.name || category.slug,
        description: translation?.description || null,
      };
    });

    return {
      meta: { total, page, lastPage: Math.ceil(total / limit) || 1 },
      data,
    };
  }

  async findAll(lang: string, page: number = 1, limit: number = 10, categoryId?: string) {
    const whereClause = categoryId ? { categoryId } : {};

    const total = await this.prisma.algorithm.count({ where: whereClause });

    const algorithms = await this.prisma.algorithm.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { slug: 'asc' },
      include: {
        translations: {
          where: { locale: lang },
        },
      },
    });

    const data = algorithms.map((algo) => {
      const translation = algo.translations[0];
      return {
        id: algo.id,
        slug: algo.slug,
        categoryId: algo.categoryId,
        timeComplexity: algo.timeComplexity,
        spaceComplexity: algo.spaceComplexity,
        name: translation?.name || algo.slug,
        shortDescription: translation?.shortDescription || null,
      };
    });

    return {
      meta: { total, page, lastPage: Math.ceil(total / limit) || 1 },
      data,
    };
  }

  async findOneBySlug(slug: string, lang: string) {
    const algo = await this.prisma.algorithm.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { locale: lang },
        },
        category: {
          include: {
            translations: {
              where: { locale: lang },
            },
          },
        },
      },
    });

    if (!algo) {
      throw new NotFoundException(`Algorithm with slug "${slug}" not found.`);
    }

    const translation = algo.translations[0];
    const catTranslation = algo.category?.translations[0];

    return {
      id: algo.id,
      slug: algo.slug,
      categoryId: algo.categoryId,
      categoryName: catTranslation?.name || algo.category?.slug,
      timeComplexity: algo.timeComplexity,
      spaceComplexity: algo.spaceComplexity,
      name: translation?.name || algo.slug,
      shortDescription: translation?.shortDescription || null,
    };
  }
}

