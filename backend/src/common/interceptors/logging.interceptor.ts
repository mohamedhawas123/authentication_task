import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  //to Logs execution time for requests in milliseconds
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const url = request.url;
      const start = Date.now();
  
      return next.handle().pipe(
        tap(() => {
          const duration = Date.now() - start;
          console.log(`[${method}] ${url} - ${duration}ms`);
        }),
      );
    }
  }
  