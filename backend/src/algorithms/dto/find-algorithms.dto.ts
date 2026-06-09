import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FindAlgorithmsDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by category UUID',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
