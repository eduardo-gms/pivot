import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { AllExceptionsFilter } from './http-exception.filter';
import { Prisma } from '@prisma/client';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;

  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
  const mockGetRequest = jest.fn().mockReturnValue({
    url: '/api/test',
    method: 'GET',
  });
  const mockHost = {
    switchToHttp: jest.fn().mockReturnValue({
      getResponse: mockGetResponse,
      getRequest: mockGetRequest,
    }),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllExceptionsFilter],
    }).compile();

    filter = module.get<AllExceptionsFilter>(AllExceptionsFilter);
    jest.clearAllMocks();
  });

  describe('HttpException handling', () => {
    it('should handle NotFoundException (404)', () => {
      const exception = new NotFoundException('Algorithm not found');

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 404,
          message: 'Algorithm not found',
          path: '/api/test',
          timestamp: expect.any(String),
        }),
      );
    });

    it('should handle BadRequestException (400)', () => {
      const exception = new BadRequestException('Invalid input');

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 400,
          message: 'Invalid input',
        }),
      );
    });

    it('should join array messages with semicolons', () => {
      const exception = new BadRequestException({
        message: ['field1 is required', 'field2 must be a string'],
      });

      filter.catch(exception, mockHost);

      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'field1 is required; field2 must be a string',
        }),
      );
    });
  });

  describe('PrismaClientKnownRequestError handling', () => {
    it('should map P2002 (unique constraint) to 409 Conflict', () => {
      const exception = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        { code: 'P2002', clientVersion: '5.0.0', meta: { target: ['slug'] } },
      );

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.CONFLICT);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 409,
          message: expect.stringContaining('slug'),
        }),
      );
    });

    it('should map P2025 (record not found) to 404', () => {
      const exception = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        { code: 'P2025', clientVersion: '5.0.0', meta: { cause: 'Record to update not found.' } },
      );

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 404,
          message: 'Record to update not found.',
        }),
      );
    });

    it('should map P2003 (foreign key constraint) to 400', () => {
      const exception = new Prisma.PrismaClientKnownRequestError(
        'Foreign key constraint failed',
        { code: 'P2003', clientVersion: '5.0.0', meta: { field_name: 'categoryId' } },
      );

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 400,
          message: expect.stringContaining('categoryId'),
        }),
      );
    });

    it('should map other Prisma codes to 422 Unprocessable Entity', () => {
      const exception = new Prisma.PrismaClientKnownRequestError(
        'Some other Prisma error',
        { code: 'P2010', clientVersion: '5.0.0' },
      );

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 422,
          message: expect.stringContaining('P2010'),
        }),
      );
    });
  });

  describe('PrismaClientValidationError handling', () => {
    it('should map validation error to 400', () => {
      const exception = new Prisma.PrismaClientValidationError(
        'Invalid query',
        { clientVersion: '5.0.0' },
      );

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 400,
          message: 'Invalid query parameters.',
        }),
      );
    });
  });

  describe('Generic error handling', () => {
    it('should return 500 with generic message for unknown errors', () => {
      const exception = new Error('Something broke internally');

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 500,
          message: 'An unexpected error occurred.',
        }),
      );
    });

    it('should NOT expose internal error details in the response', () => {
      const exception = new Error('Sensitive database connection string leaked');

      filter.catch(exception, mockHost);

      const responseBody = mockJson.mock.calls[0][0];
      expect(responseBody.message).not.toContain('Sensitive');
      expect(responseBody.message).toBe('An unexpected error occurred.');
    });
  });
});
