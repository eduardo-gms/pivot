import { Controller, Get, Query } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly algorithmsService: AlgorithmsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiQuery({ name: 'lang', required: false, type: String, description: 'Language code (e.g., pt-BR, en)' })
  findAllCategories(@Query('lang') lang?: string) {
    return this.algorithmsService.findAllCategories(lang || 'en');
  }
}
