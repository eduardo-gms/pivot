import { Controller, Get, HttpCode, HttpStatus, ServiceUnavailableException } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'API metadata and project information' })
  getApiInfo() {
    return this.appService.getApiInfo();
  }

  @Get('health/live')
  @ApiOperation({ summary: 'Liveness probe — process is running (no I/O)' })
  @ApiResponse({ status: 200, description: 'Process is alive' })
  healthLive() {
    return {
      status: 'ok',
      ts: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Get('health/ready')
  @ApiOperation({ summary: 'Readiness probe — process + database connectivity' })
  @ApiResponse({ status: 200, description: 'Process and database are reachable' })
  @ApiResponse({ status: 503, description: 'Database is unreachable' })
  async healthReady() {
    const start = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      const latencyMs = Date.now() - start;
      return {
        status: 'ok',
        ts: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'reachable',
        dbLatencyMs: latencyMs,
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'degraded',
        ts: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'unreachable',
      });
    }
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check (alias for /health/ready)' })
  async health() {
    return this.healthReady();
  }
}
