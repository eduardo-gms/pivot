import { Controller, Get, Query, Param } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';

@ApiTags('algorithms')
@Controller('api/algorithms')
export class AlgorithmsController {
  constructor(private readonly algorithmsService: AlgorithmsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all algorithms' })
  @ApiQuery({ name: 'lang', required: false, type: String, description: 'Language code (e.g., pt-BR, en)' })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  findAll(@Query('lang') lang?: string, @Query('categoryId') categoryId?: string) {
    return this.algorithmsService.findAll(lang || 'en', categoryId);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get algorithm by slug' })
  @ApiQuery({ name: 'lang', required: false, type: String })
  findOne(@Param('slug') slug: string, @Query('lang') lang?: string) {
    return this.algorithmsService.findOneBySlug(slug, lang || 'en');
  }
}
