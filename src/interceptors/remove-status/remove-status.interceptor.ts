import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import UserResponse from 'src/users/dto/response-user.dto';

@Injectable()
export class RemoveStatusInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserResponse> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          const transformedData = data.map((item) => {
            const { status, ...rest } = item._doc || item;
            return rest;
          });
          return transformedData;
        } else {
          const { status, ...rest } = data._doc || data;
          return rest;
        }
      }),
    );
  }
}
