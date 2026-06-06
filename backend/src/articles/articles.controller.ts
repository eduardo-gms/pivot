import { Controller, Get, Query, Param, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published articles paginated' })
  @ApiQuery({ name: 'lang', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'algorithmId', required: false, type: String })
  findAll(
    @Query('lang') lang?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('algorithmId') algorithmId?: string,
  ) {
    return this.articlesService.findAll(lang || 'en', page, limit, algorithmId);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a specific article by slug' })
  @ApiQuery({ name: 'lang', required: false, type: String })
  findOne(@Param('slug') slug: string, @Query('lang') lang?: string) {
    return this.articlesService.findOneBySlug(slug, lang || 'en');
  }
}
