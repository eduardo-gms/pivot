import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Health Endpoints (e2e)', () => {
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

  describe('GET /api/health/live', () => {
    it('should return 200 with status ok and uptime', () => {
      return request(app.getHttpServer())
        .get('/api/health/live')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'ok');
          expect(res.body).toHaveProperty('uptime');
          expect(res.body).toHaveProperty('ts');
          expect(typeof res.body.uptime).toBe('number');
          // Liveness should NOT check database
          expect(res.body).not.toHaveProperty('database');
        });
    });
  });

  describe('GET /api/health/ready', () => {
    it('should return 200 with database status when DB is up', () => {
      return request(app.getHttpServer())
        .get('/api/health/ready')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'ok');
          expect(res.body).toHaveProperty('database', 'reachable');
          expect(res.body).toHaveProperty('dbLatencyMs');
          expect(typeof res.body.dbLatencyMs).toBe('number');
        });
    });
  });

  describe('GET /api/health', () => {
    it('should return same format as /health/ready (backward compatibility)', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'ok');
          expect(res.body).toHaveProperty('database', 'reachable');
        });
    });
  });
});
