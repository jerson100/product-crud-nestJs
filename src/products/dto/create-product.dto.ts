import {
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @Length(3, 50, {
    message:
      'Name must be at least 3 characters long and at most 50 characters long',
  })
  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @Length(10, 200, {
    message:
      'Description must be at least 10 characters long and at most 200 characters long',
  })
  @IsString({
    message: 'Description must be a string',
  })
  @IsNotEmpty({
    message: 'Description is required',
  })
  description: string;

  @IsPositive({
    message: 'Price must be a positive number',
  })
  @IsNotEmpty({
    message: 'Price is required',
  })
  price: number;

  @IsPositive({
    message: 'Stock must be a positive number',
  })
  @IsInt({
    message: 'Stock must be an integer',
  })
  @IsNotEmpty({
    message: 'Stock is required',
  })
  stock: number;
}
