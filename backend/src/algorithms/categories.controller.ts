import { Controller, Get, Query } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly algorithmsService: AlgorithmsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all algorithm categories' })
  findAllCategories(@Query() dto: PaginationQueryDto) {
    return this.algorithmsService.findAllCategories(dto.lang!);
  }
}
