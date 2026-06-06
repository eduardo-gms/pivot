import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(lang: string, page: number = 1, limit: number = 10, algorithmId?: string) {
    const whereClause: any = { isPublished: true };
    if (algorithmId) {
      whereClause.algorithmId = algorithmId;
    }

    const total = await this.prisma.article.count({ where: whereClause });
    
    const articles = await this.prisma.article.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        translations: {
          where: { locale: lang },
        },
      },
    });

    const data = articles.map(article => {
      const translation = article.translations[0];
      return {
        id: article.id,
        slug: article.slug,
        algorithmId: article.algorithmId,
        createdAt: article.createdAt,
        title: translation?.title || article.slug,
        seoDescription: translation?.seoDescription || null,
      };
    });

    return {
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit) || 1,
      },
      data,
    };
  }

  async findOneBySlug(slug: string, lang: string) {
    const article = await this.prisma.article.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { locale: lang },
        },
      },
    });

    if (!article || !article.isPublished) return null;

    const translation = article.translations[0];

    return {
      id: article.id,
      slug: article.slug,
      algorithmId: article.algorithmId,
      createdAt: article.createdAt,
      title: translation?.title || article.slug,
      content: translation?.content || '',
      seoDescription: translation?.seoDescription || null,
    };
  }
}
