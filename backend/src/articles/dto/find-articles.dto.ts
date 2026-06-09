import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FindArticlesDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by algorithm UUID',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  algorithmId?: string;
}
