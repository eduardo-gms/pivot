import { Module } from '@nestjs/common';
import { AlgorithmsController } from './algorithms.controller';
import { CategoriesController } from './categories.controller';
import { AlgorithmsService } from './algorithms.service';

@Module({
  controllers: [AlgorithmsController, CategoriesController],
  providers: [AlgorithmsService],
})
export class AlgorithmsModule {}
