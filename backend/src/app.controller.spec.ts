import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUnavailableException } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let appController: AppController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  describe('getApiInfo', () => {
    it('should return project metadata with name and version', () => {
      const result = appController.getApiInfo();
      expect(result).toHaveProperty('name', 'Pivot API');
      expect(result).toHaveProperty('version', '1.0.0');
      expect(result).toHaveProperty('license', 'MIT');
      expect(result).toHaveProperty('docs', '/api/docs');
    });
  });

  describe('healthLive', () => {
    it('should return status ok with uptime (no database check)', () => {
      const result = appController.healthLive();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('ts');
      expect(result).toHaveProperty('uptime');
      expect(typeof result.uptime).toBe('number');
      // Should NOT have database property (liveness = no I/O)
      expect(result).not.toHaveProperty('database');
    });
  });

  describe('healthReady', () => {
    it('should return status ok with database reachable when DB is up', async () => {
      const result = await appController.healthReady();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('database', 'reachable');
      expect(result).toHaveProperty('dbLatencyMs');
      expect(typeof result.dbLatencyMs).toBe('number');
      expect(result).toHaveProperty('uptime');
      expect(prismaService.$queryRaw).toHaveBeenCalled();
    });

    it('should throw ServiceUnavailableException when DB is down', async () => {
      jest.spyOn(prismaService, '$queryRaw').mockRejectedValueOnce(
        new Error('Connection refused'),
      );

      await expect(appController.healthReady()).rejects.toThrow(
        ServiceUnavailableException,
      );
    });

    it('should include degraded status in 503 response body', async () => {
      jest.spyOn(prismaService, '$queryRaw').mockRejectedValueOnce(
        new Error('Connection refused'),
      );

      try {
        await appController.healthReady();
        fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceUnavailableException);
        const response = (error as ServiceUnavailableException).getResponse();
        expect(response).toHaveProperty('status', 'degraded');
        expect(response).toHaveProperty('database', 'unreachable');
      }
    });
  });

  describe('health (alias)', () => {
    it('should delegate to healthReady', async () => {
      const result = await appController.health();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('database', 'reachable');
    });
  });
});
