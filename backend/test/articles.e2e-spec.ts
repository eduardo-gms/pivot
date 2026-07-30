import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Articles (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/articles', () => {
    it('should return 200 with paginated format', () => {
      return request(app.getHttpServer())
        .get('/api/articles')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
          expect(res.body.meta).toHaveProperty('total');
          expect(res.body.meta).toHaveProperty('page');
          expect(res.body.meta).toHaveProperty('lastPage');
        });
    });

    it('should return empty data for non-existent algorithmId', () => {
      return request(app.getHttpServer())
        .get('/api/articles?algorithmId=00000000-0000-0000-0000-000000000000')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual([]);
        });
    });
  });

  describe('GET /api/articles/:slug', () => {
    it('should return 404 for non-existent slug', () => {
      return request(app.getHttpServer())
        .get('/api/articles/nao-existe-esse-artigo')
        .expect(404);
    });
  });
});
