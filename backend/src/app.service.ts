import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      name: 'Pivot API',
      description:
        'REST API for the Pivot educational platform — interactive algorithm visualization and technical blog.',
      version: '1.0.0',
      docs: '/api/docs',
      repository: 'https://github.com/eduardo-gms/pivot',
      license: 'MIT',
    };
  }
}
