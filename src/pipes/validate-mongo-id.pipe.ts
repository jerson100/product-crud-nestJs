import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateMongoIdPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (Types.ObjectId.isValid(value)) {
      if (String(new Types.ObjectId(value)) === value) return value;
      throw new HttpException('Param id is not valid', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Param id is not valid', HttpStatus.BAD_REQUEST);
  }
}
