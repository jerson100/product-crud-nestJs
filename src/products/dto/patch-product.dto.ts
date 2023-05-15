import {
  IsPositive,
  IsString,
  Length,
  IsOptional,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { Trim } from 'src/decorators';

export class PatchProductDto {
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
  @Trim()
  @IsOptional({
    message: 'Name is optional',
  })
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
  @Trim()
  @IsOptional({
    message: 'Description is optional',
  })
  description: string;

  @IsPositive({
    message: 'Price must be a positive number',
  })
  @IsOptional({
    message: 'Price is optional',
  })
  price: number;

  @IsPositive({
    message: 'Stock must be a positive number',
  })
  @IsInt({
    message: 'Stock must be an integer',
  })
  @IsOptional({
    message: 'Stock is optional',
  })
  stock: number;
}
