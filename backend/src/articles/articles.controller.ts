import { Controller, Get, Query, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FindArticlesDto } from './dto/find-articles.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published articles (paginated)' })
  findAll(@Query() dto: FindArticlesDto) {
    return this.articlesService.findAll(
      dto.lang!,
      dto.page!,
      dto.limit!,
      dto.algorithmId,
    );
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a specific article by slug' })
  findOne(@Param('slug') slug: string, @Query() dto: PaginationQueryDto) {
    return this.articlesService.findOneBySlug(slug, dto.lang!);
  }
}
