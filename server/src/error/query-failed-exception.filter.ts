import { HttpStatus } from '@nestjs/common';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const { url } = request;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      status: 'Bad request',
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception['detail'],
    };

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}