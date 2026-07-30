import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

/**
 * Global exception filter that:
 * 1. Standardizes error response format across the API
 * 2. Maps Prisma errors to appropriate HTTP status codes
 * 3. Logs stack traces via Pino (→ Application Insights) without exposing them
 * 4. Hides internal details for non-HTTP (500) errors
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { statusCode, message, error } = this.resolveException(exception);

    // Log full error details (stack trace goes to Application Insights via Pino)
    this.logger.error(
      {
        statusCode,
        path: request.url,
        method: request.method,
        error,
        ...(exception instanceof Error && { stack: exception.stack }),
      },
      `${request.method} ${request.url} → ${statusCode}`,
    );

    response.status(statusCode).json({
      statusCode,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private resolveException(exception: unknown): {
    statusCode: number;
    message: string;
    error: string;
  } {
    // 1. Standard NestJS HttpExceptions (400, 404, 429, etc.)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exResponse = exception.getResponse();
      const message =
        typeof exResponse === 'string'
          ? exResponse
          : (exResponse as any).message || exception.message;
      return {
        statusCode: status,
        message: Array.isArray(message) ? message.join('; ') : message,
        error: HttpStatus[status] || 'Error',
      };
    }

    // 2. Prisma known request errors (constraint violations, not found, etc.)
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handlePrismaKnownError(exception);
    }

    // 3. Prisma validation errors (malformed queries)
    if (exception instanceof Prisma.PrismaClientValidationError) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid query parameters.',
        error: 'BAD_REQUEST',
      };
    }

    // 4. Generic/unknown errors → 500 with hidden details
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred.',
      error: 'INTERNAL_SERVER_ERROR',
    };
  }

  private handlePrismaKnownError(
    exception: Prisma.PrismaClientKnownRequestError,
  ): { statusCode: number; message: string; error: string } {
    switch (exception.code) {
      // Unique constraint violation
      case 'P2002': {
        const target = (exception.meta?.target as string[])?.join(', ') || 'unknown field';
        return {
          statusCode: HttpStatus.CONFLICT,
          message: `A record with this value already exists (${target}).`,
          error: 'CONFLICT',
        };
      }

      // Record not found (for update/delete operations)
      case 'P2025':
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: (exception.meta?.cause as string) || 'Record not found.',
          error: 'NOT_FOUND',
        };

      // Foreign key constraint failure
      case 'P2003': {
        const field = (exception.meta?.field_name as string) || 'unknown relation';
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Invalid reference: the related record does not exist (${field}).`,
          error: 'BAD_REQUEST',
        };
      }

      // All other known Prisma errors
      default:
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `Database operation failed (${exception.code}).`,
          error: 'UNPROCESSABLE_ENTITY',
        };
    }
  }
}
