import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // Validate required environment variables
  if (!process.env.DATABASE_URL) {
    console.error('FATAL: DATABASE_URL environment variable is not set.');
    console.error('Copy backend/.env.example to backend/.env and fill in your Neon credentials.');
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);

  // Global prefix — all routes start with /api
  app.setGlobalPrefix('api');

  // CORS — allow frontend dev server by default
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'HEAD', 'OPTIONS'],
    credentials: false,
  });

  // Global validation pipe using class-validator DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger interactive documentation at /api/docs
  const config = new DocumentBuilder()
    .setTitle('Pivot API')
    .setDescription(
      'REST API for the Pivot educational platform — serves algorithm metadata, categories, and blog articles with i18n support.',
    )
    .setVersion('1.0')
    .addTag('categories', 'Algorithm categories (Sorting, Trees, etc.)')
    .addTag('algorithms', 'Algorithm metadata and Big-O complexities')
    .addTag('articles', 'Multilingual blog articles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Pivot API running on http://localhost:${port}/api`);
  console.log(`📖 Swagger docs at http://localhost:${port}/api/docs`);
}
bootstrap();
