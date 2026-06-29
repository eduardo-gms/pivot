import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'API metadata and project information' })
  getApiInfo() {
    return this.appService.getApiInfo();
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  health() {
    return { status: 'ok', ts: new Date().toISOString() };
  }
}
