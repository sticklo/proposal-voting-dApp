import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ValidationError,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface IExceptionResponse {
  errors: Record<string, { message: string }[]> | null;
  message: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionResponseJson: IExceptionResponse = {
      errors: null,
      message: '',
    };
    if (exception.getStatus && exception.getResponse) {
      const exceptionResponse = exception.getResponse() as
        | string
        | Record<string, any>;
      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse['message'];
      const status = exception.getStatus();

      if (status == HttpStatus.BAD_REQUEST) {
        if (Array.isArray(message)) {
          exceptionResponseJson.message = 'Validation errors in your request';
          exceptionResponseJson.errors = message.reduce(
            (prev, curr: ValidationError) => {
              prev[curr.property] = Object.values(curr.constraints ?? {})
                .map((constraint) => {
                  return constraint;
                })
                .slice(0, 1);
              return prev;
            },
            {},
          );
        } else {
          exceptionResponseJson.message = message;
        }
        this.logger.error(
          {
            status,
            exceptionResponse: exceptionResponseJson,
          },
          'HttpExceptionFilter',
        );
        response.status(status).json(exceptionResponseJson);
      } else {
        exceptionResponseJson.message = message;
        this.logger.error(
          {
            status,
            exceptionResponse: exceptionResponseJson,
          },
          'HttpExceptionFilter',
        );
        response.status(status).json(exceptionResponseJson);
      }
    } else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      exceptionResponseJson.message = 'Something is broken';
      this.logger.error(
        {
          status,
          exceptionResponse: {
            ...exceptionResponseJson,
            message: exception.message,
          },
          errorStack: exception.stack,
        },
        'HttpExceptionFilter@ApplicationError',
      );
      response.status(status).json(exceptionResponseJson);
    }
  }
}
