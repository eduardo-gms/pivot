import { Controller, Get, Query, Param } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FindAlgorithmsDto } from './dto/find-algorithms.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('algorithms')
@Controller('algorithms')
export class AlgorithmsController {
  constructor(private readonly algorithmsService: AlgorithmsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all algorithms, optionally filtered by category' })
  findAll(@Query() dto: FindAlgorithmsDto) {
    return this.algorithmsService.findAll(dto.lang!, dto.page!, dto.limit!, dto.categoryId);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get algorithm details by slug' })
  findOne(@Param('slug') slug: string, @Query() dto: PaginationQueryDto) {
    return this.algorithmsService.findOneBySlug(slug, dto.lang!);
  }
}
