import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
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

  describe('health', () => {
    it('should return status ok', () => {
      const result = appController.health();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('ts');
    });
  });
});
