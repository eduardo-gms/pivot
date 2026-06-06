import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AlgorithmsModule } from './algorithms/algorithms.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [PrismaModule, AlgorithmsModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
