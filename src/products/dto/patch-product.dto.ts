import { IsPositive, IsString, Length } from 'class-validator';

export class PatchProductDto {
  @IsString({
    message: 'Name must be a string',
  })
  @Length(3, 50, {
    message:
      'Name must be at least 3 characters long and at most 50 characters long',
  })
  name: string;

  @IsString({
    message: 'Name must be a string',
  })
  @Length(10, 200, {
    message:
      'Description must be at least 10 characters long and at most 200 characters long',
  })
  description: string;

  @IsPositive({
    message: 'Price must be a positive number',
  })
  price: number;

  @IsPositive({
    message: 'Stock must be a positive number',
  })
  stock: number;
}
