import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupApplicationInsights } from './common/telemetry';

// Initialize Application Insights before NestFactory (if connection string is set)
setupApplicationInsights();
async function bootstrap() {
  // Validate required environment variables
  const requiredEnvVars = ['DATABASE_URL', 'DIRECT_URL'];
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`FATAL: Missing required environment variables: ${missing.join(', ')}`);
    console.error('Copy backend/.env.example to backend/.env and fill in your credentials.');
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Structured logging via Pino
  app.useLogger(app.get(Logger));

  // Security headers (CSP, HSTS, X-Frame-Options, etc.)
  app.use(helmet());

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

  const logger = app.get(Logger);
  logger.log(`🚀 Pivot API running on http://localhost:${port}/api`);
  logger.log(`📖 Swagger docs at http://localhost:${port}/api/docs`);
}
bootstrap();
