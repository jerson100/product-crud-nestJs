import {
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  IsInt,
  IsDefined,
} from 'class-validator';
import { Trim } from 'src/decorators';

export class CreateProductDto {
  @Length(3, 50, {
    message:
      'Name must be at least 3 characters long and at most 50 characters long',
  })
  @IsNotEmpty({
    message: "Name isn't empty",
  })
  @IsString({
    message: 'Name must be a string',
  })
  @IsDefined({
    message: 'Name is required',
  })
  @Trim()
  name: string;

  @Length(10, 200, {
    message:
      'Description must be at least 10 characters long and at most 200 characters long',
  })
  @IsNotEmpty({
    message: "Description isn't empty",
  })
  @IsString({
    message: 'Description must be a string',
  })
  @IsDefined({
    message: 'Description is required',
  })
  @Trim()
  description: string;

  @IsPositive({
    message: 'Price must be a positive number',
  })
  @IsDefined({
    message: 'Price is required',
  })
  price: number;

  @IsPositive({
    message: 'Stock must be a positive number',
  })
  @IsInt({
    message: 'Stock must be an integer',
  })
  @IsDefined({
    message: 'Stock is required',
  })
  stock: number;
}
